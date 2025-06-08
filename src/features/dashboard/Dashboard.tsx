// src/features/dashboard/Dashboard.tsx

import { Box, Grid } from '@mui/material';
import Sidebar from './Sidebar'; // Supondo que esteja na mesma pasta
import WelcomeBanner from './WelcomeBanner'; // Supondo que esteja na mesma pasta

// Nossos novos componentes de conteúdo
import KpiCards from './components/KpiCards';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';


const Dashboard = () => (
  // O Box principal usa a cor de fundo do nosso novo tema
  <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
    <Sidebar />
    <Box
      component="main"
      // ml: '240px' corresponde à largura do seu Sidebar. Mantenha-o.
      sx={{ flexGrow: 1, ml: '240px', p: 4 }} 
    >
      <WelcomeBanner />

      {/* Grid container para organizar todo o conteúdo do dashboard */}
      <Grid container spacing={4}>
        
        {/* Item do Grid para os cards de KPI (ocupa a largura total) */}
        <Grid item xs={12}>
          <KpiCards />
        </Grid>

        {/* Item do Grid para a Atividade Recente (ocupa 2/3 em telas grandes) */}
        <Grid item xs={12} lg={8}>
          <RecentActivity />
        </Grid>

        {/* Item do Grid para as Ações Rápidas (ocupa 1/3 em telas grandes) */}
        <Grid item xs={12} lg={4}>
          <QuickActions />
        </Grid>

      </Grid>
    </Box>
  </Box>
);

export default Dashboard;