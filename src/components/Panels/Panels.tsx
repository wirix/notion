import { Box } from '@mui/material';
import { PanelTodoList } from './PanelTodoList';
import { useState, Fragment } from 'react';

export const Panels = () => {
  const [panels, setPanels] = useState([
    {
      name: 'TodoList',
      Component: <PanelTodoList />,
    },
  ]);

  return (
    <Box sx={{ position: 'relative' }}>
      {panels.map((panel) => {
        const { Component, name } = panel;
        return <Fragment key={name}>{Component}</Fragment>;
      })}
    </Box>
  );
};
