import '../container.css';
import ApplicationDetails from '../components/ApplicationDetails.tsx';
import { Typography } from '@mui/material';

function ViewApplicant() {
  return (
    <div className="outer-container">
      <Typography variant="h4" component="h1" sx={{ margin: 2 }}>
        Applicant Details
      </Typography>
      <div className="inner-container">
        <ApplicationDetails />
      </div>
    </div>
  );
}

export default ViewApplicant;