import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: { 
    mode: 'dark',
    primary: {
      main:'#4d00a6',
      dark: '#4d00a6',
      light: '#4d00a6'
    },
    secondary: {
      main: '#e9840c'
    },
    background: {
      default: '#000000ff',
      paper: '#000000ff',

    },
    text: {
      primary:'#ffffff',
      secondary: '#a3a3a3ff',
      third:'#bc9400ff'
    },
    error: {
      main: red[500],
    }

   },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h6: { 
        fontWeight: 300,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
        textTransform: 'none', 
        fontWeight: 500,
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(to bottom, #2d004eff, #460000ff)', 
         
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        },
      },
    },
  },
});

export default theme;