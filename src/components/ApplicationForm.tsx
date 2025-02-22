import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function ApplicationForm({ submitData: submitData}:{submitData: (data: string) => void}){
    const [id, setId] = useState(3); //Unique id for each input row
    const [competence, setCompetence] = useState<{ id: number, type: "competence"}[]>([{ id: 1, type: "competence"}]); //List all rendered CompetencyRow components
    const [availability, setAvailability] = useState<{ id: number, from: Date | null, to: Date | null, type: "date"}[]>([{ id: 2, from: null, to: null, type: "date" }]); //List all rendered DateRow components

   const [competenceProfileID, setCompetenceProfileID] = useState<{id: number; type: string; value: string}[]>([]);
   const [yearsOfExperience, setYearsOfExperience] = useState<{id: number; type: string; value: string}[]>([]);
   const [dateData, setDateData] = useState<string[]>([]);

    const addData = (id: number, target: any) => {
        if(target.name === "competence_profile_id"){
            if( !competenceProfileID.some( item =>  item.value === target.value )){ setCompetenceProfileID(prev => [...prev, target]); }
        } else if(target.name === "years_of_experience"){
            if( !yearsOfExperience.some( item => item.id === id && item.value === target.value )){ setYearsOfExperience(prev => [...prev, target]);}
            console.log(target.id);
        } else if(target.name === "date"){
            console.log(target.name);
        }
        //setTestCom(prev => [...prev, value]);
        console.log("-----\/");
        console.log(competenceProfileID);
        console.log(yearsOfExperience);
    };

    const removeData = (id: number, target: any) => {
        if(target.name === "competence_profile_id"){
            setCompetenceProfileID(prev => {
                return [...prev.filter(item => item.id !== id)];
            });
        } else if(target.name === "years_of_experience"){
            
        } else if(target.name === "date"){

        }
    };

    const submit = () => {
        console.log(yearsOfExperience);
        submitData("data submitted");
    };


    //Add up to three rows with input for competence or unlimited rows with input for date.
    const addRow = (type: "competence" | "date") => {
        setId(prevId => {
            const newId = prevId + 1;
            if (type === "competence") {
                if (competence.length < 3) {
                    setCompetence(prev => [...prev, { id: newId, type: "competence" }]);
                }
            } else if (type === "date") {
                setAvailability(prev => [...prev, { id: newId, from: null, to: null, type: "date" }]);
            }
            return newId;
        });
    };
    

    const removeRow = (id: number, type: "competence" | "date") => {
        console.log("REMPVED: " + id);
        if (type === "competence") {
            if (competence.length > 1) {
                setCompetence(prev => prev.filter(a => a.id !== id));
            }
            setYearsOfExperience(prev => {
                return [...prev.filter(item => item.id !== id)];
            });
        } else if (type === "date") {
            if (availability.length > 1) {
                setAvailability(prev => prev.filter(a => a.id !== id));
            }
        }
    };

    return(
        <Box sx={{ minHeight: "100vh", marginTop: 4}}>
            <Box>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "start"}}>
                    <Typography variant="h4">Application</Typography>
                </Box>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column"}}>
            <Box sx={{height: 50, width: "100%" }}></Box>
            <Typography sx={{marginLeft: 1}}>Select up to three competencies and provide your years of experience.</Typography>
            <Typography sx={{marginLeft: 1, marginBottom: 2}}>Click add to add the competence to your application.</Typography>
                {competence.map((a)=>(
                    <DynamicInput key={a.id} id={a.id} addRow={() => addRow("competence")} removeRow={() => removeRow(a.id, "competence")} addData={addData} component={(enableInput: boolean) => <CompetenceRow id={a.id} enableInput={enableInput} addData={addData}/>}/>
                ))}
                <Box sx={{height: 50, width: "100%" }}></Box>
                <Typography sx={{marginLeft: 1}}>Please provide the dates for the periods you are available to work.</Typography>
                <Typography sx={{marginLeft: 1, marginBottom: 2}}>Click add to add the date to your application.</Typography>
                {availability.map((a)=>( 
                    <DynamicInput key={a.id} id={a.id} addRow={() => addRow("date")} removeRow={() => removeRow(a.id, "date")} addData={addData} component={(enableInput: boolean) => <DateRow id = {a.id} enableInput={enableInput} addData={addData}/>}/>
                ))} 
            </Box>               
            <Box sx={{height: 50, width: "100%" }}></Box>
            <Button onClick={submit}>test</Button>
        </Box>
    );
}

/**
 * Component used to create and remove a row of input fields.
 * Next to empty input fields an add button is displayed to let the user save the input value to the application.
 * When an add button have been clicked it is replaced by a remove button to let the user remove the input value from the application.
 * 
 * @param {number} id A unique id 
 * @param {function} addRow Function that adds a row to the list of inputs
 * @param {function} removeRow Function that removes a row from the list of inputs
 * @param {function} renderComponent Function that returns the component to be rendered
 * @returns {JSX.Element} DynamicInput
 */
function DynamicInput({ id, addRow: addRow, removeRow: removeRow, addData: addData, component: component }: { id: number, addRow: () => void, removeRow: (id: number) => void, addData: (id: number, value: any) => void, component: (enableInput: boolean, addData: any) => JSX.Element }){
    const [buttonControl, setButtonControl] = useState(false); //Render an add or remove button
    const [enableInput, setEnableInput] = useState(false); //Enable or disable input boxes

    return(
        <Box sx={{ marginBottom: 1, minWidth: "750px", display: "flex", flexDirection: "row", gap: 1}}>
            {component(enableInput, addData)}
            {
                buttonControl ? <Button onClick={() => {setButtonControl(false); setEnableInput(false); removeRow(id); }} sx={{backgroundColor: "#white", color: "#1976d2", minWidth: 90}}>Remove</Button> 
                              : <Button onClick={() => {setButtonControl(true); setEnableInput(true); addRow(); }} sx={{backgroundColor: "#white", color: "#1976d2", minWidth: 90}}>Add</Button>
            }   
        </Box>
    );
}

/**
 * A component that displays one drop-down selector and a numerical input box.
 * The drop down alternatives are 1-ticket sales 2-lotteries 3-roller coaster operation.
 * 
 * @returns {JSX.Element} CompetenceRow
 */
function CompetenceRow({ id, enableInput, addData: addData}: { id: number, enableInput: boolean, addData: (id: number, value: any) => void; }){
    const [competenceProfile, setCompetenceProfile] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");

    return(
        <Box sx={{ minWidth: 750, display: "flex", alignItems: "center", gap: 1 }}>
            <FormControl fullWidth>
                <InputLabel>Competence</InputLabel>
                <Select
                    name={"competence_profile_id"}
                    value={competenceProfile}
                    id={`${id}`}
                    disabled={enableInput}
                    onChange={(event) => {
                        setCompetenceProfile(event.target.value);
                        addData(id, event.target);
                    }}
                >
                    <MenuItem value={1}>Ticket sales</MenuItem>
                    <MenuItem value={2}>Lotteries</MenuItem>
                    <MenuItem value={3}>Roller coaster operation</MenuItem>
                </Select>
            </FormControl>
            <TextField 
                id={`${id}`}
                label={"Years of experience"}
                value={yearsOfExperience}
                type={"number"} 
                variant={"outlined"}
                name={"years_of_experience"}
                disabled={enableInput}
                onChange={(event) => {
                    setYearsOfExperience(event.target.value);
                    addData(id, event.target);
                }}
                sx={{ minWidth: 200, color:"#1976d2" }} inputProps={{ min: 0, max: 100 }}
            />
        </Box>
    );
}

/**
 * A component that displays a row with two date input boxes.
 * 
 * @returns {JSX.Element} DateRow
 */
function DateRow({ id, enableInput, addData: addData}: { id: number, enableInput: boolean, addData: (id: number, value: any) => void }){
    const a = enableInput; //TODO: Implement same behaviour as CompetenceRow
    const b = addData;
    return(
        <Box sx={{ minWidth: "750px", display: "flex", flexDirection: "row", gap: 1}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{marginBottom: 1, minWidth: "750px", display: "flex", flexDirection: "row", gap: 1}}>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>From: </Typography>
                    <DatePicker sx={{ width: 330 }} />   
                    <Typography sx={{ display: "flex", alignItems: "center" }}>To: </Typography>
                    <DatePicker sx={{ width: 330}} />
                </Box>
            </LocalizationProvider>
        </Box>
    );
}