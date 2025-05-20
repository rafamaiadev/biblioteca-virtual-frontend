import { Box, Typography } from '@mui/material';

const SearchEmptyState = () => (
  <Box sx={{ textAlign: 'center', mt: 8 }}>
    {/* Ilustração simples (pode ser substituída por SVG depois) */}
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
      <img src="https://cdn-icons-png.flaticon.com/512/4072/4072155.png" alt="Ilustração pesquisa" style={{ width: 120, opacity: 0.7 }} />
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
      Procure em todos os títulos disponíveis !
    </Typography>
    <Typography variant="body1" color="text.secondary">
      Procure por uma palavra-chave ou termo do glossário em todos os livros da sua biblioteca.
    </Typography>
  </Box>
);

export default SearchEmptyState; 