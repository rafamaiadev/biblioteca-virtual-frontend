import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import logo from '../assets/logo.png';
import { Link as RouterLink } from 'react-router-dom';

interface SidebarProps {
  selected?: string;
}

const Sidebar = ({ selected }: SidebarProps) => (
  <Box
    sx={{
      width: 240,
      height: '100vh',
      bgcolor: '#fff',
      borderRight: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1000,
    }}
  >
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 3 }}>
        <img src={logo} alt="Logo" style={{ width: 120 }} />
      </Box>
      <List>
        <ListItem button component={RouterLink} to="/dashboard" selected={selected === 'Início'}>
          <ListItemIcon><HomeIcon color={selected === 'Início' ? 'primary' : 'inherit'} /></ListItemIcon>
          <ListItemText primary="Início" />
        </ListItem>
        <ListItem button component={RouterLink} to="/pesquisar" selected={selected === 'Pesquisar'}>
          <ListItemIcon><SearchIcon color={selected === 'Pesquisar' ? 'primary' : 'inherit'} /></ListItemIcon>
          <ListItemText primary="Pesquisar" />
        </ListItem>
        <ListItem button component={RouterLink} to="/catalogo" selected={selected === 'Catálogo'}>
          <ListItemIcon><MenuBookIcon color={selected === 'Acervo' ? 'primary' : 'inherit'} /></ListItemIcon>
          <ListItemText primary="Acervo" />
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="caption" sx={{ pl: 3, color: 'gray' }}>MINHAS ESTANTES</Typography>
      <List>
        <ListItem button component={RouterLink} to="/meus-livros" selected={selected === 'Meus Livros'}>
          <ListItemIcon><LibraryBooksIcon color={selected === 'Meus Livros' ? 'primary' : 'inherit'} /></ListItemIcon>
          <ListItemText primary="Meus Livros" />
        </ListItem>
        <ListItem button component={RouterLink} to="/favoritos" selected={selected === 'Favoritos'}>
          <ListItemIcon><FavoriteIcon color={selected === 'Favoritos' ? 'primary' : 'inherit'} /></ListItemIcon>
          <ListItemText primary="Favoritos" />
        </ListItem>
      </List>
    </Box>
    <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', color: 'gray', fontSize: 13 }}>
      <div>Ajuda</div>
      <div>Configurações</div>
    </Box>
  </Box>
);

export default Sidebar; 