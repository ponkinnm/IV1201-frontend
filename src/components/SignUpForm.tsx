import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from "react-i18next";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignUp() {
    const { t } = useTranslation("SignUpForm");
    const navigate = useNavigate();

    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] =useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [surnameError, setSurnameError] = useState(false);
    const [surnameErrorMessage, setSurnameErrorMessage] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [pnrError, setPnrError] = useState(false);
    const [pnrErrorMessage, setPnrErrorMessage] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pnr, setPnr] = useState('');



    const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;
    const surname = document.getElementById('surname') as HTMLInputElement;
    const pnr = document.getElementById('pnr') as HTMLInputElement;
    const username = document.getElementById('username') as HTMLInputElement;   
        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        setEmailError(true);
        setEmailErrorMessage(t("email_error_msg"));
        isValid = false;
        } else {
        setEmailError(false);
        setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
        setPasswordError(true);
        setPasswordErrorMessage(t("password_error_msg"));
        isValid = false;
        } else {
        setPasswordError(false);
        setPasswordErrorMessage('');
        }

        if (!name.value || name.value.length < 3) {
        setNameError(true);
        setNameErrorMessage(t("name_error_msg"));
        isValid = false;
        } else {
        setNameError(false);
        setNameErrorMessage('');
        }

        if (!surname.value || surname.value.length < 3) {
        setSurnameError(true);
        setSurnameErrorMessage(t("surname_error_msg"));
        isValid = false;
        } else {
        setSurnameError(false);
        setSurnameErrorMessage('');
        }

        if (!username.value || username.value.length < 4) {
        setUsernameError(true);
        setUsernameErrorMessage(t("username_error_msg"));
        isValid = false;
        } else {
        setUsernameError(false);
        setUsernameErrorMessage('');
        }

        if (!pnr.value || pnr.value.length < 8) {
        setPnrError(true);
        setPnrErrorMessage(t("pnr_error_msg"));
        isValid = false;
        } else {
        setPnrError(false);
        setPnrErrorMessage('');
        }

        return isValid;
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();


  if (!validateInputs()) {  
    return;
  }

  const role_id = 2;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, surname, pnr, email, username, password, role_id }),
    });

    if (response.ok) {
      void navigate('/user');
    } else {
      console.error('Signup failed');
    }
  } catch (error) {
    console.error('Signup request failed:', error);
  }
};


  return (
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            {t("sign_up")}
          </Typography>
          <Box
            component="form"
            onSubmit={(event) => {
              void handleSubmit(event);
            }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          > 
            <Box
              component="form" 
              onSubmit={(event) => {
                void handleSubmit(event);
              }}
              sx={{ display: 'flex', flexDirection: 'raw', gap: 5 }}
            >
            <FormControl>
              <FormLabel htmlFor="name">{t("name")}</FormLabel>
              <TextField
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                name="name"
                required
                fullWidth
                id="name"
                placeholder={t("name_placeholder")}
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="surname">{t("surname")}</FormLabel>
              <TextField
                autoComplete="surname"
                name="surname"
                onChange={(e) => setSurname(e.target.value)}
                required
                fullWidth
                id="surname"
                placeholder={t("surname_placeholder")}
                error={surnameError}
                helperText={surnameErrorMessage}
                color={surnameError ? 'error' : 'primary'}
              />
            </FormControl>
              </Box>
            <Box
              component="form"
              onSubmit={(event) => {
                void handleSubmit(event);
              }}
              sx={{ display: 'flex', flexDirection: 'raw', gap: 5 }}
            >
            <FormControl>
              <FormLabel htmlFor="pnr">{t("pnr")}</FormLabel>
              <TextField
                autoComplete="pnr"
                onChange={(e) => setPnr(e.target.value)}
                name="pnr"
                required
                fullWidth
                id="pnr"
                placeholder={t("pnr_placeholder")}
                  error={pnrError}
                helperText={pnrErrorMessage}
                color={pnrError ? 'error' : 'primary'}
              />
            </FormControl>
              <FormControl>
                <FormLabel htmlFor="username">{t("username")}</FormLabel>
                <TextField
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  required
                  fullWidth
                  id="username"
                  placeholder={t("username_placeholder")}
                  error={usernameError}
                  helperText={usernameErrorMessage}
                  color={usernameError ? 'error' : 'primary'}
                />
              </FormControl>
            </Box>
            <FormControl>
              <FormLabel htmlFor="email">{t("email")}</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("email_placeholder")}
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">{t("password")}</FormLabel>
              <TextField
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                placeholder={t("password_placeholder")}
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              color="secondary"
            >
              {t("sign_up")}
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>{t("or")}</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              {t("have_account")}{' '}
              <Link
                component="button"
                type="button"
                onClick={() => { void navigate("/") }}
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                {t("sign_in")}
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
  );
}
