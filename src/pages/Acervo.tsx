import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import AcervoHeader from '../components/AcervoHeader';
import AcervoSortBar from '../components/AcervoSortBar';
import AcervoGrid from '../components/AcervoGrid';

const Acervo = () => (
  <Box sx={{ display: 'flex', bgcolor: '#f7f9fb', minHeight: '100vh' }}>
    <Sidebar selected="Acervo" />
    <Box sx={{ flexGrow: 1, ml: '240px', minHeight: '100vh', p: 0, display: 'flex', flexDirection: 'column' }}>
      <AcervoHeader />
      <AcervoSortBar />
      <AcervoGrid />
    </Box>
  </Box>
);

export default Acervo; 