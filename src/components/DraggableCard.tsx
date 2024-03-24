import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { Card } from '.';
import { PanelsEnum } from '../store/panels-store';
import { Draggable } from './Draggable';

interface DraggableCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  panel: PanelsEnum;
  children: ReactNode;
}

export const DraggableCard = ({ children, panel, ...props }: DraggableCardProps) => {
  return (
    <Draggable panel={panel}>
      <Card {...props}>{children}</Card>
    </Draggable>
  );
};
