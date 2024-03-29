import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material';
import { PanelsEnum, usePanelsStore } from './store/panels-store';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const StyledAppBar = styled(AppBar)(() => ({
  position: 'static',
  overflow: 'hidden',
  borderBottomRightRadius: 8,
  borderBottomLeftRadius: 8,
  marginBottom: 24,
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const panelList = [
  { type: PanelsEnum.TODO, title: 'Список задач' },
  { type: PanelsEnum.ROUTINE, title: 'Рутина' },
];

const MultipleSelectCheckmarks = () => {
  const { panels, togglePanel } = usePanelsStore();

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          multiple
          value={panelList
            .filter((panel) => panels.indexOf(panel.type) > -1)
            .map((panel) => panel.title)}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}>
          {panelList.map((panel) => (
            <MenuItem onClick={() => togglePanel(panel.type)} key={panel.type} value={panel.title}>
              <Checkbox checked={panels.indexOf(panel.type) > -1} />
              <ListItemText primary={panel.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 1440, margin: '0 auto' }}>
      <StyledAppBar>
        <StyledToolbar>
          <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, alignSelf: 'center' }}>
            Заметки
          </Typography>
          <MultipleSelectCheckmarks />
        </StyledToolbar>
      </StyledAppBar>
      {children}
    </Box>
  );
};
