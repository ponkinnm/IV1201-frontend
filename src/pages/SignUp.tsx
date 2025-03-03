import { Box} from '@mui/material';
import SignUpForm from '../components/SignUpForm.tsx';

function SignUpPage() {
  return (
    
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "100vw", marginTop: 4, overflowY: "hidden" }}>
       <SignUpForm/>
      </Box>
  );
}

export default SignUpPage;
