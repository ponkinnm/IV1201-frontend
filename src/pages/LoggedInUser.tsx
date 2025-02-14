import '../container.css';
import { Button, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

function LoggedInUser() {
  const navigate = useNavigate(); //TODO: Used temporary for testing purposes, remove later!

  return (
    <div className="outer-container">
      <div className="inner-container">
        <Typography>Successful log in!</Typography>
        <button onClick={() => { navigate("/applicants") }}>Go to applicants</button>
      </div>
    </div>
  );
}

export default LoggedInUser;