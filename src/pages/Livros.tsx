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
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Layout from '../components/Layout';
import api from '../services/api';

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
}

const Livros = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    isbn: '',
  });

  const fetchLivros = async () => {
    try {
      const response = await api.get('/livros');
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/livros', formData);
      handleClose();
      setFormData({ titulo: '', autor: '', isbn: '' });
      fetchLivros();
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
      alert('Erro ao adicionar livro. Tente novamente.');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este livro?')) {
      try {
        await api.delete(`/livros/${id}`);
        fetchLivros();
      } catch (error) {
        console.error('Erro ao excluir livro:', error);
        alert('Erro ao excluir livro. Tente novamente.');
      }
    }
  };

  return (
    <Layout title="Livros">
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Adicionar Livro
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {livros.map((livro) => (
              <TableRow key={livro.id}>
                <TableCell>{livro.titulo}</TableCell>
                <TableCell>{livro.autor}</TableCell>
                <TableCell>{livro.isbn}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(livro.id)}
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
        <DialogTitle>Adicionar Novo Livro</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="titulo"
            label="Título"
            type="text"
            fullWidth
            value={formData.titulo}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="autor"
            label="Autor"
            type="text"
            fullWidth
            value={formData.autor}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="isbn"
            label="ISBN"
            type="text"
            fullWidth
            value={formData.isbn}
            onChange={handleChange}
          />
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

export default Livros; 