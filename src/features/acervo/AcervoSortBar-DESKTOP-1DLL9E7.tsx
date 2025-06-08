// src/features/acervo/AcervoSortBar.tsx

import React from 'react';
import {
  Card,
  TextField,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material';
import { Search } from '@mui/icons-material';

// Definindo os tipos das props que o componente vai receber
interface AcervoSortBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  genreFilter: string;
  setGenreFilter: (value: string) => void;
}

const AcervoSortBar: React.FC<AcervoSortBarProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  genreFilter,
  setGenreFilter,
}) => {
  return (
    <Card sx={{ p: 2, mb: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Buscar por título ou autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} label="Status" onChange={(e: SelectChangeEvent) => setStatusFilter(e.target.value)}>
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="Disponível">Disponível</MenuItem>
              <MenuItem value="Emprestado">Emprestado</MenuItem>
              <MenuItem value="Em Manutenção">Em Manutenção</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3}>
           <FormControl fullWidth>
            <InputLabel>Gênero</InputLabel>
            <Select value={genreFilter} label="Gênero" onChange={(e: SelectChangeEvent) => setGenreFilter(e.target.value)}>
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="Fantasia">Fantasia</MenuItem>
              <MenuItem value="Ficção Científica">Ficção Científica</MenuItem>
              <MenuItem value="Romance">Romance</MenuItem>
              <MenuItem value="Distopia">Distopia</MenuItem>
              <MenuItem value="Realismo Mágico">Realismo Mágico</MenuItem>
              <MenuItem value="Ficção">Ficção</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AcervoSortBar;