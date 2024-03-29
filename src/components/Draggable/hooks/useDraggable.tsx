import { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { usePanelCoordsStore } from '../../../store';
import { useDebounce } from '../../../hooks';
import { DRAG_INDICATOR } from '../constants';
import { PanelsEnum } from '../../../store/panels-store';

export const useDraggable = (panel: PanelsEnum) => {
  const { changeCoords } = usePanelCoordsStore(panel)();
  const { coords } = usePanelCoordsStore(panel)((store) => store.panel);
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [{ dx, dy }, setOffset] = useState({
    ...coords,
  });
  const isDragging = useRef(false);

  const ref = useCallback((nodeEle) => {
    setNode(nodeEle);
  }, []);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!document.getElementById(`${DRAG_INDICATOR}-${panel}`)?.contains(e.target as Node)) {
        return;
      }
      isDragging.current = true;
      const startPos = {
        x: e.clientX - dx,
        y: e.clientY - dy,
      };

      const handleMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        setOffset({ dx, dy });
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [dx, dy],
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0];

      const startPos = {
        x: touch.clientX - dx,
        y: touch.clientY - dy,
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const dx = touch.clientX - startPos.x;
        const dy = touch.clientY - startPos.y;
        setOffset({ dx, dy });
      };

      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    },
    [dx, dy],
  );

  useEffect(() => {
    if (node) {
      node.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      node.style.zIndex = isDragging.current ? `50` : `1`;
    }
  }, [node, dx, dy]);

  useEffect(() => {
    if (!node) {
      return;
    }
    node.addEventListener('mousedown', handleMouseDown);
    node.addEventListener('touchstart', handleTouchStart);
    return () => {
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('touchstart', handleTouchStart);
    };
  }, [node, dx, dy]);

  useDebounce(
    () => {
      changeCoords({ dx, dy });
    },
    100,
    [dx, dy],
  );

  return { ref };
};
