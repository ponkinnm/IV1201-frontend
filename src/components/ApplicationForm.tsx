import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function ApplicationForm(){
    const [competence, setCompetence] = useState<{ id: number, type: "competence"}[]>([{ id: 1, type: "competence"}]);
    const [availability, setAvailability] = useState<{ id: number, from: Date | null, to: Date | null, type: "date"}[]>([{ id: 1, from: null, to: null, type: "date" }]);

    const addRow = (type: "competence" | "date") => {
        if (type === "competence") {
            if(competence.length < 3){
                setCompetence(array => {
                    const id = Math.max(...array.map(a => a.id), 0) + 1;
                    return [...array, { id: id, type: "competence" }];
                });
            } 
        } else if (type === "date") {
            setAvailability(array => {
                const id = Math.max(...array.map(a => a.id), 0) + 1;
                return [...array, { id: id, from: null, to: null, type: "date" }];
            });
        }
    };

    const removeRow = (id: number, type: "competence" | "date") => {
        if (type === "competence") {
            if (competence.length > 1) {
                console.log(competence); // Log the current state before update
                if (competence.length > 1) {
                    setCompetence(array => array.filter(a => a.id !== id));
                }
            }
        } else if (type === "date") {
            if (availability.length > 1) {
                setAvailability(array => array.filter(a => a.id !== id));
            }
        }
    };

    return(
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Box minHeight={50}></Box>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="h4">Application</Typography>
            </Box>
            <Box sx={{height: 50, width: "100%" }}></Box>
            <Typography sx={{marginLeft: 1}}>Choose up to 3 competencies and enter years of experience.</Typography>
            <Typography sx={{marginLeft: 1, marginBottom: 2}}>Click add to add the competency to the application.</Typography>
            {competence.map((a)=>(
                <DynamicInput key={a.id} id={a.id} addRow={() => addRow("competence")} removeRow={() => removeRow(a.id, "competence")} renderComponent={() => CompetenceRow()}/>
            ))}
            <Box sx={{height: 50, width: "100%" }}></Box>
            <Typography sx={{marginLeft: 1, marginBottom: 2}}>Enter the date periods you are availiable to work.</Typography>
            {availability.map((a)=>(
                <DynamicInput key={a.id} id={a.id} addRow={() => addRow("date")} removeRow={() => removeRow(a.id, "date")} renderComponent={() => DateRow()}/>
            ))}                
            <Box sx={{height: 50, width: "100%" }}></Box>
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
function DynamicInput({ id, addRow: addRow, removeRow: removeRow, renderComponent: renderComponent}: { id: number, addRow: () => void, removeRow: (id: number) => void, renderComponent: () => JSX.Element }){
    const [entered, setEntered] = useState(false);
    return(
        <Box sx={{ marginBottom: 1, minWidth: "750px", display: "flex", flexDirection: "row", gap: 1}}>
            {renderComponent()}
            {
                entered == true ? <Button onClick={() => {setEntered(false), removeRow(id)}} sx={{backgroundColor: "#white", color: "#1976d2", minWidth: 90}}>Remove</Button> 
                                : <Button onClick={() => {setEntered(true), addRow()}} sx={{backgroundColor: "#white", color: "#1976d2", minWidth: 90}}>Add</Button>
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
function CompetenceRow(){
    var competenceValue; //Value representing a competency: 1-ticket sales 2-lotteries 3-roller coaster operation replace with hooks
    return(
        <Box sx={{ minWidth: 750, display: "flex", alignItems: "center", gap: 1 }}>
            <FormControl fullWidth>
                <InputLabel id="${id}">Competence</InputLabel>
                <Select
                    id="competence-${id}"
                    value={competenceValue}
                    label="Competence"
                    //onChange={handleChange}
                >
                    <MenuItem value={1}>Ticket sales</MenuItem>
                    <MenuItem value={2}>Lotteries</MenuItem>
                    <MenuItem value={3}>Roller coaster operation</MenuItem>
                </Select>
            </FormControl>
            <TextField id="experience-${id}" label="Years of experience" type={"number"} variant="outlined" sx={{ minWidth: 200, color:"#1976d2" }} inputProps={{ min: 0, max: 100 }}/>
        </Box>
    );
}

/**
 * A component that displays a row with two date input boxes.
 * 
 * @returns {JSX.Element} DateRow
 */
function DateRow(){
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



//#1976d2
//Competence - can be multiple in a list
//Years of expertise -box? number between 0 to 100?

//Add availability periods - calendar?
//Present chosen dates

//Preview - show name, expertise, availability e.t.c.
// Show cancel and submit

//Display confirmation message

/*COPY public.competence (competence_id, name) FROM stdin;
1	ticket sales
2	lotteries
3	roller coaster operation*/