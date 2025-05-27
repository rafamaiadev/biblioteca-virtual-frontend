import React from 'react';
import {
  Typography,
  Button,
  Popper,
  Paper,
  IconButton,
  Fade,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../contexts/AuthContext';

const UserProfileMenu: React.FC = () => {
  const { username, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'user-popper' : undefined;

  return (
    <>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        color="primary"
        size="large"
        sx={{ ml: 1 }}
      >
        <AccountCircleIcon fontSize="inherit" />
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        disablePortal={false}
        modifiers={[
          {
            name: 'preventOverflow',
            options: {
              altAxis: true,
              tether: false,
              rootBoundary: 'viewport',
              padding: 8,
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                width: 250,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 3,
                bgcolor: 'background.paper',
              }}
            >
              <Typography
                variant="h6"
                color="primary"
                align="center"
                sx={{ mb: 1 }}
              >
                Minha Conta
              </Typography>
              <Typography
                variant="body1"
                fontWeight={700}
                align="center"
                sx={{ mb: 3 }}
              >
                {username || 'Usuário'}
              </Typography>
              <Button
                variant="contained"
                color="error"
                fullWidth
                startIcon={<LogoutIcon />}
                onClick={logout}
                sx={{ mt: 1, borderRadius: 2 }}
              >
                Sair
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default UserProfileMenu; 