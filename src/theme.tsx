import { createTheme } from '@mui/material';
import { orange, grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: orange[300],
    },
    secondary: {
      main: grey[700],
    },
  },
  typography: {
    allVariants: {
      color: grey[900],
    },
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
  },
});
