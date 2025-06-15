import {useEffect, useState} from 'react';
import api from '../services/api';
import {useAuth} from '../contexts/AuthContext';

export interface Livro {
    id: number;
    titulo: string;
    autor: string;
    categoria: string;
    urlCapa?: string;
    urlPdf?: string;
    estaNoAcervo?: boolean;
}

interface UseLivrosComAcervoParams {
    pageable?: boolean;
    page?: number;
    size?: number;
}

export const useLivrosComAcervo = ({
                                       pageable = false,
                                       page = 0,
                                       size = 5,
                                   }: UseLivrosComAcervoParams = {}) => {
    const {usuarioId} = useAuth();
    const [livros, setLivros] = useState<Livro[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);


    const fetchLivros = async () => {
        try {
            setErro(null);
            if (!usuarioId) {
                setErro('Usuário não identificado.');
                setLoading(false);
                return;
            }

            if (pageable) {
                const [todosLivrosRes, livrosUsuarioRes] = await Promise.all([
                    api.get('/livros/pageable', {params: {page, size}}),
                    api.get<Livro[]>(`/usuarios/${usuarioId}/livros`),
                ]);

                const todosLivrosData = todosLivrosRes.data.content;
                const livrosUsuarioIds = new Set(livrosUsuarioRes.data.map(l => l.id));
                const livrosMarcados = (todosLivrosData || []).map((livro: Livro) => ({
                    ...livro,
                    estaNoAcervo: livrosUsuarioIds.has(livro.id),
                }));

                setLivros(livrosMarcados);
                setTotalPages(todosLivrosData.totalPages ?? 1);
                setTotalItems(todosLivrosData.totalElements ?? 0);

            } else {
                const [todosLivrosRes, livrosUsuarioRes] = await Promise.all([
                    api.get<Livro[]>('/livros'),
                    api.get<Livro[]>(`/usuarios/${usuarioId}/livros`),
                ]);

                const livrosUsuarioIds = new Set(livrosUsuarioRes.data.map(l => l.id));

                const livrosMarcados = todosLivrosRes.data.map(livro => ({
                    ...livro,
                    estaNoAcervo: livrosUsuarioIds.has(livro.id),
                }));

                setLivros(livrosMarcados);
                setTotalPages(1);
                setTotalItems(livrosMarcados.length);
            }
        } catch (err) {
            setErro('Erro ao buscar livros.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLivros();
    }, [usuarioId, pageable, page, size]);

    return { livros, loading, erro, totalPages, totalItems, refetch: fetchLivros };
};
