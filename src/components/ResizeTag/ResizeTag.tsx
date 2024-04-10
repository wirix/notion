import { ReactNode } from 'react';
import { useResizeObserver } from './hooks';
import { useDebounceCallback } from 'usehooks-ts';
import { PanelsEnum, useSizeStore } from '../../store';
import { BoxStyled } from '.';

interface ResizeTagProps {
  children: ReactNode;
  panel: PanelsEnum;
  width: number;
}

export const ResizeTag = ({ children, panel, width }: ResizeTagProps) => {
  const { size, changeSize } = useSizeStore(panel, width)();
  const onResize = useDebounceCallback(changeSize, 200);

  const { ref } = useResizeObserver({
    box: 'border-box',
    onResize,
  });

  return (
    <BoxStyled ref={ref} width={size.width}>
      {children}
    </BoxStyled>
  );
};
