import { Box } from '@mui/material';
import { PanelTodoList } from './PanelTodoList';
import { PanelRoutine } from './PanelRoutine';
import { PanelsEnum, usePanelsStore } from '../../store/panels-store';
import { Card, Draggable } from '..';
import { ResizeTag } from '../ResizeTag';
import { Fragment } from 'react';

const panels = [
  {
    type: PanelsEnum.TODO,
    Component: <PanelTodoList />,
  },
  {
    type: PanelsEnum.ROUTINE,
    Component: <PanelRoutine />,
  },
];

export const Panels = () => {
  const { panels: selectedPanels } = usePanelsStore();

  return (
    <Box sx={{ position: 'relative' }}>
      {panels
        .filter((panel) => selectedPanels.includes(panel.type))
        .map((panel, index) => {
          const { Component, type } = panel;
          return (
            <Fragment key={`${type}-${index}`}>
              <Draggable panel={type}>
                <ResizeTag panel={type}>
                  <Card
                    panel={type}
                    style={{
                      display: 'flex',
                      position: 'relative',
                      backgroundColor: '#fff',
                      resize: 'both',
                    }}>
                    {Component}
                  </Card>
                </ResizeTag>
              </Draggable>
            </Fragment>
          );
        })}
    </Box>
  );
};
