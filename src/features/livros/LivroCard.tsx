import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Button
} from '@mui/material';
import {useAuth} from '../../contexts/AuthContext.tsx';
import api from '../../services/api';

interface LivroCardProps {
    livroId: number;
    urlCapa: string;
    titulo: string;
    autor: string;
    categoria: string;
    urlPdf: string;
    estaNoAcervo: boolean;
    onAcervoAtualizado?: () => void;
}

const LivroCard = ({
                       livroId,
                       urlCapa,
                       titulo,
                       autor,
                       categoria,
                       urlPdf,
                       estaNoAcervo,
                       onAcervoAtualizado
                   }: LivroCardProps) => {
    const {token} = useAuth();

    const handleLerClick = async () => {
        try {
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

    const handleAcervoClick = async () => {
        try {
            const payload = JSON.parse(atob(token!.split('.')[1]));
            const usuarioId = payload.usuarioId;

            const method = estaNoAcervo ? 'DELETE' : 'POST';

            const response = await api({
                url: `/usuarios/${usuarioId}/livros/${livroId}`,
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onAcervoAtualizado?.();
        } catch (err) {
            alert('Erro ao atualizar acervo do usuário');
        }
    };

    return (
        <Card
            sx={{
                width: 250,
                m: 'auto',
                borderRadius: 2,
                boxShadow: 2,
                position: 'relative',
                cursor: 'pointer',
            }}
        >
            <CardMedia
                component="img"
                height="250"
                image={urlCapa}
                alt={titulo}
                sx={{objectFit: 'contain', p: 2, bgcolor: '#f8f8f8'}}
                onClick={handleLerClick}
            />
            <CardContent sx={{pt: 1, pb: 2}}>
                <Typography variant="subtitle2" sx={{fontWeight: 700, mb: 0.5}}>
                    Título: {titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Autor: {autor}
                </Typography>
                <Box sx={{mt: 1}}>
                    <Typography variant="caption" color="primary">
                        Categoria: {categoria}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLerClick}
                    sx={{mt: 2, width: '100%'}}
                >
                    Ler
                </Button>
                <Button
                    variant="contained"
                    color={estaNoAcervo ? 'error' : 'success'}
                    onClick={handleAcervoClick}
                    sx={{mt: 1, width: '100%'}}
                >
                    {estaNoAcervo ? 'Remover do Meu Acervo' : 'Adicionar ao Meu Acervo'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default LivroCard;
