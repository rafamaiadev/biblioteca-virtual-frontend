import React, {useState} from 'react';
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
import AcervoHeader from './AcervoHeader';
import {useLivrosComAcervo} from '../../hooks/useLivrosComAcervo.tsx';

const BASE_URL = api.defaults.baseURL?.replace(/\/$/, '') || '';

export default function AcervoGrid() {
    const {livros, loading, erro, refetch} = useLivrosComAcervo();
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 12;

    const livrosFiltrados = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalItems = livrosFiltrados.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const livrosPaginados = livrosFiltrados.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleSearchChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
        setPage(1);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (erro) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <Alert severity="error">{erro}</Alert>
            </Box>
        );
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            <AcervoHeader onSearch={handleSearchChange} initialValue={searchTerm}/>
            <Box mt={4}/>
            {livrosPaginados.length === 0 && (
                <Alert severity="info">Nenhum livro encontrado. Tente uma busca diferente.</Alert>
            )}

            <Grid container spacing={3}>
                {livrosPaginados.map((livro) => (
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
