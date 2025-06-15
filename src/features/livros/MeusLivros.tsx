import React, {useEffect, useState} from 'react';
import {
    Container,
    Grid,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import api from '../../services/api';
import LivroCard from '../livros/LivroCard';
import {useAuth} from '../../contexts/AuthContext.tsx';
import Layout from "../dashboard/Layout.tsx";
import Sidebar from "../dashboard/Sidebar.tsx";

interface Livro {
    id: number;
    titulo: string;
    autor: string;
    categoria: string;
    urlCapa?: string;
    urlPdf?: string;
}

const BASE_URL = api.defaults.baseURL?.replace(/\/$/, '') || '';

const MeusLivros: React.FC = () => {
    const {usuarioId} = useAuth();
    const [livros, setLivros] = useState<Livro[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    const fetchLivros = async () => {
        try {
            setErro(null);
            const response = await api.get<Livro[]>(`/usuarios/${usuarioId}/livros`);
            setLivros(response.data);
        } catch (err) {
            setErro('Erro ao buscar livros do usuário.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (usuarioId) {
            fetchLivros();
        } else {
            setErro('Usuário não identificado.');
            setLoading(false);
        }
    }, [usuarioId]);


    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress/>
            </Box>
        );
    }

    if (erro) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <Alert severity="error">{erro}</Alert>
            </Box>
        );
    }

    return (
        <Layout>
            <Sidebar/>
            <Container maxWidth="lg" sx={{py: 4}}>
                <Box mt={2}/>
                {livros.length === 0 ? (
                    <Alert severity="info">
                        Você ainda não possui livros na sua coleção.
                    </Alert>
                ) : (
                    <Grid container spacing={3}>
                        {livros.map((livro) => (
                            <Grid item key={livro.id} xs={12} sm={6} md={4} lg={3}>
                                <LivroCard
                                    livroId={livro.id}
                                    urlCapa={
                                        livro.urlCapa?.startsWith('http')
                                            ? livro.urlCapa
                                            : BASE_URL + (livro.urlCapa?.startsWith('/') ? livro.urlCapa : '/' + livro.urlCapa)
                                    }
                                    titulo={livro.titulo}
                                    autor={livro.autor}
                                    id={livro.id}
                                    categoria={livro.categoria}
                                    urlPdf={
                                        livro.urlPdf?.startsWith('http')
                                            ? livro.urlPdf
                                            : BASE_URL + (livro.urlPdf?.startsWith('/') ? livro.urlPdf : '/' + livro.urlPdf)
                                    }
                                    estaNoAcervo={true}
                                    onAcervoAtualizado={fetchLivros}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Layout>
    );
};

export default MeusLivros;
