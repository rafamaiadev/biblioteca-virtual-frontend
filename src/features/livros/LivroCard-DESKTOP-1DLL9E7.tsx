
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
    // Sua lógica de fetch do PDF está ótima e foi mantida
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(urlPdf, { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error('Erro ao buscar PDF');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      alert('Erro ao abrir o PDF');
    }
  };

  return (
    // Usando as variáveis do tema para o card
    <Card sx={{
      maxWidth: 250, // Mantive a largura máxima para consistência do card
      m: 'auto',
      borderRadius: (theme) => theme.shape.borderRadius, // Usando o raio de borda do tema
      boxShadow: 3, // Usando um valor de sombra padrão do tema
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.03)' // Efeito de zoom sutil no hover
      }
    }}>
      <CardMedia
        component="img"
        height="250"
        image={urlCapa}
        alt={titulo}
        sx={{
          objectFit: 'contain',
          p: 2,
          bgcolor: 'background.default' // Usando a cor de fundo do tema
        }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5, lineHeight: 1.2 }}>
          {titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {autor}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Chip label={categoria} color="primary" variant="outlined" size="small" />
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

// É uma boa prática adicionar o Chip aqui também. Se ele não estiver sendo importado, adicione-o.
import { Chip } from '@mui/material';

export default LivroCard;