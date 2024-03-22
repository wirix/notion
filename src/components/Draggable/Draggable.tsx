import { Box } from '@mui/material';
import { useDraggable } from './hooks';
import { DragIndicator } from '.';

export const Draggable = ({ children }) => {
  const { ref } = useDraggable();
  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        userSelect: 'none',
        position: 'absolute',
      }}>
      {children}
      <DragIndicator />
    </Box>
  );
};
