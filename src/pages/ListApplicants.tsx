/**
 * ListApplicants displays a table to users with the role "recruiter". The table lists each application submitted by users with the role "applicant". 
 * More info on the table can be found in the documentation for the component ApplicantTable.
 **/
import '../container.css';
import ApplicantTable from '../components/ApplicantTable.tsx';
import { Typography } from '@mui/material';

/**
 * Create a view with a table.
 * 
 * @returns {React.ReactElement} ListApplicants
 */
function ListApplicants() {
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

export default ListApplicants;
