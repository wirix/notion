import { useEffect, useRef, useState, useCallback } from 'react';
import { useIsMounted } from '../../../hooks';

interface Size {
  width: number | undefined;
}

interface UseResizeObserverOptions {
  onResize?: (size: Size) => void;
  box?: 'border-box' | 'content-box' | 'device-pixel-content-box';
}

const initialSize: Size = {
  width: undefined,
};

export function useResizeObserver<T extends HTMLDivElement = HTMLDivElement>(
  options: UseResizeObserverOptions,
): Size & { ref: (nodeEle: T) => void } {
  const { box = 'content-box' } = options;

  const isMounted = useIsMounted();
  const [{ width }, setSize] = useState<Size>(initialSize);
  const previousSize = useRef<Size>(initialSize);
  const onResize = useRef<((size: Size) => void) | undefined>(options.onResize);

  const [node, setNode] = useState<T | null>(null);
  const ref = useCallback((nodeEle: T | null) => {
    setNode(nodeEle);
  }, []);

  useEffect(() => {
    if (!node) return;
    if (typeof window === 'undefined' || !('ResizeObserver' in window)) return;

    const observer = new ResizeObserver(([entry]) => {
      const boxProp =
        box === 'border-box'
          ? 'borderBoxSize'
          : box === 'device-pixel-content-box'
          ? 'devicePixelContentBoxSize'
          : 'contentBoxSize';

      const newWidth = extractSize(entry, boxProp, 'inlineSize');
      const hasChanged = previousSize.current.width !== newWidth;

      if (hasChanged) {
        const newSize: Size = { width: newWidth };
        previousSize.current.width = newWidth;

        if (onResize.current) {
          onResize.current(newSize);
        } else {
          if (isMounted()) {
            setSize(newSize);
          }
        }
      }
    });

    observer.observe(node, { box });

    return () => {
      observer.disconnect();
    };
  }, [box, node, isMounted]);

  return { width, ref };
}

type BoxSizesKey = keyof Pick<
  ResizeObserverEntry,
  'borderBoxSize' | 'contentBoxSize' | 'devicePixelContentBoxSize'
>;

function extractSize(
  entry: ResizeObserverEntry,
  box: BoxSizesKey,
  sizeType: keyof ResizeObserverSize,
): number | undefined {
  if (!entry[box]) {
    if (box === 'contentBoxSize') {
      return entry.contentRect[sizeType === 'inlineSize' ? 'width' : 'height'];
    }
    return undefined;
  }

  return Array.isArray(entry[box]) ? entry[box][0][sizeType] : entry[box][sizeType];
}
