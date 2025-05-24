import { useState } from 'react';
import { Box, InputBase, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarHeaderProps {
  onSearch?: (query: string) => void;
}

const SearchBarHeader = ({ onSearch }: SearchBarHeaderProps) => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(search);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 110,
        bgcolor: 'transparent',
        background: 'linear-gradient(90deg, #1a2980 0%, #26d0ce 100%)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'relative',
        pb: 3,
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: '2px 16px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: 600,
            borderRadius: 8,
            boxShadow: 2,
            bgcolor: '#fff',
          }}
          elevation={3}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: 18 }}
            placeholder="Procure por ISBN, título, autor ou editora..."
            inputProps={{ 'aria-label': 'procure por ISBN, título, autor ou editora' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default SearchBarHeader; 