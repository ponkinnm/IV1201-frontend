import '../ListApplicants.css';
import ApplicantTable from '../components/ApplicantTable.tsx';
import { Typography } from '@mui/material';

//A page displaying a table containing applicant users data.
function ListApplicants() {
  return (
    <div className="outer-container">
      <Typography variant="h4" component="h1">
        <p>Applicants</p>
      </Typography>
      <div className="inner-container">
        <ApplicantTable />
      </div>
    </div>
  );
}

export default ListApplicants;
