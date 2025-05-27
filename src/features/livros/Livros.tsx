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
  Container,
  Box,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Layout from '../dashboard/Layout';
import api from '../../services/api';

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
}

const Livros = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    categoria: '',
  });
  const [fileData, setFileData] = useState({
    pdf: null as File | null,
    capa: null as File | null,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFileData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('livroDTO', new Blob([
        JSON.stringify({
          titulo: formData.titulo,
          autor: formData.autor,
          categoria: formData.categoria,
        })
      ], { type: 'application/json' }));
      if (fileData.pdf) form.append('pdf', fileData.pdf);
      if (fileData.capa) form.append('capa', fileData.capa);
      await api.post('/livros', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      handleClose();
      setFormData({ titulo: '', autor: '', categoria: '' });
      setFileData({ pdf: null, capa: null });
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

  const handleEdit = (livro: Livro) => {
    alert(`Editar livro: ${livro.titulo}`);
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" fontWeight={600}>Livros</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{ maxWidth: 0.2, px: 1 }}
          >
            Adicionar Livro
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell align="right" sx={{ width: 120 }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {livros.map((livro) => (
                <TableRow key={livro.id}>
                  <TableCell>{livro.titulo}</TableCell>
                  <TableCell>{livro.autor}</TableCell>
                  <TableCell>{livro.categoria}</TableCell>
                  <TableCell align="right" sx={{ width: 60 }}>
                    <Box display="flex" justifyContent="flex-end" gap={0.1}>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(livro)}
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(livro.id)}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
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
            name="categoria"
            label="Categoria"
            type="text"
            fullWidth
            value={formData.categoria}
            onChange={handleChange}
          />
          <Box mt={0.5} mb={0.5}>
            <input
              id="pdf-upload"
              type="file"
              name="pdf"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="pdf-upload">
              <Button variant="outlined" component="span" size="small">
                Selecionar PDF do Livro
              </Button>
              {fileData.pdf && (
                <Typography variant="caption" sx={{ ml: 1, display: 'inline' }}>
                  {fileData.pdf.name}
                </Typography>
              )}
            </label>
          </Box>
          <Box mb={0.5}>
            <input
              id="capa-upload"
              type="file"
              name="capa"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="capa-upload">
              <Button variant="outlined" component="span" size="small">
                Selecionar Imagem da Capa
              </Button>
              {fileData.capa && (
                <Typography variant="caption" sx={{ ml: 1, display: 'inline' }}>
                  {fileData.capa.name}
                </Typography>
              )}
            </label>
          </Box>
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