import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  CircularProgress,
  Alert,
  Pagination,
} from '@mui/material';
import LivroCard from '../livros/LivroCard';
import api from '../../services/api';
import type { Livro } from '../livros/Livros';
import AcervoHeader from './AcervoHeader';

const BASE_URL = api.defaults.baseURL?.replace(/\/$/, '') || '';

export default function AcervoGrid() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        setLoading(true);
        setError(null);

        const params: any = {
          page: page - 1,
          size: itemsPerPage,
        };
        if (searchTerm) {
          params.search = searchTerm;
        }

        console.log('Enviando requisição com params:', params);
        const response = await api.get('/livros', { params });
        console.log('Resposta da API:', response.data);

        const data = response.data;
        const livrosArr = Array.isArray(data) ? data : [];
        setLivros(livrosArr);
        setTotalPages(Math.ceil(livrosArr.length / itemsPerPage));
        setTotalItems(livrosArr.length);
      } catch (err) {
        setError('Erro ao carregar os livros. Por favor, tente novamente.');
        console.error('Erro ao carregar livros:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchLivros();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [page, searchTerm]);

  useEffect(() => {
    return () => {
      console.log('AcervoGrid desmontado');
    };
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const livrosPaginados = livros.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (loading && (!Array.isArray(livros) || livros.length === 0)) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AcervoHeader onSearch={setSearchTerm} initialValue={searchTerm} />
      <Box mt={4}/>
      {!loading && livros.length === 0 && (
        <Alert severity="info">
          Nenhum livro encontrado. Tente uma busca diferente.
        </Alert>
      )}

      <Grid container spacing={3}>
        {livrosPaginados.map((livro) => (
          <Grid key={livro.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <LivroCard
              urlCapa={
                (livro as any).urlCapa?.startsWith('http')
                  ? (livro as any).urlCapa
                  : BASE_URL + ((livro as any).urlCapa?.startsWith('/') ? (livro as any).urlCapa : '/' + (livro as any).urlCapa)
              }
              titulo={(livro as any).titulo}
              autor={(livro as any).autor}
              categoria={(livro as any).categoria}
              urlPdf={
                (livro as any).urlPdf?.startsWith('http')
                  ? (livro as any).urlPdf
                  : BASE_URL + ((livro as any).urlPdf?.startsWith('/') ? (livro as any).urlPdf : '/' + (livro as any).urlPdf)
              }
            />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
} 