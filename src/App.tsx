import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Livros from './pages/Livros';
import Usuarios from './pages/Usuarios';
import Search from './pages/Search';
import PrivateRoute from './components/PrivateRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/pesquisar"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
          <Route
            path="/livros"
            element={
              <PrivateRoute>
                <Livros />
              </PrivateRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <PrivateRoute>
                <Usuarios />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
