import { useDraggable } from './hooks';
import { DragIndicator, StyledBox } from '.';
import { PanelsEnum } from '../../store/panels-store';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface DraggableProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> {
  panel: PanelsEnum;
  width: number;
}

export const Draggable = ({ children, panel, width, ...props }: DraggableProps) => {
  const { ref } = useDraggable(panel);

  return (
    <StyledBox ref={ref} minWidth={width} maxWidth={1440} {...props}>
      {children}
      <DragIndicator panel={panel} />
    </StyledBox>
  );
};
