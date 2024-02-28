import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material';

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

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 1440, margin: '0 auto' }}>
      <StyledAppBar>
        <StyledToolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ alignSelf: 'center' }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, alignSelf: 'center' }}>
            Заметки
          </Typography>
          <IconButton size="large" edge="end" color="inherit" sx={{ alignSelf: 'center' }}>
            <MoreIcon />
          </IconButton>
        </StyledToolbar>
      </StyledAppBar>
      {children}
    </Box>
  );
};
