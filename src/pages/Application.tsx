/**
 * Page where users of role applicant can fill out an application and submit it.
 * The user 
 */
import '../container.css';
import ApplicationForm from '../components/ApplicationForm.tsx';
import { Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

function Application(){
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const submitData = (data: string) => {
        console.log("TEST IN Application.tsx: " + data);
    };
    
    return(
        <Box sx={{display: "flex", flexDirection: "column", justifyItems: "center", minWidth: "750px", minHeight: "100vh"}}>
            <Box sx={{ flex: 1, paddingBottom: "100px", overflowY: "auto", maxHeight: "80vh", paddingRight: "12px"}}>
            {
                submitted ? <Typography sx={{m: 2}}>Application submitted!</Typography> : <ApplicationForm submitData={submitData}/>
            }
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", left: "50%", bottom: "30px", transform: "translateX(-50%)", zIndex: 1000, paddingTop: "20px", paddingBottom: "20px", maxHeight: "90px"}}>
                <Button  onClick={() => { void navigate("/user") }} sx={{ backgroundColor: "#1976d2", color: "white", marginRight: 1}}>Cancel</Button>
                <Button onClick={() => {setSubmitted(!submitted)}} sx={{ backgroundColor: "#1976d2", color: "white", marginLeft: 1}}>Preview and submit</Button>
            </Box>
        </Box>
    );
}

export default Application;