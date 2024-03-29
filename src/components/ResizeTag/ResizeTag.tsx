import { ReactNode } from 'react';
import { useResizeObserver } from './hooks';
import { useDebounceCallback } from 'usehooks-ts';
import { PanelsEnum, useSizeStore } from '../../store';
import { Box } from '@mui/material';

interface ResizeTagProps {
  children: ReactNode;
  panel: PanelsEnum;
}

export const ResizeTag = ({ children, panel }: ResizeTagProps) => {
  const { size, changeSize } = useSizeStore(panel)();
  const onResize = useDebounceCallback(changeSize, 200);

  console.log(size, panel);

  const { ref } = useResizeObserver({
    box: 'border-box',
    onResize,
  });

  return (
    <Box
      ref={ref}
      style={{
        border: '1px solid palevioletred',
        width: size.width,
        resize: 'horizontal',
        overflow: 'auto',
      }}>
      {children}
    </Box>
  );
};
