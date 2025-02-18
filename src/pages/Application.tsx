/**
 * Page where users of role applicant can fill out an application and submit it.
 * The user 
 */
import '../container.css';
import ApplicationForm from '../components/ApplicationForm.tsx';
import { Typography, Button } from '@mui/material';
import { useState } from 'react';

function Application(){
    const [submitted, setSubmitted] = useState(false);
    
    return(
        <div className='outer-container'>
            <div className='inner-container'>
                {
                    submitted ? <Typography sx={{m: 2}}>Application submitted!</Typography> : <ApplicationForm/>
                }
                <Button onClick={() => setSubmitted(!submitted)} sx={{backgroundColor: "#1976d2", color: "white"}}>Preview and submit</Button>
            </div>
        </div>
    );
}

export default Application;