import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Attractions } from '@mui/icons-material';
import { Link } from 'react-router-dom';

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
          </Box>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
