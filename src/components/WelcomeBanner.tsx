import { Box, Typography, Button, Paper } from '@mui/material';

const WelcomeBanner = () => (
  <Paper elevation={2} sx={{ p: 3, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Bem-vindo ao Biblioteca Virtual!
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Use o painel central para acessar conteúdo, adicionar itens à biblioteca, voltar à última sessão de estudos e muito mais!
      </Typography>
    </Box>
  </Paper>
);

export default WelcomeBanner; 