import '../container.css';
import ApplicantTable from '../components/ApplicantTable.tsx';
import { Typography, Box } from '@mui/material';

//A page displaying a table containing applicant users data.
function ListApplicants() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "100vw", margin: 4, overflowY: "hidden" }}>
      <Typography variant="h4" component="h1">
        Applicants
      </Typography>
      <ApplicantTable />
    </Box>
  );
}

export default ListApplicants;
