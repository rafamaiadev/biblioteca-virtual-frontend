import { Grid, Paper, Typography, Box } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';

const ActionCards = () => (
  <Grid container spacing={2} sx={{ mb: 3 }}>
    <Grid item xs={12} md={6}>
      <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <MenuBookIcon sx={{ fontSize: 32, mr: 2 }} color="primary" />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Catálogo</Typography>
          <Typography variant="body2" color="text.secondary">
            Descubra coleções de livros disponíveis, com recomendações exclusivas para você!
          </Typography>
        </Box>
      </Paper>
    </Grid>
    <Grid item xs={12} md={6}>
      <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <SearchIcon sx={{ fontSize: 32, mr: 2 }} color="primary" />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Pesquisar</Typography>
          <Typography variant="body2" color="text.secondary">
            Procure por título ou por uma palavra-chave dentro dos livros.
          </Typography>
        </Box>
      </Paper>
    </Grid>
  </Grid>
);

export default ActionCards; 