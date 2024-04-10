import { AppBar, Toolbar, styled } from '@mui/material';

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

export const StyledAppBar = styled(AppBar)(() => ({
  position: 'static',
  overflow: 'hidden',
  borderBottomRightRadius: 8,
  borderBottomLeftRadius: 8,
  marginBottom: 24,
}));
