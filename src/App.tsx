import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0D4740',
    },
    secondary: {
      main: '#EF4444',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2A2A2A',
      secondary: '#6B7280',
    },
    info: {
      main: '#3498DB',
    },
    warning: {
      main: '#F59E0B',
    },
    success: {
      main: '#10B981',
    }
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontFamily: "'Lora', serif",
      fontSize: '2.25rem',
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Lora', serif",
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Lora', serif",
      fontSize: '1.5rem',
      fontWeight: 700,
    },

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