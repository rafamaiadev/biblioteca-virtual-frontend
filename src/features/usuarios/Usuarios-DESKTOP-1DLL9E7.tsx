// src/features/usuarios/Usuarios.tsx

import { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material';
import { Add, Search, Edit, DeleteOutline } from '@mui/icons-material';
import Sidebar from '../dashboard/Sidebar'; // Verifique o caminho correto para sua Sidebar
import api from '../../services/api'; // Verifique o caminho correto para sua api

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfilAcesso: string;
}

const UsuariosPage = () => {
  // Estados da página
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Estados do formulário de adição/edição
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    perfilAcesso: '',
  });

  // Estados da confirmação de exclusão
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<Usuario | null>(null);

  // Estados da paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Busca inicial de dados
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

  // Filtragem de usuários com useMemo para performance
  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return usuarios;
    }
    return usuarios.filter(
      (user) =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [usuarios, searchTerm]);

  // Handlers do Formulário
  const handleFormOpen = () => setFormOpen(true);
  const handleFormClose = () => {
    setFormOpen(false);
    setFormData({ nome: '', email: '', senha: '', perfilAcesso: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData((prev) => ({ ...prev, perfilAcesso: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/usuarios', formData);
      handleFormClose();
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  };

  // Handlers da Exclusão
  const handleDeleteClick = (user: Usuario) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setUserToDelete(null);
    setDeleteDialogOpen(false);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await api.delete(`/usuarios/${userToDelete.id}`);
        fetchUsuarios();
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      } finally {
        handleDeleteClose();
      }
    }
  };

  // Handlers da Paginação
  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, ml: '240px', p: 4 }}>
        {/* CABEÇALHO - com a correção para responsividade */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4
        }}>
          <Typography variant="h1">Usuários</Typography>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleFormOpen}>
            Adicionar Usuário
          </Button>
        </Box>

        {/* BARRA DE FERRAMENTAS */}
        <Card sx={{ p: 2, mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar usuário por nome ou e-mail..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"><Search /></InputAdornment>
              ),
            }}
          />
        </Card>

        {/* TABELA DE DADOS */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Perfil de Acesso</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>{user.nome}</Typography>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.perfilAcesso}
                        color={user.perfilAcesso === 'ADMIN' ? 'primary' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small"><Edit fontSize="small" /></IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDeleteClick(user)}>
                        <DeleteOutline fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Linhas por pág:"
          />
        </TableContainer>
      </Box>

      {/* DIALOG DE ADICIONAR/EDITAR USUÁRIO */}
      <Dialog open={formOpen} onClose={handleFormClose}>
        <DialogTitle>Adicionar Novo Usuário</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="nome" label="Nome" type="text" fullWidth value={formData.nome} onChange={handleInputChange} />
          <TextField margin="dense" name="email" label="Email" type="email" fullWidth value={formData.email} onChange={handleInputChange} />
          <TextField margin="dense" name="senha" label="Senha" type="password" fullWidth value={formData.senha} onChange={handleInputChange} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Perfil de Acesso</InputLabel>
            <Select name="perfilAcesso" value={formData.perfilAcesso} onChange={handleSelectChange} label="Perfil de Acesso">
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="USER">Usuário</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">Adicionar</Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG DE CONFIRMAÇÃO DE EXCLUSÃO */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o usuário <strong>{userToDelete?.nome}</strong>? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancelar</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Confirmar Exclusão
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsuariosPage;