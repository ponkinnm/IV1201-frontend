import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation("NotFound");

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
      <Typography variant="h4">{t("404_msg")}</Typography>
      <Link to="/">
        <Button variant="outlined">{t("button")}</Button>
      </Link>
    </Container>
  );
}

export default NotFound;
