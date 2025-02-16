/**
 * Sign in form component. 
 * 
 * The sign in form has the following features:
 * - Sign in: Sends the entered username and password to authentication server. If credentials are valid a jwt token is returned and the user is logged in.
 * - Forgot password: NOT YET IMPLEMENTED
 * - Sign up: NOT YET IMPLEMENTED
 **/
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../components/ForgotPassword';
import { useNavigate } from 'react-router-dom';
import { login} from '../utils/auth';

interface AuthResponse {
  token: string;
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '450px',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: '25%',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [open, setOpen] = React.useState(false);

  //Open forgot password window.
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Close forgot password window.
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {

    const credentials = {
      username: username,
      password: password,
    }

    try {
      // Send credentials to the authentication server.
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
      });

      if(!response.ok){
        //Server will return an error message if the user couldn't be authenticated.
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      } else{
        //Recieves the jwt token.
        const token: AuthResponse= await response.json() as AuthResponse;
        //Store the token in session storage.
        login(token);
        //Notify listeners that a token have been added to session storage.
        window.dispatchEvent(new Event('storage'));
        //Redirect user to their user page.
        void navigate("/user");
      }
    } catch (error: unknown){
      setError(true);
      if(error instanceof Error){
        setErrorText(error.message);
      } else{
        setErrorText("Sign in failed, please try again");
      }
    }

      /*TODO: Test token, delete before final release!!! CODE BELOW IS ONLY USED FOR TESTING PURPOSES ----------\/
      const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJpYXQiOjE3MDAyMzg4MDAsImV4cCI6MjIwNTM5MjQwMH0.TLmX2NmILKaAh8au9L9sP0e2l6ZdRxM9OPM8XGcOvJg";
      const authResponse: AuthResponse = { token: token };
      login(authResponse);
      window.dispatchEvent(new Event('storage'));
      void navigate("/user");
      CODE ABOBE IS ONLY USED FOR TESTING PURPOSES -------------------------------------------------------------/\ */
  };

  return (
    <div>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit();
            }}            
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Email or username</FormLabel>
              <TextField
                error={error}
                helperText={errorText}
                id="username"
                type="text"
                name="username"
                placeholder="your@email.com"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errorText ? 'error' : 'primary'}
                onChange={(e)=> setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={error}
                helperText={errorText}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errorText ? 'error' : 'primary'}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </FormControl>
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign in
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </div>
  );
}