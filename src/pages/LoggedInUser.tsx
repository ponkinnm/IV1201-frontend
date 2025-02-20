import { Typography, Button, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoggedInUser() {
  const navigate = useNavigate(); //TODO: Used temporary for testing purposes, remove later!

  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Typography>Successful log in!</Typography>
      <Button onClick={() => { void navigate("/applicants") }}>Application list</Button>
      <Button onClick={() => { void navigate("/apply") }}>Create application</Button>
    </Box>
  );
}

export default LoggedInUser;