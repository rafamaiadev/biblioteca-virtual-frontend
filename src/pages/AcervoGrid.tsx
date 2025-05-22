import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  TextField, 
  Box, 
  Typography,
  CircularProgress,
  Alert,
  Pagination,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LivroCard from '../components/LivroCard';
import api from '../services/api';
import type { Livro } from '../pages/Livros';

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
    console.log('useEffect disparado. searchTerm:', searchTerm);
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

        setLivros(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalItems(response.data.totalElements);
      } catch (err) {
        setError('Erro ao carregar os livros. Por favor, tente novamente.');
        console.error('Erro ao carregar livros:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchLivros();
    }, 200);

    return () => clearTimeout(debounceTimer);
  }, [page, searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Valor digitado:', event.target.value);
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading && livros.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Acervo
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Explore nossa coleção de livros
        </Typography>
      </Box>

      <Box mb={4}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por título, autor ou descrição..."
          value={searchTerm}
          onChange={(e) => {
            console.log('TextField onChange disparado');
            handleSearchChange(e as React.ChangeEvent<HTMLInputElement>);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && livros.length === 0 && (
        <Alert severity="info">
          Nenhum livro encontrado. Tente uma busca diferente.
        </Alert>
      )}

      <Grid container spacing={3}>
        {livros.map((livro) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={livro.id}>
            <LivroCard
              urlCapa={
                livro.urlCapa.startsWith('http')
                  ? livro.urlCapa
                  : BASE_URL + (livro.urlCapa.startsWith('/') ? livro.urlCapa : '/' + livro.urlCapa)
              }
              titulo={livro.titulo}
              autor={livro.autor}
              categoria={livro.categoria}
              urlPdf={
                livro.urlPdf.startsWith('http')
                  ? livro.urlPdf
                  : BASE_URL + (livro.urlPdf.startsWith('/') ? livro.urlPdf : '/' + livro.urlPdf)
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