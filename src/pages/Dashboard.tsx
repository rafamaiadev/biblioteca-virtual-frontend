import { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import {
  Book as BookIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLivros: 0,
    totalUsuarios: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [livrosResponse, usuariosResponse] = await Promise.all([
          api.get('/livros'),
          api.get('/usuarios'),
        ]);

        setStats({
          totalLivros: livrosResponse.data.length,
          totalUsuarios: usuariosResponse.data.length,
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Layout title="Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BookIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                <Typography variant="h5" component="div">
                  Total de Livros
                </Typography>
              </Box>
              <Typography variant="h3" component="div">
                {stats.totalLivros}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                <Typography variant="h5" component="div">
                  Total de Usuários
                </Typography>
              </Box>
              <Typography variant="h3" component="div">
                {stats.totalUsuarios}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard; 