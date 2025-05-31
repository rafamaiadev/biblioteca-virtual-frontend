import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext'

const UserProfile: React.FC = () => {
  const { username, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
      }}
    >
      <IconButton onClick={handleOpen} color="inherit">
        <AccountCircle fontSize="large" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box px={2} py={1}>
          <Typography variant="subtitle1">
            {username || 'Usuário'}
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfile;
