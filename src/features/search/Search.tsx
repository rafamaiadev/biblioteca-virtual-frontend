import { Box } from '@mui/material';
import Sidebar from '../dashboard/Sidebar';
import SearchBarHeader from './SearchBarHeader';
import SearchEmptyState from './SearchEmptyState';

const Search = () => (
  <Box sx={{ display: 'flex', bgcolor: '#f7f9fb', minHeight: '100vh' }}>
    <Sidebar selected="Pesquisar" />
    <Box sx={{ flexGrow: 1, ml: '240px', minHeight: '100vh', p: 0, display: 'flex', flexDirection: 'column' }}>
      <SearchBarHeader />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Box sx={{ width: '100%', maxWidth: 600, mt: { xs: 4, md: 8 } }}>
          <SearchEmptyState />
        </Box>
      </Box>
    </Box>
  </Box>
);

export default Search; 