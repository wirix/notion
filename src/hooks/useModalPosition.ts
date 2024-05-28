import { useCallback, useEffect, useState } from 'react';

export const useModalPosition = (modalWidth: number, modalHeight: number) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [_, setNode] = useState<HTMLElement | null>(null);

  const ref = useCallback((nodeEle) => {
    setNode(nodeEle);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const { clientX, clientY } = e;

      let x = clientX;
      let y = clientY;

      if (clientX + modalWidth > window.innerWidth) {
        x = clientX - modalWidth;
      }

      if (clientY + modalHeight > window.innerHeight) {
        y = clientY - modalHeight;
      }

      if (x < 0) {
        x = 0;
      }
      if (y < 0) {
        y = 0;
      }

      setPosition({ x, y });
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, modalWidth, modalHeight]);

  return { position, ref };
};
