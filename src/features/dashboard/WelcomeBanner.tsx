import { Box, Typography, Button, Paper } from '@mui/material';
import UserProfileMenu from '../../components/UserProfile';

const WelcomeBanner = () => (
  <Paper elevation={2} sx={{ p: 3, mb: 3, ml: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '96.5%' }}>
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Bem-vindo ao Biblioteca Virtual!
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Aqui você pode gerenciar seus livros, estantes e muito mais!
      </Typography>
    </Box>
  </Paper>
);

export default WelcomeBanner; 