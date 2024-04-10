import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { Card, Draggable, ResizeTag } from '..';
import { PanelsEnum } from '../../store';

interface PanelPanels extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type: PanelsEnum;
  width?: number;
  children: ReactNode;
}

export const Panel = ({ children, type, width = 600, ...props }: PanelPanels) => {
  return (
    <Draggable panel={type}>
      <ResizeTag panel={type} width={width}>
        <Card
          panel={type}
          style={{
            position: 'relative',
            backgroundColor: '#fff',
          }}
          {...props}>
          {children}
        </Card>
      </ResizeTag>
    </Draggable>
  );
};
