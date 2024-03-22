import { Card } from '.';
import { Draggable } from './Draggable';

export const DraggableCard = ({ children, ...props }) => {
  return (
    <Draggable>
      <Card {...props}>{children}</Card>
    </Draggable>
  );
};
