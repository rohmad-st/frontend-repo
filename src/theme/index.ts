'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)'
  },
  palette: {
    primary: {
      main: '#4CAF50', // Your custom primary color
      light: '#81C784', // Optional light shade
      dark: '#388E3C', // Optional dark shade
      contrastText: '#FFFFFF' // Text color for primary buttons
    },
    secondary: {
      main: '#4C585B', // Your custom secondary color
      light: '#1F271B',
      dark: '#263022',
      contrastText: '#ffffff'
    },
    error: {
      main: '#D32F2F' // Custom error color
    },
    warning: {
      main: '#FFA000'
    },
    info: {
      main: '#0288D1'
    },
    success: {
      main: '#2E7D32'
    }
  },
  cssVariables: true
});

export default theme;
