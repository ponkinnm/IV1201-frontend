import '../container.css';
import ApplicationDetails from '../components/ApplicationDetails.tsx';
import { Box } from '@mui/material';

function ViewApplicant() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "100vw", margin: 4, overflowY: "hidden" }}>
      <ApplicationDetails />
    </Box>
  );
}

export default ViewApplicant;