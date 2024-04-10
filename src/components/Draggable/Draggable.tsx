import { useDraggable } from './hooks';
import { DragIndicator, StyledBox } from '.';
import { PanelsEnum } from '../../store/panels-store';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface DraggableProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
  panel: PanelsEnum;
  children: ReactNode;
}

export const Draggable = ({ children, panel, ...props }: DraggableProps) => {
  const { ref } = useDraggable(panel);
  return (
    <StyledBox
      ref={ref}
      sx={{
        display: 'flex',
        userSelect: 'none',
        position: 'absolute',
      }}
      {...props}>
      {children}
      <DragIndicator panel={panel} />
    </StyledBox>
  );
};
