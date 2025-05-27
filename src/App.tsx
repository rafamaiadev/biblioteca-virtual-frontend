import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2C3E50', // azul petróleo escuro
    },
    secondary: {
      main: '#27AE60', // verde suave
    },
    background: {
      default: '#F4F6F7', // cinza claro quase branco
      paper: '#FFFFFF', // branco puro
    },
    text: {
      primary: '#2D2D2D', // cinza escuro
      secondary: '#7F8C8D', // cinza claro
    },
    info: {
      main: '#3498DB', // azul claro
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
