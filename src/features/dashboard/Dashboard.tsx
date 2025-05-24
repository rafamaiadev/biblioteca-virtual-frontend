import { Box, Container, Grid, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import WelcomeBanner from './WelcomeBanner';
import ActionCards from './ActionCards';

const Dashboard = () => (
  <Box sx={{ display: 'flex', bgcolor: '#f7f9fb', minHeight: '100vh' }}>
    <Sidebar />
    <Box component="main" sx={{ flexGrow: 1, ml: '240px', p: 4 }}>
      <WelcomeBanner />
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Começar agora
      </Typography>
      <ActionCards />
    </Box>
  </Box>
);

export default Dashboard; 