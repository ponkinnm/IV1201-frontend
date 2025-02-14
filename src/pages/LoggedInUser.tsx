import '../container.css';
import { Typography } from '@mui/material';

function LoggedInUser() {
  return (
    <div className="outer-container">
      <div className="inner-container">
        <Typography>Successful log in!</Typography>
      </div>
    </div>
  );
}

export default LoggedInUser;