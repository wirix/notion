import { useCallback, useRef, useState } from 'react';

export const useSelectElements = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedElements, setSelectedElements] = useState<number[]>([]);
  const indexColumn = useRef<number | null>(null);

  const handleMouseDown = useCallback(
    (index: number, newIndexColumn: number) => {
      setIsMouseDown(true);
      if (indexColumn.current === null) indexColumn.current = newIndexColumn;
      if (selectedElements.length === 0) setSelectedElements([index]);
    },
    [selectedElements],
  );

  const handleMouseUp = useCallback(() => {
    indexColumn.current = null;
    setIsMouseDown(false);
    setSelectedElements([]);
  }, []);

  const handleMouseLeave = useCallback(
    (index: number, newIndexColumn: number) => {
      if (!isMouseDown) return;
      if (indexColumn.current === null) indexColumn.current = newIndexColumn;
      if (indexColumn.current !== newIndexColumn) {
        setSelectedElements((elements) => [...elements, index]);
      }
    },
    [isMouseDown],
  );

  const handleMouseMove = useCallback(
    (index: number, newIndexColumn: number) => {
      if (
        !isMouseDown ||
        selectedElements.includes(index) ||
        indexColumn.current !== newIndexColumn
      )
        return;
      setSelectedElements((elements) => [...elements, index]);
    },
    [isMouseDown, selectedElements],
  );

  return {
    functions: { handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseMove },
    state: { elements: selectedElements, isClick: isMouseDown, currentColumn: indexColumn.current },
  };
};
