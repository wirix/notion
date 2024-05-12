import { useCallback, useRef, useState } from 'react';

export const useSelectElements = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const colIndex = useRef<number | null>(null);

  const handleMouseDown = useCallback(
    (cell: number, newColIndex: number) => {
      setIsMouseDown(true);
      if (colIndex.current === null) colIndex.current = newColIndex;
      if (!selectedCells.length) setSelectedCells([cell]);
    },
    [selectedCells],
  );

  const handleMouseUp = useCallback(() => {
    colIndex.current = null;
    setIsMouseDown(false);
    setSelectedCells([]);
  }, []);

  const handleMouseMove = useCallback(
    (cell: number, newColIndex: number) => {
      if (!isMouseDown || selectedCells.includes(cell)) return;
      setSelectedCells((elements) => [...elements, cell]);
    },
    [isMouseDown, selectedCells],
  );

  const handleSetIsMouseDown = useCallback((newIsMouseDown: boolean) => {
    setIsMouseDown(newIsMouseDown);
  }, []);

  return {
    functions: {
      handleMouseDown,
      handleMouseUp,
      handleMouseMove,
      setIsClick: handleSetIsMouseDown,
    },
    state: { elements: selectedCells, isClick: isMouseDown, selectedColIndex: colIndex.current },
  };
};
