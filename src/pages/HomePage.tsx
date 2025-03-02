import { Typography, Box } from '@mui/material';
import SignInForm from '../components/SignInForm.tsx';
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation("HomePage");
  
  return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "100vw", marginTop: 4, overflowY: "hidden" }}>
        <Typography variant="h4" component="h1">
        {t("headline")}
        </Typography>
        <Box sx={{width: 100, padding: 2}}></Box>
        <Typography variant="body1" component="p">
          {t("welcome_msg")}
        </Typography>
        <Typography variant="body1" component="p">
        {t("action_msg")}
        </Typography>
        <SignInForm />
      </Box>
  );
}

export default HomePage;