import { Typography } from '@mui/material';
import SignIn from '../components/SignInForm.tsx';

function HomePage() {
  return (
    <div className="outer-container">
      <Typography variant="h4" component="h1">
        <p>Home</p>
      </Typography>
      <div className="inner-container">
        <SignIn />
      </div>
    </div>
  );
}

export default HomePage;
