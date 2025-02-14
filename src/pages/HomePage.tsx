import { Typography } from '@mui/material';
import SignInForm from '../components/SignInForm.tsx';

function HomePage() {
  return (
    <div className="outer-container">
      <Typography variant="h4" component="h1" sx={{margin:2}}>
        Home
      </Typography>
      <Typography variant="body1" component="p">
        Welcome to Theme park careers!
      </Typography>
      <Typography variant="body1" component="p" sx={{marginBottom:2}}>
        Sign in or create a new account
      </Typography>
      <div className="inner-container">
        <SignInForm />
      </div>
    </div>
  );
}

export default HomePage;