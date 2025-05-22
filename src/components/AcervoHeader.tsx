import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const AcervoHeader = () => (
  
  <Box sx={{ width: '100%', bgcolor: '#4a6cf7', py: 5, px: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <TextField
      placeholder="Buscar por título, gênero, autor, editora e palavra-chave"
      variant="outlined"
      sx={{ width: '100%', maxWidth: 600, bgcolor: '#fff', borderRadius: 2 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="primary" />
          </InputAdornment>
        ),
      }}
    />
  </Box>
);

export default AcervoHeader; 