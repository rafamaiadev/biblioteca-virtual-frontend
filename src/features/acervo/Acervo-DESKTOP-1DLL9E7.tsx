// src/features/acervo/Acervo.tsx

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Pagination,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { Add, ViewModule, ViewList } from '@mui/icons-material';
import Sidebar from '../dashboard/Sidebar'; // Verifique o caminho
import AcervoSortBar from './AcervoSortBar';
import AcervoGrid from './AcervoGrid'; // Vamos manter o nome por enquanto

// Dados de exemplo (devem ficar no componente principal)
const mockBooks = [
  { id: 1, title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien', genre: 'Fantasia', status: 'Disponível', imageUrl: '/covers/o-senhor-dos-aneis.jpg' },
  { id: 2, title: 'Duna', author: 'Frank Herbert', genre: 'Ficção Científica', status: 'Emprestado', imageUrl: '/covers/duna.jpg' },
  { id: 3, title: 'Orgulho e Preconceito', author: 'Jane Austen', genre: 'Romance', status: 'Disponível', imageUrl: '/covers/orgulho-e-preconceito.jpg' },
  { id: 4, title: '1984', author: 'George Orwell', genre: 'Distopia', status: 'Disponível', imageUrl: 'covers/1984.jpg' },
  { id: 5, title: 'O Guia do Mochileiro das Galáxias', author: 'Douglas Adams', genre: 'Ficção Científica', status: 'Em Manutenção', imageUrl: '/covers/guia-mochileiro.jpg' },
  { id: 6, title: 'A Revolução dos Bichos', author: 'George Orwell', genre: 'Distopia', status: 'Disponível', imageUrl: 'covers/revolucao-dos-bichos.jpg' },
  { id: 7, title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez', genre: 'Realismo Mágico', status: 'Emprestado', imageUrl: 'covers/cem-anos-de-solidao.jpg' },
  { id: 8, title: 'A Metamorfose', author: 'Franz Kafka', genre: 'Ficção', status: 'Disponível', imageUrl: 'covers/metamorfose.jpg' },
  { id: 9, title: 'O Apanhador no Campo de Centeio', author: 'J.D. Salinger', genre: 'Ficção', status: 'Disponível', imageUrl: 'covers/apanhador-no-campo-de-centeio.jpg' },

];


const Acervo = () => {
  // Todos os estados agora vivem no componente pai
  const [books] = useState(mockBooks);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  // Lógica de Filtragem (continua no pai)
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const searchMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter ? book.status === statusFilter : true;
      const genreMatch = genreFilter ? book.genre === genreFilter : true;
      return searchMatch && statusMatch && genreMatch;
    });
  }, [books, searchTerm, statusFilter, genreFilter]);

  // Lógica de Paginação (continua no pai)
  const paginatedBooks = filteredBooks.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Handlers (funções que modificam o estado)
  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: 'grid' | 'list' | null) => {
    if (newView !== null) setView(newView);
  };
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => setPage(value);


  return (
    // CORREÇÃO: Usando a cor do tema e removendo a largura fixa
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <Sidebar selected="Acervo" />
      {/* CORREÇÃO: Adicionando padding e a estrutura correta */}
      <Box component="main" sx={{ flexGrow: 1, ml: '240px', p: 4, display: 'flex', flexDirection: 'column' }}>

        {/* O cabeçalho agora vive no componente principal */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Typography variant="h1">Acervo da Biblioteca</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ToggleButtonGroup value={view} exclusive onChange={handleViewChange}>
              <ToggleButton value="grid"><ViewModule /></ToggleButton>
              <ToggleButton value="list"><ViewList /></ToggleButton>
            </ToggleButtonGroup>
            <Button variant="contained" color="primary" startIcon={<Add />}>Adicionar Livro</Button>
          </Box>
        </Box>

        {/* Passando os estados e as funções para a barra de filtros */}
        <AcervoSortBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
        />

        {/* Passando a lista de livros já filtrada e paginada e a visualização */}
        <AcervoGrid
          books={paginatedBooks}
          view={view}
        />

        {/* A paginação também vive no componente principal */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(filteredBooks.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Acervo;