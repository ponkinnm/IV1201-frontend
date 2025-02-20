/**
 * Page where users of role applicant can fill out an application and submit it.
 * The user 
 */
import '../container.css';
import ApplicationForm from '../components/ApplicationForm.tsx';
import { Typography, Button } from '@mui/material';
import { useState } from 'react';
import Box from '@mui/material/Box';

function Application(){
    const [submitted, setSubmitted] = useState(false);
    
    return(
        <Box sx={{display: "flex", flexDirection: "column", justifyItems: "center", minWidth: "750px", minHeight: "100vh"}}>
            <Box sx={{ flex: 1, paddingBottom: "100px", overflowY: "auto", maxHeight: "80vh", paddingRight: "12px"}}>
            {
                submitted ? <Typography sx={{m: 2}}>Application submitted!</Typography> : <ApplicationForm/>
            }
            </Box>
            <Button onClick={() => setSubmitted(!submitted)} sx={{position: "fixed", left: "50%", bottom: "30px", backgroundColor: "#1976d2", color: "white", zIndex: 1000}}>Preview and submit</Button>  
        </Box>
    );
}

export default Application;