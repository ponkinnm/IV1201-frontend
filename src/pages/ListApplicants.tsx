import '../container.css';
import ApplicantTable from '../components/ApplicantTable.tsx';
import { isAuthenticated } from '../utils/auth';
import { Typography } from '@mui/material';

//A page displaying a table containing applicant users data.
function ListApplicants() {
  if(isAuthenticated()){
    return (
      <div className="outer-container">
        <Typography variant="h4" component="h1" sx={{margin:2}}>
          Applicants
        </Typography>
        <div className="inner-container">
          <ApplicantTable />
        </div>
      </div>
    );
  }
}

export default ListApplicants;
