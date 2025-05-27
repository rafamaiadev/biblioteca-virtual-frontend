import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import logo from '../../assets/logo.png';
import { Link as RouterLink } from 'react-router-dom';
import UserProfileMenu from '../../components/UserProfileMenu';

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
        <ListItem component={RouterLink} to="/dashboard" sx={selected === 'Início' ? { bgcolor: '#e3f2fd', cursor: 'pointer' } : { cursor: 'pointer' }}>
          <ListItemIcon><HomeIcon color={selected === 'Início' ? 'primary' : 'inherit'} /></ListItemIcon>
          <ListItemText primary="Início" />
        </ListItem>
        <ListItem component={RouterLink} to="/acervo" sx={selected === 'Acervo' ? { bgcolor: '#e3f2fd', cursor: 'pointer' } : { cursor: 'pointer' }}>
          <ListItemIcon><MenuBookIcon color={selected === 'Acervo' ? 'primary' : 'inherit'} /></ListItemIcon>
          <ListItemText primary="Acervo" />
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="caption" sx={{ pl: 3, color: 'gray' }}>MINHAS ESTANTES</Typography>
      <List>
        <ListItem component={RouterLink} to="/meus-livros" sx={selected === 'Meus Livros' ? { bgcolor: '#e3f2fd', cursor: 'pointer' } : { cursor: 'pointer' }}>
          <ListItemIcon><LibraryBooksIcon color={selected === 'Meus Livros' ? 'primary' : 'inherit'} /></ListItemIcon>
          <ListItemText primary="Meus Livros" />
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