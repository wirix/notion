import { useState, useEffect } from 'react';

const useModalPosition = (ref, modalWidth, modalHeight) => {
  console.log("🚀 ~ useModalPosition ~ ref:", ref)
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleClick = (e) => {
      const { clientX, clientY } = e;

      let x = clientX;
      let y = clientY;

      if (x + modalWidth > window.innerWidth) {
        x = window.innerWidth - modalWidth;
      }

      if (y + modalHeight > window.innerHeight) {
        y = window.innerHeight - modalHeight;
      }

      setPosition({ x, y });
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, modalWidth, modalHeight]);

  return position;
};

export default useModalPosition;
