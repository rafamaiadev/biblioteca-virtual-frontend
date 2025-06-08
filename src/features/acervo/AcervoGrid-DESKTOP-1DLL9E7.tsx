// src/features/acervo/AcervoGrid.tsx

import React from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
} from '@mui/material';
import { Edit, DeleteOutline } from '@mui/icons-material';

// Definindo a interface do livro e das props
interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  status: string;
  imageUrl: string;
}

interface AcervoGridProps {
  books: Book[];
  view: 'grid' | 'list';
}

const AcervoGrid: React.FC<AcervoGridProps> = ({ books, view }) => {
  if (view === 'grid') {
    return (
      <Grid container spacing={3}>
        {books.map(book => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia component="img" height="240" image={book.imageUrl} alt={book.title} sx={{ objectFit: 'contain' }} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>{book.title}</Typography>
                <Typography variant="body2" color="text.secondary">{book.author}</Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Chip label={book.status} color={book.status === 'Disponível' ? 'success' : book.status === 'Emprestado' ? 'error' : 'warning'} size="small" />
                <Box>
                  <IconButton size="small"><Edit fontSize="inherit" /></IconButton>
                  <IconButton size="small" color="error"><DeleteOutline fontSize="inherit" /></IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  // Se a view não for 'grid', será 'list'
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ bgcolor: 'background.default' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Título</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Autor</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Gênero</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map(book => (
            <TableRow key={book.id}>
              <TableCell sx={{ fontWeight: 500 }}>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell><Chip label={book.status} color={book.status === 'Disponível' ? 'success' : book.status === 'Emprestado' ? 'error' : 'warning'} size="small" /></TableCell>
              <TableCell align="right">
                <IconButton size="small"><Edit fontSize="inherit" /></IconButton>
                <IconButton size="small" color="error"><DeleteOutline fontSize="inherit" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AcervoGrid;