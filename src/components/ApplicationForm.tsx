import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';

export default function ApplicationForm(){

    const addCompetence = (index: number) => {
        console.log("numbers: " + index);
        if(index < 2){
            setId(id + 1);
            setCompetence(c => [...c, <CompetenceInput key={competence.length} addCompetenceInput={addCompetence} removeCompetence={removeCompetence} id={id}/>]);
        }
    };

    const removeCompetence = (id: number) => {
        setCompetence(c => c.filter((_, i) => i !== id));
    };

    const [competence, setCompetence] = useState<JSX.Element[]>([<CompetenceInput key={0} addCompetenceInput={addCompetence} removeCompetence={removeCompetence} id={0}/>]);
    const [id, setId] = useState(0);

    return(
        <div>
            <Typography sx={{marginLeft: 1}}>Choose up to 3 competencies and enter years of experience</Typography>
            <Typography sx={{marginLeft: 1, marginBottom: 2}}>Click add to add the competency to the application</Typography>
            {competence}
        </div>
    );
}

function CompetenceInput({ addCompetenceInput, removeCompetence, id}: { addCompetenceInput: (id: number) => void, removeCompetence: (id: number) => void, id: number}){
    const [entered, setEntered] = useState(false);
    return(
        <Box sx={{ marginBottom: 1, minWidth: "750px", display: "flex", flexDirection: "row", gap: 1}}>
            <FormControl fullWidth>
                <InputLabel id="competence-label">Competence</InputLabel>
                <Select
                    id="competence"
                    //value={age}
                    label="Competence"
                    //onChange={handleChange}
                >
                    <MenuItem value={1}>Ticket sales</MenuItem>
                    <MenuItem value={2}>Lotteries</MenuItem>
                    <MenuItem value={3}>Roller coaster operation</MenuItem>
                </Select>
            </FormControl>
            <TextField id="years-of-experience" label="Years of experience" variant="outlined" />
            {
                entered == false && id < 2 ? <Button onClick={() => {setEntered(true), addCompetenceInput(id)}} sx={{backgroundColor: "#white", color: "#1976d2", minWidth: 90}}>Add</Button> : <></>
            }
            {
                entered == true ? <Button onClick={() => {setEntered(false), removeCompetence(id)}} sx={{backgroundColor: "#white", color: "#1976d2", minWidth: 90}}>Remove</Button> : <></>
            }
            
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