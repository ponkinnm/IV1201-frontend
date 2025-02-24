import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface Competence {
    id: number;
    name: string;
    value: string;
}

interface Date {
    id: number;
    from?: string;
    to?: string;
}

interface AvailableFrom {
    type: "date";
    name: "from_date";
    dateString: string;
}

interface AvailableTo {
    type: "date";
    name: "to_date";
    dateString: string;
}

export default function ApplicationForm({ getData: getData }:{ getData: (competenceProfileID: Competence[], yearsOfExperience: Competence[], availabilityFrom: Date[], availabilityTo: Date[]) => void}){
    const [id, setId] = useState(1); //Unique id for each input box
    const [competenceRow, setCompetenceRow] = useState<{ id: number, type: "competence"}[]>([{ id: id, type: "competence"}]); //List all rendered CompetencyRow components
    const [availabilityRow, setAvailabilityRow] = useState<{ id: number, type: "date"}[]>([{ id: id, type: "date" }]); //List all rendered DateRow components

    //Data from competence rows
    const [competenceProfileID, setCompetenceProfileID] = useState<Competence[]>([]);
    const [yearsOfExperience, setYearsOfExperience] = useState<Competence[]>([]);
    //Data from date rows
    const [availabilityFrom, setAvailabilityFrom] = useState<Date[]>([]);
    const [availabilityTo, setAvailabilityTo] = useState<Date[]>([]);


    //
    const addData = (id: number, target: Competence | AvailableFrom | AvailableTo ) => {
        if("value" in target){
            const newEntry = { id: id, name: target.name, value: target.value };
            if(target.name === "competence_profile_id"){
                setCompetenceProfileID(prev =>
                    prev.some(item => item.value === target.value)
                        ? prev.map(item => (Number(item.id) === id ? newEntry : item))
                        : [...prev, newEntry]
                );
            } else if(target.name === "years_of_experience"){
                setYearsOfExperience(prev =>
                    prev.some(item => Number(item.id) === id)
                        ? prev.map(item => (Number(item.id) === id ? newEntry : item))
                        : [...prev, newEntry]
                );
            }
        } else if(target.type === "date"){
            if(target.name === "from_date"){
                setAvailabilityFrom(prev =>
                    prev.some(item => item.id === id)
                        ? prev.map(item => item.id === id ? {id, from: target.dateString} : item)
                        : [...prev, {id, from: target.dateString}]
                );
            } else if(target.name === "to_date"){
                setAvailabilityTo(prev =>
                    prev.some(item => item.id === id)
                        ? prev.map(item => item.id === id ? {id, to: target.dateString} : item)
                        : [...prev, {id, to: target.dateString}]
                );
            }  
        }
        getData(competenceProfileID, yearsOfExperience, availabilityFrom, availabilityTo);
    };

    //Remove temporarily stored data
    const removeData = (id: number, type: "competence" | "date") => {
        if(type === "competence"){
            setCompetenceProfileID(prev => { return [...prev.filter(item => item.id !== id)]; });
            setYearsOfExperience(prev => { return [...prev.filter(item => item.id !== id)]; });
        } else if(type === "date"){
            setAvailabilityFrom(prev => { return [...prev.filter(item => item.id !== id)]; });
            setAvailabilityTo(prev => { return [...prev.filter(item => item.id !== id)]; });
        }
    };

    //Add up to three rows with input for competence or unlimited rows with input for date.
    const addRow = (type: "competence" | "date") => {
        setId(prevId => {
            const newId = prevId + 1;
            if (type === "competence") {
                if (competenceRow.length < 3) {
                    setCompetenceRow(prev => [...prev, { id: newId, type: "competence" }]);
                }
            } else if (type === "date") {
                setAvailabilityRow(prev => [...prev, { id: newId, from: null, to: null, type: "date" }]);
            }
            return newId;
        });
    };
    

    const removeRow = (id: number, type: "competence" | "date") => {
        if (type === "competence") {
            removeData(id, type);

            if (competenceRow.length > 1) {
                setCompetenceRow(prev => prev.filter(a => a.id !== id));
            }
            setYearsOfExperience(prev => {
                return [...prev.filter(item => item.id !== id)];
            });
        } else if (type === "date") {
            removeData(id, type);
            if (availabilityRow.length > 1) {
                setAvailabilityRow(prev => prev.filter(a => a.id !== id));
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
                {competenceRow.map((row)=>(
                    <DynamicInput key={`competence-${row.id}`} id={row.id} addRow={() => addRow("competence")} removeRow={() => removeRow(row.id, "competence")} addData={addData} component={(enableInput: boolean) => <CompetenceRow id={row.id} enableInput={enableInput} addData={addData}/>}/>
                ))}
                <Box sx={{height: 50, width: "100%" }}></Box>
                <Typography sx={{marginLeft: 1}}>Please provide the dates for the periods you are available to work.</Typography>
                <Typography sx={{marginLeft: 1, marginBottom: 2}}>Click add to add the date to your application.</Typography>
                {availabilityRow.map((row)=>( 
                    <DynamicInput key={`date-${row.id}`} id={row.id} addRow={() => addRow("date")} removeRow={() => removeRow(row.id, "date")} addData={addData} component={(enableInput: boolean) => <DateRow id = {row.id} enableInput={enableInput} addData={addData}/>}/>
                ))} 
            </Box>               
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
function DynamicInput({ id, addRow: addRow, removeRow: removeRow, addData: addData, component: component }: { id: number, addRow: () => void, removeRow: (id: number) => void, addData: (id: number, value: Competence | AvailableFrom | AvailableTo) => void, component: (enableInput: boolean, addData: (id: number, target: Competence | AvailableFrom | AvailableTo) => void) => JSX.Element }){
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
function CompetenceRow({ id, enableInput, addData: addData}: { id: number, enableInput: boolean, addData: (id: number, value: Competence) => void; }){
    const [competenceProfile, setCompetenceProfile] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");

    return(
        <Box sx={{ minWidth: 750, display: "flex", alignItems: "center", gap: 1 }}>
            <FormControl fullWidth>
                <InputLabel>Competence</InputLabel>
                <Select
                    id={`${id}`}
                    name={"competence_profile_id"}
                    value={competenceProfile}
                    disabled={enableInput}
                    onChange={(event) => {
                        setCompetenceProfile(event.target.value);
                        if(event !== null){
                            const competence: Competence = {
                                id: id,
                                name: event.target.name,
                                value: event.target.value,
                            };
                            
                            addData(id, competence);
                        }
                    }}
                >
                    <MenuItem value={1}>Ticket sales</MenuItem>
                    <MenuItem value={2}>Lotteries</MenuItem>
                    <MenuItem value={3}>Roller coaster operation</MenuItem>
                </Select>
            </FormControl>
            <TextField 
                id={`${id}`}
                name={"years_of_experience"}
                value={yearsOfExperience}
                disabled={enableInput}
                variant={"outlined"}
                sx={{ minWidth: 200, color:"#1976d2" }} inputProps={{ min: 0, max: 100 }}
                onChange={(event) => {
                    setYearsOfExperience(event.target.value);
                    if(event !== null){
                        const years: Competence = {
                            id: id,
                            name: event.target.name,
                            value: event.target.value,
                        };
                        
                        addData(id, years);
                    }
                }}
            />
        </Box>
    );
}

/**
 * A component that displays a row with two date input boxes.
 * 
 * @returns {JSX.Element} DateRow
 */
function DateRow({ id, enableInput, addData: addData}: { id: number, enableInput: boolean, addData: (id: number, value: AvailableFrom | AvailableTo) => void }){
    const [from] = useState(dayjs());
    const [to] = useState(dayjs());

    return(
        <Box sx={{ minWidth: "750px", display: "flex", flexDirection: "row", gap: 1}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{marginBottom: 1, minWidth: "750px", display: "flex", flexDirection: "row", gap: 1}}>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>From: </Typography>
                    <DatePicker
                        name={"from_date"}
                        value={from}
                        disabled={enableInput}
                        format={"YYYY-MM-DD"}
                        sx={{ width: 330 }} 
                        onChange={(event) => {
                            if(event !== null){
                                const availableFrom: AvailableFrom = {
                                    type: "date",
                                    name: "from_date",
                                    dateString: event.format('YYYY-MM-DD'),
                                };
                                addData(id, availableFrom);
                            }
                        }}
                    />   
                    <Typography sx={{ display: "flex", alignItems: "center" }}>To: </Typography>
                    <DatePicker 
                        name={"to_date"}
                        value={to}
                        disabled={enableInput}
                        format={"YYYY-MM-DD"}
                        sx={{ width: 330}} 
                        onChange={(event) => {
                            if(event !== null){
                                const availableFrom: AvailableTo = {
                                    type: "date",
                                    name: "to_date",
                                    dateString: event.format('YYYY-MM-DD'),
                                };
                                addData(id, availableFrom);
                            }
                        }}
                    />
                </Box>
            </LocalizationProvider>
        </Box>
    );
}