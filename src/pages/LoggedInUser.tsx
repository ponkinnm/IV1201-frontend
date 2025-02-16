/**
 * Landing page for users after logging in.
 * This page can be used to present data from the database that needs authentication and/or authorization to view.
 */
import { Typography } from '@mui/material';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import '../container.css';

/**
 * Create a view for logged in users.
 * 
 * @returns {React.ReactElement} LoggedInUser
 */
function LoggedInUser() {
  const navigate = useNavigate();
  //TODO: Replace static data with fetched user data from db.
  return (
    <div className="outer-container">
      <div className="inner-container">
        <Typography>Successful log in!</Typography>
        <Button onClick={() => { void navigate("/applicants") }}>Go to applicants</Button>
      </div>
    </div>
  );
}

export default LoggedInUser;