import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';

interface LivroCardProps {
  urlCapa: string;
  titulo: string;
  autor: string;
  categoria: string;
  urlPdf: string;
}

const LivroCard = ({ urlCapa, titulo, autor, categoria, urlPdf }: LivroCardProps) => {
  const handleLerClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(urlPdf, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Erro ao buscar PDF');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      alert('Erro ao abrir o PDF');
    }
  };

  return (
    <Card sx={{ width: 250, m: 'auto', borderRadius: 5, boxShadow: 2, position: 'relative', cursor: 'pointer' }}>
        <CardMedia
          component="img"
          height="250"
          image={urlCapa}
          alt={titulo}
          sx={{ objectFit: 'contain', p: 2, bgcolor: '#f8f8f8' }}
          onClick={handleLerClick}
        />
      <CardContent sx={{ pt: 1, pb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
          {titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {autor}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="primary">
            {categoria}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLerClick}
          sx={{ mt: 2, width: '100%' }}
        >
          Ler
        </Button>
      </CardContent>
    </Card>
  );
};

export default LivroCard; 