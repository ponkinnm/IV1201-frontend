import '../container.css';
import ApplicationForm from '../components/ApplicationForm.tsx';
import { Typography } from '@mui/material';
import { useState } from 'react';

function Application(){
    const [submitted, setSubmitted] = useState(false);
    
    return(
        <div className='outer-container'>
            <div className='inner-container'>
                {
                    submitted ? <Typography sx={{m: 2}}>Application submitted!</Typography> : <ApplicationForm/>
                }
                <button onClick={() => setSubmitted(!submitted)}>Submit</button>
            </div>
        </div>
    );
}

export default Application;