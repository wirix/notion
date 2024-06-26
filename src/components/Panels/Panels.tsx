import { Box } from '@mui/material';
import { PanelTodoList } from './PanelTodoList';
import { PanelRoutine } from './PanelRoutine';
import { PanelClock } from './PanelClock';
import { PanelsEnum, usePanelsStore } from '../../store/panels-store';
import { Panel } from '.';

interface Panels {
  type: PanelsEnum;
  children: React.ReactNode;
  width?: number;
}

const panels = [
  {
    type: PanelsEnum.TODO,
    width: 720,
    Component: <PanelTodoList />,
  },
  {
    type: PanelsEnum.ROUTINE,
    width: 720,
    Component: <PanelRoutine />,
  },
  {
    type: PanelsEnum.CLOCK,
    width: 360,
    Component: <PanelClock />,
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
            <Panel key={`${type}-${index}`} type={type} width={panel.width}>
              {Component}
            </Panel>
          );
        })}
    </Box>
  );
};
