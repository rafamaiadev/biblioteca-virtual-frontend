import {useEffect, useState} from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, Select, MenuItem, FormControl, InputLabel, Container, Typography, Box
} from '@mui/material';
import {Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon} from '@mui/icons-material';
import Layout from '../dashboard/Layout';
import Sidebar from '../dashboard/Sidebar';
import api from '../../services/api';
import type {SelectChangeEvent} from '@mui/material';

interface Usuario {
    id: number;
    username: string;
    nome: string;
    email: string;
    perfilAcesso: number;
}

interface PerfilAcesso {
    id: number;
    descricao: string;
}

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [perfisAcesso, setPerfisAcesso] = useState<PerfilAcesso[]>([]);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        nome: '',
        username: '',
        email: '',
        password: '',
        perfilAcessoId: 0,
    });

    useEffect(() => {
        fetchUsuarios();
        fetchPerfisAcesso();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await api.get('/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    const fetchPerfisAcesso = async () => {
        try {
            const response = await api.get('/perfis-acesso');
            setPerfisAcesso(response.data);
        } catch (error) {
            console.error('Erro ao buscar perfis de acesso:', error);
        }
    };

    const handleOpen = () => {
        setIsEditing(false);
        setFormData({nome: '', username: '', email: '', password: '', perfilAcessoId: 0});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingId(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && editingId !== null) {
                await api.put(`/usuarios/${editingId}`, formData);
            } else {
                await api.post('/usuarios', formData);
            }
            handleClose();
            fetchUsuarios();
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
            alert('Erro ao salvar usuário. Tente novamente.');
        }
    };

    const handleEdit = (usuario: Usuario) => {
        setIsEditing(true);
        setEditingId(usuario.id);
        setFormData({
            nome: usuario.nome,
            username: usuario.username,
            email: usuario.email,
            password: '',
            perfilAcessoId: usuario.perfilAcesso,
        });
        setOpen(true);
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
        <Layout sx={{display: 'flex', bgcolor: '#f7f9fb', minHeight: '100vh'}}>
            <Sidebar/>
            <Container sx={{my: 4, width: '70vw'}}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                    <Typography variant="h4" fontWeight={600}>Usuários</Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        onClick={handleOpen}
                        sx={{maxWidth: 0.22, px: 1}}
                    >
                        Adicionar Usuário
                    </Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Perfil de Acesso</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usuarios.map((usuario) => (
                                <TableRow key={usuario.id}>
                                    <TableCell>{usuario.username}</TableCell>
                                    <TableCell>{usuario.nome}</TableCell>
                                    <TableCell>{usuario.email}</TableCell>
                                    <TableCell>
                                        {perfisAcesso.find(p => p.id === usuario.perfilAcesso)?.descricao || usuario.perfilAcesso}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box display="flex" justifyContent="flex-end">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEdit(usuario)}
                                                size="small"
                                            >
                                                <EditIcon fontSize="small"/>
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(usuario.id)}
                                                size="small"
                                            >
                                                <DeleteIcon fontSize="small"/>
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            {/* Formulário de cadastro/edição */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEditing ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="nome"
                        label="Nome"
                        fullWidth
                        value={formData.nome}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="username"
                        label="Username"
                        fullWidth
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        label="Senha"
                        type="password"
                        fullWidth
                        value={formData.password}
                        onChange={handleInputChange}
                        helperText={isEditing ? 'Deixe em branco para manter a senha atual' : ''}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Perfil de Acesso</InputLabel>
                        <Select
                            name="perfilAcessoId"
                            value={formData.perfilAcessoId}
                            onChange={handleSelectChange}
                            label="Perfil de Acesso"
                        >
                            {perfisAcesso.map((perfil) => (
                                <MenuItem key={perfil.id} value={perfil.id}>
                                    {perfil.descricao}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {isEditing ? 'Salvar Alterações' : 'Adicionar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
};

export default Usuarios;
