import { createTheme } from '@mui/material';
import { orange, grey, green } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#151111',
      light: grey[300],
    },
    secondary: {
      main: grey[800],
      light: grey[300],
    },
    success: {
      main: green[700],
    },
  },
  typography: {
    allVariants: {
      color: grey[300],
    },
    fontFamily: 'Raleway, Arial',
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: orange[600],
          backgroundColor: grey[300],
          '&:hover': {
            backgroundColor: grey[400],
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: grey[300],
          },
          '&.Mui-MuiListItemText': {
            color: grey[400],
          },
          '&:hover': {
            backgroundColor: grey[400],
          },
        },
      },
    },
  },
});
