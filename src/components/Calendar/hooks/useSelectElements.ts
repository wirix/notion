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
      if (!isMouseDown || selectedCells.includes(cell) || colIndex.current !== newColIndex) return;
      setSelectedCells((elements) => [...elements, cell]);
    },
    [isMouseDown, selectedCells],
  );

  return {
    functions: { handleMouseDown, handleMouseUp, handleMouseMove },
    state: { elements: selectedCells, isClick: isMouseDown, selectedColIndex: colIndex.current },
  };
};
