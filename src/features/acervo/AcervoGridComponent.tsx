import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import LivroCard from '../livros/LivroCard';
import api from '../../services/api';

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  urlCapa: string;
  urlPdf: string;
}

const AcervoGrid = () => {
  const [livros, setLivros] = useState<Livro[]>([]);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await api.get('/livros');
        console.log('Resposta da API:', response.data);
        setLivros(Array.isArray(response.data.content)
        ? response.data.content
        : Array.isArray(response.data)
        ? response.data
        : []);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };
    fetchLivros();
  }, []);

  const BASE_URL = api.defaults.baseURL?.replace(/\/$/, '') || '';

  return (
    <Grid container spacing={4} sx={{ width: '100%', maxWidth: 1200, mx: 'auto', py: 4 }}>
      {livros.map((livro) => (
        <Grid key={livro.id} size={{ xs: 12, sm: 6, md: 3 }}>
          <LivroCard
            urlCapa={livro.urlCapa.startsWith('http') ? livro.urlCapa : BASE_URL + livro.urlCapa}
            titulo={livro.titulo}
            autor={livro.autor}
            categoria={livro.categoria}
            urlPdf={livro.urlPdf.startsWith('http') ? livro.urlPdf : BASE_URL + livro.urlPdf}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AcervoGrid; 