import { Typography, Button, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function LoggedInUser() {
  const navigate = useNavigate();
  const { t } = useTranslation("LoggedInUser");
  const role_id = Number(localStorage.getItem("role_id"));
  

  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: 4}}>
      <Typography>{t("logged_in_msg")}</Typography>
      { role_id === 1 ? (
      <Button onClick={() => { void navigate("/applicants") }} sx={{backgroundColor: "#1976d2", color: "white", margin: 2 }}>{t("button_1")}</Button>) : (
      <Button onClick={() => { void navigate("/apply") }} sx={{backgroundColor: "#1976d2", color: "white", margin: 2 }}>{t("button_2")}</Button> 
    )}
    </Box>
  );
}

export default LoggedInUser;
