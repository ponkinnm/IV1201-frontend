import { Typography, Button, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function LoggedInUser() {
  const navigate = useNavigate();
    const { t } = useTranslation("LoggedInUser");

  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: 4}}>
      <Typography>{t("logged_in_msg")}</Typography>
      <Button onClick={() => { void navigate("/applicants") }}>{t("button_1")}</Button>
      <Button onClick={() => { void navigate("/apply") }}>{t("button_2")}</Button>
    </Box>
  );
}

export default LoggedInUser;
