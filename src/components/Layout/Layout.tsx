import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { StyledAppBar, StyledToolbar } from '.';
import { PanelsEnum, usePanelsStore } from '../../store';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface LayoutProps extends BoxProps {
  toogleCalendar: () => void;
}

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
  { type: PanelsEnum.CLOCK, title: 'Часы' },
];

const MultipleSelectCheckmarks = ({ toogleCalendar }) => {
  const { panels, togglePanel } = usePanelsStore();

  return (
    <Box display={'flex'} alignItems={'center'}>
      <CalendarMonthIcon sx={{ cursor: 'pointer', mr: 2, fontSize: '30px' }} onClick={toogleCalendar} />
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
    </Box>
  );
};
// openCalendar потом удалить, избавиться от перекидывания, а на прямую получать(ex zustand, context)
export const Layout = ({ children, toogleCalendar, ...props }: LayoutProps) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', maxWidth: 1440, margin: '0 auto' }}
      {...props}>
      <StyledAppBar>
        <StyledToolbar>
          <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, alignSelf: 'center' }}>
            Заметки
          </Typography>
          <MultipleSelectCheckmarks toogleCalendar={toogleCalendar} />
        </StyledToolbar>
      </StyledAppBar>
      {children}
    </Box>
  );
};
