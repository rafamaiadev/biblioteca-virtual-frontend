import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Layout from '../components/Layout';
import api from '../services/api';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfilAcesso: string;
}

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    perfilAcesso: '',
  });

  const fetchUsuarios = async () => {
    try {
      const response = await api.get('/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/usuarios', formData);
      handleClose();
      setFormData({ nome: '', email: '', senha: '', perfilAcesso: '' });
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      alert('Erro ao adicionar usuário. Tente novamente.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await api.delete(`/usuarios/${id}`);
        fetchUsuarios();
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        alert('Erro ao excluir usuário. Tente novamente.');
      }
    }
  };

  return (
    <Layout title="Usuários">
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Adicionar Usuário
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Perfil de Acesso</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.nome}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.perfilAcesso}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(usuario.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Novo Usuário</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            label="Nome"
            type="text"
            fullWidth
            value={formData.nome}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="senha"
            label="Senha"
            type="password"
            fullWidth
            value={formData.senha}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Perfil de Acesso</InputLabel>
            <Select
              name="perfilAcesso"
              value={formData.perfilAcesso}
              onChange={handleChange}
              label="Perfil de Acesso"
            >
              <MenuItem value="ADMIN">Administrador</MenuItem>
              <MenuItem value="BIBLIOTECARIO">Bibliotecário</MenuItem>
              <MenuItem value="USUARIO">Usuário</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Usuarios; 