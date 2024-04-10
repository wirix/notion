import { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { usePanelCoordsStore } from '../../../store';
import { useDebounce } from '../../../hooks';
import { DRAG_INDICATOR } from '../constants';
import { PanelsEnum } from '../../../store/panels-store';
import { useDraggableContainerContext } from '.';

export const useDraggable = (panel: PanelsEnum) => {
  const { changeCoords } = usePanelCoordsStore(panel)();
  const { coords } = usePanelCoordsStore(panel)((store) => store.panel);

  const [nodeEl, setNode] = useState<HTMLElement | null>(null);
  const [{ dx, dy }, setOffset] = useState({
    ...coords,
  });

  const isDragging = useRef(false);

  const { ref: nodeParent } = useDraggableContainerContext();

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
        const dxCandidate = e.clientX - startPos.x;
        const dyCandidate = e.clientY - startPos.y;
        setOffset({
          dx: dxCandidate >= 0 ? dxCandidate : 0,
          dy: dyCandidate >= 0 ? dyCandidate : 0,
        });
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
        const dxCandidate = touch.clientX - startPos.x;
        const dyCandidate = touch.clientY - startPos.y;
        setOffset({
          dx: dxCandidate >= 0 ? dxCandidate : 0,
          dy: dyCandidate >= 0 ? dyCandidate : 0,
        });
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
    if (!nodeEl || !nodeParent.current) {
      return;
    }
    console.log(dx + nodeEl.clientWidth <= nodeParent.current.clientWidth &&
      dy + nodeEl.clientHeight <= nodeParent.current.clientHeight)
    if (dx >= 0 && dy >= 0) {
      nodeEl.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      nodeEl.style.zIndex = isDragging.current ? `50` : `1`;
    }
    nodeEl.addEventListener('mousedown', handleMouseDown);
    nodeEl.addEventListener('touchstart', handleTouchStart);

    return () => {
      nodeEl.removeEventListener('mousedown', handleMouseDown);
      nodeEl.removeEventListener('touchstart', handleTouchStart);
    };
  }, [nodeEl, dx, dy]);

  useDebounce(
    () => {
      changeCoords({ dx, dy });
    },
    100,
    [dx, dy],
  );

  return { ref };
};
