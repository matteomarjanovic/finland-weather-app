import { createTheme } from '@mui/material/styles';

const fontFamily = '"Capriola", sans-serif'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#122e34',
    },
    secondary: {
      main: '#c6e0f4',
    },
    text: {
        primary: '#122e34',
    }
  },
  typography: {
    fontFamily: fontFamily,
    h6: {
        color: '#c6e0f4'
    }
  }
});

  
