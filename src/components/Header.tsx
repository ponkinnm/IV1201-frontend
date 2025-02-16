import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Attractions } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

function Header() {
  return (
    <AppBar position="sticky" sx={{ width: '100dvw' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link to="/">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Attractions htmlColor="white" fontSize={'large'} />
            <Typography color="white" component="div" variant="h6">
              Theme park careers
            </Typography>
            {isAuthenticated() && (
              <Button color="secondary">Hello!</Button>
            )}
          </Box>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
