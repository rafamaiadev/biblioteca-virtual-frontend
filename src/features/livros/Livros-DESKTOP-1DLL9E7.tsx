import React, { useEffect, useState, useMemo } from 'react';
import {
  Box, Typography, Button, Card, TextField, InputAdornment, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import { Add, Search, Edit, DeleteOutline, UploadFile } from '@mui/icons-material';
import Sidebar from '../dashboard/Sidebar'; // Verifique o caminho
import api from '../../services/api'; // Verifique o caminho

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  urlCapa?: string; // Adicionando a URL da capa para exibição na tabela
}

const LivrosPage = () => {
  // --- ESTADOS ---
  const [livros, setLivros] = useState<Livro[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  // Formulário
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ titulo: '', autor: '', categoria: '' });
  const [fileData, setFileData] = useState({ pdf: null as File | null, capa: null as File | null });
  // Exclusão
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [livroToDelete, setLivroToDelete] = useState<Livro | null>(null);
  // Paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // --- LÓGICA DE DADOS ---
  const fetchLivros = async () => {
    try {
      const response = await api.get('/livros');
      setLivros(response.data);
    } catch (error) { console.error('Erro ao buscar livros:', error); }
  };

  useEffect(() => { fetchLivros(); }, []);

  const filteredLivros = useMemo(() => {
    if (!searchTerm) return livros;
    return livros.filter(l =>
      l.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.autor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [livros, searchTerm]);

  // --- HANDLERS ---
  const handleFormOpen = () => setFormOpen(true);
  const handleFormClose = () => {
    setFormOpen(false);
    setFormData({ titulo: '', autor: '', categoria: '' });
    setFileData({ pdf: null, capa: null });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFileData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append('livroDTO', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
    if (fileData.pdf) form.append('pdf', fileData.pdf);
    if (fileData.capa) form.append('capa', fileData.capa);
    try {
      await api.post('/livros', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      handleFormClose();
      fetchLivros();
    } catch (error) { console.error('Erro ao adicionar livro:', error); }
  };

  const handleDeleteClick = (livro: Livro) => {
    setLivroToDelete(livro);
    setDeleteDialogOpen(true);
  };
  const handleDeleteClose = () => setDeleteDialogOpen(false);
  const confirmDelete = async () => {
    if (livroToDelete) {
      try {
        await api.delete(`/livros/${livroToDelete.id}`);
        fetchLivros();
      } catch (error) { console.error('Erro ao excluir livro:', error); }
      finally { handleDeleteClose(); }
    }
  };

  const handleEdit = (livro: Livro) => alert(`Editar livro: ${livro.titulo}`);
  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, ml: '240px', p: 4 }}>
        {/* CABEÇALHO */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Typography variant="h1">Gerenciar Livros</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleFormOpen}>Adicionar Livro</Button>
        </Box>

        {/* BARRA DE FERRAMENTAS */}
        <Card sx={{ p: 2, mb: 4 }}>
          <TextField fullWidth placeholder="Buscar por título ou autor..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }}/>
        </Card>

        {/* TABELA */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: '80px' }}>Capa</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Título</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Autor</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Categoria</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLivros.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((livro) => (
                <TableRow key={livro.id}>
                  <TableCell>
                    <Box component="img" src={livro.urlCapa || 'https://via.placeholder.com/40x60?text=?'} alt={livro.titulo} sx={{ width: 40, height: 60, objectFit: 'cover', borderRadius: 1 }}/>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{livro.titulo}</TableCell>
                  <TableCell>{livro.autor}</TableCell>
                  <TableCell>{livro.categoria}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleEdit(livro)}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDeleteClick(livro)}><DeleteOutline fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={filteredLivros.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} labelRowsPerPage="Linhas por pág:"/>
        </TableContainer>
      </Box>

      {/* DIALOG DE ADIÇÃO */}
      <Dialog open={formOpen} onClose={handleFormClose} fullWidth maxWidth="sm">
        <DialogTitle>Adicionar Novo Livro</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="titulo" label="Título" fullWidth onChange={handleChange} />
          <TextField margin="dense" name="autor" label="Autor" fullWidth onChange={handleChange} />
          <TextField margin="dense" name="categoria" label="Categoria" fullWidth onChange={handleChange} />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button component="label" variant="outlined" startIcon={<UploadFile />}>Capa{fileData.capa && ` (${fileData.capa.name.substring(0,10)}... )`} <input type="file" name="capa" hidden accept="image/*" onChange={handleFileChange} /></Button>
            <Button component="label" variant="outlined" startIcon={<UploadFile />}>PDF{fileData.pdf && ` (${fileData.pdf.name.substring(0,10)}... )`} <input type="file" name="pdf" hidden accept="application/pdf" onChange={handleFileChange} /></Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">Adicionar</Button>
        </DialogActions>
      </Dialog>
      
      {/* DIALOG DE EXCLUSÃO */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent><DialogContentText>Tem certeza que deseja excluir o livro <strong>{livroToDelete?.titulo}</strong>?</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancelar</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">Confirmar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LivrosPage;