import { Box, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import LivroCard from '../livros/LivroCard';
import { useLivrosComAcervo } from '../../hooks/useLivrosComAcervo';
import api from '../../services/api';

const BASE_URL = api.defaults.baseURL?.replace(/\/$/, '') || '';

export default function LivrosRecentesDashboard() {
    const { livros, loading, erro, refetch } = useLivrosComAcervo({ pageable: true, page: 0, size: 5 });
    console.log(livros);
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (erro) {
        return <Alert severity="error">{erro}</Alert>;
    }

    if (livros.length === 0) {
        return <Alert severity="info">Nenhum livro encontrado.</Alert>;
    }

    return (
        <Box mt={6} sx={{ width: '100%', ml: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Últimos livros adicionados
            </Typography>
            <Grid container spacing={2}>
                {livros.map((livro) => (
                    <Grid key={livro.id} item xs={12} sm={6} md={4} lg={3}>
                        <LivroCard
                            livroId={livro.id}
                            urlCapa={
                                livro.urlCapa?.startsWith('http')
                                    ? livro.urlCapa
                                    : BASE_URL + (livro.urlCapa?.startsWith('/') ? livro.urlCapa : '/' + livro.urlCapa)
                            }
                            titulo={livro.titulo}
                            autor={livro.autor}
                            categoria={livro.categoria}
                            urlPdf={
                                livro.urlPdf?.startsWith('http')
                                    ? livro.urlPdf
                                    : BASE_URL + (livro.urlPdf?.startsWith('/') ? livro.urlPdf : '/' + livro.urlPdf)
                            }
                            estaNoAcervo={livro.estaNoAcervo === true}
                            onAcervoAtualizado={refetch}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
