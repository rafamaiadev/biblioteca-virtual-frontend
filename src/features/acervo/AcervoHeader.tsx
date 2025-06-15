import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

interface AcervoHeaderProps {
  onSearch: (value: string) => void;
  initialValue?: string;
}

const AcervoHeader = ({ onSearch, initialValue = '' }: AcervoHeaderProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: '#2C3E50', py: 3, px: 2, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TextField
        placeholder="Buscar por título, autor ou categoria"
        variant="outlined"
        sx={{ width: '100%', bgcolor: '#fff', borderRadius: 2 }}
        value={value}
        onChange={handleChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default AcervoHeader;