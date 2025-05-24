import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  Alert,
} from '@mui/material';
import api from '../../services/api';
import logo from '../../assets/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Limpa o token ao montar o componente
  useEffect(() => {
    localStorage.removeItem('token');
    // Remove o token do header do axios
    delete api.defaults.headers.common['Authorization'];
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpa o erro quando o usuário começa a digitar
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', formData);
      const { token } = response.data;
      
      // Limpa o token antigo antes de salvar o novo
      localStorage.removeItem('token');
      
      // Salva o novo token
      localStorage.setItem('token', token);
      
      // Configura o token no header do axios
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      if (error.response?.status === 403) {
        setError('Sessão expirada. Por favor, faça login novamente.');
      } else {
        setError('Erro ao fazer login. Verifique suas credenciais.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            width: '100%',
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo} alt="Logo" style={{ width: 120, marginBottom: 16 }} />
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Biblioteca Virtual
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuário"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              InputProps={{ sx: { borderRadius: 2 } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{ sx: { borderRadius: 2 } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1, borderRadius: 2, height: 45, fontWeight: 600 }}
            >
              Entrar
            </Button>
          </Box>
          <Link href="#" underline="hover" sx={{ mt: 1, mb: 2, fontSize: 14 }}>
            Perdeu a senha?
          </Link>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: 13, color: 'gray' }}>
            <span>Português - Brasil (pt_br)</span>
            <span>•</span>
            <Link href="#" underline="hover" sx={{ color: 'gray' }}>
              Aviso de Cookies
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 