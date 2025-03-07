import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import { type FormEvent, useState } from 'react';
import { useTranslation } from "react-i18next";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '450px',
  maxWidth: 'min(450px, 90dvw)',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
marginTop: '25%',
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100vh',
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
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>('');
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);

  const { t } = useTranslation("SignInForm");

  const toggleForgotPasswordDialog = () => {
    setShowForgotPasswordDialog(!showForgotPasswordDialog);
  };

  interface AuthResponse {
    username: string;
    name: string;
    id: number;  
    role_id: number; 
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate inputs before proceeding
    if (!validateInputs()) {
      return;
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data : AuthResponse = await response.json();
        const {role_id} = data; 
        localStorage.setItem("role_id", role_id.toString());
        localStorage.setItem("isLoggedIn", "true");
        void navigate('/user');
      } else {
        setLoginErrorMessage(t("login_failed_error"));
      }
    } catch (error) {
      console.error(t("log_failed_login"), error);
    }
  };

  const validateInputs = () => {
    let isValid = true;
    if (!username) {
      setUsernameError(true);
      setUsernameErrorMessage(t("validate_error_1"));
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }
    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(t("validate_error_2"));
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    return isValid;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 2 }}>
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            {t("sign_in")}
          </Typography>
          <Box
            component="form"
            onSubmit={(event) => {
              void handleSubmit(event);
            }}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="username">{t("label_1")}</FormLabel>
              <TextField
                error={usernameError}
                helperText={usernameErrorMessage}
                id="username"
                type="text"
                name="username"
                placeholder={t("placeholder_1")}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={usernameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">{t("label_2")}</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage || loginErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <ForgotPassword open={showForgotPasswordDialog} handleClose={toggleForgotPasswordDialog} />
            <Button type="submit" fullWidth variant="contained">
            {t("button")}
            </Button>
            <Link
              component="button"
              type="button"
              onClick={toggleForgotPasswordDialog}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              {t("reset_pass_msg")}
            </Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              {t("sign_up_msg")}{' '}
              <Link component="button" type="button" onClick={ ()=>{ void navigate('/signup')}} sx={{ alignSelf: 'center' }}>
                {t("sign_up_link")}
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </Box>
  );
}
