import { Box } from '@mui/material';
import Sidebar from '../dashboard/Sidebar';
import AcervoSortBar from './AcervoSortBar';
import AcervoGrid from './AcervoGrid';

const Acervo = () => (
  <Box sx={{ display: 'flex', bgcolor: '#f7f9fb', minHeight: '100vh', width: '100vw' }}>
    <Sidebar selected="Acervo" />
    <Box sx={{ flexGrow: 1, minHeight: '100vh', p: 0, display: 'flex', flexDirection: 'column' }}>
      <AcervoGrid />
    </Box>
  </Box>
);

export default Acervo; 