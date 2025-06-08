// src/features/dashboard/components/KpiCards.tsx

import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { MenuBook, Group, TrendingUp, WarningAmber } from '@mui/icons-material'; // Ícones do MUI

const kpiData = [
  {
    title: 'Livros no Acervo',
    value: '1.284',
    Icon: MenuBook,
    color: 'primary.main',
  },
  {
    title: 'Usuários Cadastrados',
    value: '312',
    Icon: Group,
    color: 'primary.main',
  },
  {
    title: 'Livros Emprestados',
    value: '97',
    Icon: TrendingUp,
    color: 'primary.main',
  },
  {
    title: 'Empréstimos com Atraso',
    value: '8',
    Icon: WarningAmber,
    color: 'warning.main', // Usando a cor de aviso do nosso tema
  },
];

const KpiCards = () => (
  <Grid container spacing={3}>
    {kpiData.map((item) => (
      <Grid item xs={12} sm={6} md={3} key={item.title}>
        <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Box sx={{ mr: 2 }}>
            <item.Icon sx={{ fontSize: 40, color: item.color }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {item.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.title}
            </Typography>
          </Box>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default KpiCards;