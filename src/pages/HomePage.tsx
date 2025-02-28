import { Typography, Box} from '@mui/material';
import SignInForm from '../components/SignInForm.tsx';

function HomePage() {
  return (
    
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "100vw", marginTop: 4, overflowY: "hidden" }}>
        <Typography variant="h4" component="h1">
          Home
        </Typography>
        <Box sx={{width: 100, padding: 2}}></Box>
        <Typography variant="body1" component="p">
          Welcome to Theme park careers!
        </Typography>
        <Typography variant="body1" component="p">
          Sign in or create a new account
        </Typography>
        <SignInForm />
      </Box>

  );
}

export default HomePage;