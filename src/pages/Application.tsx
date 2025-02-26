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

interface Competence {
    id: number;
    name: string;
    value: number;
}

//Date has either from or to fields but not both at the same time.
interface Date {
    id: number;
    from?: string;
    to?: string;
}

export default function Application(){
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false); //Decide which view to render

    //Data from competence rows
    const [competenceProfileID, setCompetenceProfileID] = useState<Competence[]>([]);
    const [yearsOfExperience, setYearsOfExperience] = useState<Competence[]>([]);
    //Data from date rows
    const [availabilityFrom, setAvailabilityFrom] = useState<Date[]>([]);
    const [availabilityTo, setAvailabilityTo] = useState<Date[]>([]);

    const getData = (currentCompetenceProfileID: Competence[], currentYearsOfExperience: Competence[], currentAvailabilityFrom: Date[], currentAvailabilityTo: Date[]) => {
        setCompetenceProfileID(currentCompetenceProfileID);
        setYearsOfExperience(currentYearsOfExperience);
        setAvailabilityFrom(currentAvailabilityFrom);
        setAvailabilityTo(currentAvailabilityTo);
    };

    /* eslint-disable */
    const previewData = () => {
        //TODO: Implement a preview page that list all input
        submitData();
        //Filter out competences that doesn't have a matching years of experience entered. Based on matching ids. 
        const commonCompExp = competenceProfileID.filter(comp => yearsOfExperience.some(exp => exp.id === comp.id));
        setCompetenceProfileID(comp => comp.filter(value => commonCompExp.includes(value)));
        setYearsOfExperience(exp => exp.filter(value => commonCompExp.includes(value)));

        //Filter out from dates that doesn't have a matching to dates. Based on matching ids. 
        const commondates = availabilityFrom.filter(from => availabilityTo.some(to => to.id === from.id));
        setAvailabilityFrom(from => from.filter(value => commondates.includes(value)));
        setAvailabilityTo(to => to.filter(value => commondates.includes(value)));
        submitData();
    }
    /* eslint-enable */

    const submitData = () => {
        try{
            //TODO: Data should be sent to database here!
            console.log("SUBMITTED DATA:");
            console.log(competenceProfileID);
            console.log(yearsOfExperience);
            console.log(availabilityFrom);
            console.log(availabilityTo);
        } catch{
            throw new Error("Not Implemented");
        }
    };
    
    return(
        <Box sx={{display: "flex", flexDirection: "column", justifyItems: "center", alignContent:"center", minWidth: "100vw", minHeight: "100vh"}}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "100px", overflowY: "auto", maxHeight: "80vh"}}>
                { submitted ? <Box><Typography sx={{display: "flex", justifyContent: "center", alignItems: "center", margin: 4}}>Preview application</Typography><Preview competenceProfileID={competenceProfileID} yearsOfExperience={yearsOfExperience} availabilityFrom={availabilityFrom} availabilityTo={availabilityTo}/></Box> : <ApplicationForm getData={getData}/>}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", left: "50%", bottom: "30px", transform: "translateX(-50%)", zIndex: 1000, paddingTop: "20px", paddingBottom: "20px", maxHeight: "90px"}}>
                <Button  onClick={() => { void navigate("/user") }} sx={{ backgroundColor: "#1976d2", color: "white", marginRight: 1}}>Cancel</Button>
                { !submitted ? <Button onClick={() => {setSubmitted(!submitted)}} sx={{ backgroundColor: "#1976d2", color: "white", marginLeft: 1}}>Preview & Submit</Button> : <Button onClick={()=>{submitData()}} sx={{ backgroundColor: "#1976d2", color: "white", marginLeft: 1}}>Submit</Button>}
            </Box>
        </Box>
    );
}

function Preview({ competenceProfileID, yearsOfExperience, availabilityFrom, availabilityTo }: { competenceProfileID: Competence[]; yearsOfExperience: Competence[]; availabilityFrom: Date[]; availabilityTo: Date[]; }) {
    const names: Record<string, string> = {
        "1": "Ticket sales",
        "2": "Lotteries",
        "3": "Roller coaster operation"
    }
    return(
        <Box>
            {competenceProfileID.map(item => (
                <Typography key={item.id}>{`competenceID: ${item.id}, value: ${names[item.value]}`}</Typography>
            ))}
            {yearsOfExperience.map(item => (
                <Typography key={item.id}>{`yearsOfExperienceID: ${item.id}, value: ${item.value}`}</Typography>
            ))}
            {availabilityFrom.map(item => (
                <Typography key={item.id}>{`dateFromID: ${item.id}, From: ${item.from}`}</Typography>
            ))}
            {availabilityTo.map(item => (
                <Typography key={item.id}>{`DateToID: ${item.id}, To: ${item.to}`}</Typography>
            ))}
        </Box>
    );

}