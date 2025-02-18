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

    const addCompetence = () => {
        if(competence.length < 3){
            setCompetence([...competence, { id: id }]);
            setId(id + 1);
        }
    };

    const removeCompetence = (id: number) => {
        setCompetence((competenceArray) => {
            if (competenceArray.length === 1) {
                return competenceArray;
            }
            return competenceArray.filter(c => c.id !== id);
        });
    };

    const [competence, setCompetence] = useState<{ id: number }[]>([{ id: 0 }]);
    const [id, setId] = useState(1);

    return(
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="h4">Application</Typography>
            </Box>
            <Box sx={{height: 50, width: "100%" }}></Box>
            <Typography sx={{marginLeft: 1}}>Choose up to 3 competencies and enter years of experience</Typography>
            <Typography sx={{marginLeft: 1, marginBottom: 2}}>Click add to add the competency to the application</Typography>
            {competence.map((c)=>(
                <CompetenceInput key={c.id} id={c.id} addCompetence={addCompetence} removeCompetence={removeCompetence}/>
            ))}
            <Box sx={{height: 50, width: "100%" }}></Box>
            <Typography sx={{marginLeft: 1, marginBottom: 2}}>Enter availability</Typography>
                {DateInput()}
            <Box sx={{height: 50, width: "100%" }}></Box>
        </Box>
    );
}

function CompetenceInput({ id, addCompetence, removeCompetence}: { id: number, addCompetence: () => void, removeCompetence: (id: number) => void }){
    const [entered, setEntered] = useState(false);
    var competenceValue;

    return(
        <Box sx={{ marginBottom: 1, minWidth: "750px", display: "flex", flexDirection: "row", gap: 1}}>
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
            <TextField id="experience-${id}" label="Years of experience" variant="outlined" sx={{ minWidth: 200, color:"#1976d2" }} inputProps={{ min: 0, max: 100, type: "number" }}/>
            {
                entered == false ? <Button onClick={() => {setEntered(true), addCompetence()}} sx={{backgroundColor: "#white", color: "#1976d2", minWidth: 90}}>Add</Button> : <></>
            }
            {
                entered == true ? <Button onClick={() => {setEntered(false), removeCompetence(id)}} sx={{backgroundColor: "#white", color: "#1976d2", minWidth: 90}}>Remove</Button> : <></>
            }
            
        </Box>
    );
}

function DateInput(){
    return(
        <Box sx={{ marginBottom: 1, minWidth: "750px", display: "flex", flexDirection: "row", gap: 1}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{marginBottom: 1, minWidth: "750px", display: "flex", flexDirection: "row", gap: 1}}>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>From: </Typography>
                    <DatePicker sx={{ width: 330 }} />   
                    <Typography sx={{ display: "flex", alignItems: "center" }}>To: </Typography>
                    <DatePicker sx={{ width: 330}} />
                    <Button sx={{backgroundColor: "#white", color: "#1976d2", minWidth: 90}}>Add</Button>
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