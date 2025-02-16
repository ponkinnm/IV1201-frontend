/**
 * HomePage is the component used to render the page where users can log in.
 * The page consists of a welcome message and a log in form.
 * The log in form is explained in the documentation for the component SignInForm.
 */
import { Typography } from '@mui/material';
import SignInForm from '../components/SignInForm.tsx';

/**
 * Create a view of the home page.
 * 
 * @returns {React.ReactElement} HomePage
 */
function HomePage() {
  return (
    <div className="outer-container">
      <Typography variant="h4" component="h1" sx={{margin:2}}>
        Home
      </Typography>
      <Typography variant="body1" component="p">
        Welcome to Theme park careers!
      </Typography>
      <Typography variant="body1" component="p">
        Sign in or create a new account
      </Typography>
      <div className="inner-container">
        <SignInForm />
      </div>
    </div>
  );
}

export default HomePage;