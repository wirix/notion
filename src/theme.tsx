import { createTheme } from '@mui/material';
import { orange, cyan, grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: orange[300],
    },
    secondary: {
      main: cyan[300],
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
