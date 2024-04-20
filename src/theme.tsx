import { createTheme } from '@mui/material';
import { orange, grey } from '@mui/material/colors';
// import RalewayWoff2 from './fonts/Raleway-Regular.woff2';

export const theme = createTheme({
  palette: {
    primary: {
      main: orange[300],
    },
    secondary: {
      main: grey[900],
      light: grey[300],
    },
  },
  typography: {
    allVariants: {
      color: grey[900],
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
  },
});
