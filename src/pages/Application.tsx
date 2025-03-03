/**
 * Page where users of role applicant can fill out an application and submit it.
 * The user is greeted by a form where they can fill out their competencies, years of experience and the dates they are availiable to work.
 * When the form is filled out it can be previewed by clicking the "Preview & Submit" button.
 * The form is then submitted by clicking the submit button on the preview page.
 */
import '../container.css';
import ApplicationForm from '../components/ApplicationForm.tsx';
import { Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";


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
    const [showPreview, setShowPreview] = useState(false); //Show preview page
    const [submit, setSubmit] = useState(false); //Show "application successfully submitted" page
   
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

    const submitData = async () => {
        //TODO Error handling and input validation
        try{
            // Format the competence data for the API
            const competenceProfile = competenceProfileID.map((comp, index) => ({
                competence_id: comp.value,
                years_of_experience: yearsOfExperience[index]?.value || 0
            }));

            // Format the availability data for the API
            const availabilities = availabilityFrom.map((fromDate) => {
                const toDate = availabilityTo.find(item => item.id === fromDate.id);
                return {
                    from_date: fromDate.from,
                    to_date: toDate?.to
                };
            });
            // Call the API to submit the application
            const response = await fetch(`${import.meta.env.VITE_API_URL}/applications/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    competenceProfile,
                    availabilities
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit application');
            }

            setSubmit(true);
        } catch (error) {
            console.error('Error submitting application:', error);
            // TODO Error handling
        }
    };
    
    return(
        <Box sx={{display: "flex", flexDirection: "column", justifyItems: "center", alignContent:"center", minWidth: "100vw" }}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "100px", overflow: "auto", maxHeight: "80vh"}}>
                { submit ? <Confirmation /> : showPreview ? <Preview competenceProfileID={competenceProfileID} yearsOfExperience={yearsOfExperience} availabilityFrom={availabilityFrom} availabilityTo={availabilityTo}/> : <ApplicationForm getData={getData}/>}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", left: "50%", bottom: "30px", transform: "translateX(-50%)", zIndex: 1000, paddingTop: "20px", paddingBottom: "20px", maxHeight: "90px"}}>
                { !submit && <Button onClick={() => { void navigate("/user") }} sx={{ backgroundColor: "#1976d2", color: "white", marginRight: 1}}>Cancel</Button>}
                { !showPreview 
                    ? <Button onClick={() => {setShowPreview(!showPreview)}} sx={{ backgroundColor: "#1976d2", color: "white", marginLeft: 1}}>Preview & Submit</Button> 
                    : !submit && 
                    <Button 
                      onClick={() => {void submitData()}} 
                      sx={{ backgroundColor: "#1976d2", color: "white", marginLeft: 1}}                  
                    >
                      Submit
                    </Button>
                }
            </Box>
        </Box>
    );
}

/**
 * Component that show a preview of all information entered by the user.
 * 
 * @returns {JSX.Element} Preview
 */
function Preview({ competenceProfileID, yearsOfExperience, availabilityFrom, availabilityTo }: { competenceProfileID: Competence[]; yearsOfExperience: Competence[]; availabilityFrom: Date[]; availabilityTo: Date[]; }) {
    const names: Record<string, string> = {
        "1": "Ticket sales",
        "2": "Lotteries",
        "3": "Roller coaster operation"
    }

    return(
        <Box>
            <Typography variant="h4" sx={{display: "flex", justifyContent: "center", alignItems: "start", marginTop: 4}}>Preview</Typography>
            <Typography variant="h5" sx={{ marginTop: 4}}>Entered competencies</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography sx={{fontWeight: "bold"}}>Competence</Typography></TableCell>
                        <TableCell><Typography sx={{fontWeight: "bold"}}>Years of experience</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {competenceProfileID.map(comp => (yearsOfExperience.map(exp => 
                        comp.id === exp.id && (
                            <TableRow key={comp.id}>
                                <TableCell>{`${names[comp.value]}`}</TableCell>
                                <TableCell>{`${exp.value} years`}</TableCell>
                            </TableRow>
                        ))))
                    }
                </TableBody>
            </Table>
            <Typography variant="h5" sx={{ marginTop: 4}}>Entered date periods</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><Typography sx={{fontWeight: "bold"}}>From</Typography></TableCell>
                        <TableCell><Typography sx={{fontWeight: "bold"}}>To</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {availabilityFrom.map(from => (availabilityTo.map(to => 
                        from.id === to.id && (
                            <TableRow key={from.id}>
                                <TableCell>{`${from.from}`}</TableCell>
                                <TableCell>{`${to.to}`}</TableCell>
                            </TableRow>
                        ))))
                    }
                </TableBody>
            </Table>
        </Box>
    );

}

/**
 * Displays a message to the user that the application have been submitted.
 * 
 * @returns {JSX.Element} Confirmation
 */
function Confirmation(){
    const navigate = useNavigate();
    return(
        <Box sx={{display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", minHeight: "100%"}}>
            <Typography variant="h4" sx={{display: "flex", justifyContent: "center", alignItems: "start", marginTop: 6}}>Thank You for Your Application!</Typography>
            <Typography sx={{marginTop: 6}}>Your application has been successfully submitted.</Typography>
            <Typography>Our team at Theme Park Careers will review your information,</Typography>
            <Typography>and if your qualifications match our openings, we will be in touch.</Typography>
            <Typography>We appreciate your interest and look forward to the possibility of working together!</Typography>
            <Button onClick={() => {void navigate("/user")}} sx={{ backgroundColor: "#1976d2", color: "white", marginTop: 6}}>Return to user page</Button>
        </Box>
    );
}