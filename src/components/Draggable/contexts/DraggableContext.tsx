import { Box } from '@mui/material';
import { createContext, useRef, RefObject } from 'react';

interface DraggableContainerContextProps {
  ref: RefObject<HTMLElement | null>;
}

export const DraggableContainerContext = createContext({} as DraggableContainerContextProps);

export const DraggableContainerProvider = ({ children }) => {
  const ref = useRef<HTMLElement | null>(null);

  return (
    <DraggableContainerContext.Provider value={{ ref }}>
      <Box ref={ref}>{children}</Box>
    </DraggableContainerContext.Provider>
  );
};
