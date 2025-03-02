import { Typography, Box} from '@mui/material';
import SignUpForm from '../components/SignupForm.tsx';

function HomePage() {
  return (
    
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "100vw", marginTop: 4, overflowY: "hidden" }}>
       <SignUpForm/>
      </Box>
  );
}

export default HomePage;