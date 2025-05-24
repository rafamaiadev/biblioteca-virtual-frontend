import { Box, Typography, Select, MenuItem } from '@mui/material';

const AcervoSortBar = () => (
  <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 3, px: 2 }}>
    <Typography variant="body2" color="text.secondary">
      Exibindo 0 - 0 de 17716
    </Typography>
    <Select defaultValue="Melhor avaliados" size="small" sx={{ minWidth: 180 }}>
      <MenuItem value="Melhor avaliados">Melhor avaliados</MenuItem>
      <MenuItem value="Mais recentes">Mais recentes</MenuItem>
      <MenuItem value="Mais populares">Mais populares</MenuItem>
      <MenuItem value="A-Z">A-Z</MenuItem>
    </Select>
  </Box>
);

export default AcervoSortBar; 