import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { Card, Draggable } from '..';
import { PanelsEnum } from '../../store';
import { ResizeTag } from '../ResizeTag';

interface PanelPanels extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type: PanelsEnum;
  children: ReactNode;
}

export const Panel = ({ children, type, ...props }: PanelPanels) => {
  return (
    <Draggable panel={type}>
      <ResizeTag panel={type}>
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
