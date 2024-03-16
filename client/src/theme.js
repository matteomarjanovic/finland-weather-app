import { createTheme } from '@mui/material/styles';

const fontFamily = '"Capriola", sans-serif'
const fontWeight = 400
const fontStyle = 'normal'

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

  
