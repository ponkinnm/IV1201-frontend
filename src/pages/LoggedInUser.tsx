import { Typography } from '@mui/material';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import '../container.css';

//TODO: Replace static data with fetched user data from db.

function LoggedInUser() {
  const navigate = useNavigate();

  if(isAuthenticated()){
    return (
      <div className="outer-container">
        <div className="inner-container">
          <Typography>Successful log in!</Typography>
          <Button onClick={() => { void navigate("/applicants") }}>Go to applicants</Button>
        </div>
      </div>
    );
  }
}

export default LoggedInUser;