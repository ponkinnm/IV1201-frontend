import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container
      sx={{
        textAlign: 'center',
        width: '100vw',
        height: '100vh',
        padding: '5%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <Typography variant="h4">Sorry, page not found!</Typography>
      <Link to="/">
        <Button variant="outlined">Go back to home page</Button>
      </Link>
    </Container>
  );
}

export default NotFound;
