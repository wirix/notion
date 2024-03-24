import { Box } from '@mui/material';
import { PanelTodoList } from './PanelTodoList';
import { Fragment } from 'react';
import { PanelRoutine } from './PanelRoutine';
import { PanelsEnum, usePanelsStore } from '../../store/panels-store';

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
          return <Fragment key={`${type}-${index}`}>{Component}</Fragment>;
        })}
    </Box>
  );
};
