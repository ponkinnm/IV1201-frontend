/**
 * ApplicationForm is a component that shows an application form that lets users enter their information and then submit it.
 * The form can take the following information:
 *  Users can choose a competence and enter the amount of years they have experience with it. 
 *  Users can enter the time periods they are availiable to work by choosing a start date and an end date for the period.
 * When the user have entered data in the input boxes the data is saved to the form by clicking the add button.
 * Entered data can be removed by clicking the remove button next to the input box.
 * Data is submitted by clicking the submit button. The data is then sent to the parent component in which ApplicationForm is rendered in.
 */
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Dayjs } from 'dayjs';
import { Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface Competence {
    id: number;
    name: string;
    value: number;
}

interface AvailabilityDate {
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

/**
 * Parent component of the form.
 * ApplicationForm have functions that render and hide rows and functions that can add and remove saved data.
 * 
 * @param {function} getData A reference to the parent component that will recieve the entered data. 
 * @returns {JSX.Element} ApplicationForm
 */
export default function ApplicationForm({ getData: getData }:{ getData: (competenceProfileID: Competence[], yearsOfExperience: Competence[], availableFrom: AvailabilityDate[], availableTo: AvailabilityDate[]) => void}){
    const [id] = useState(Date.now()); //Unique id for each input box
    const [competenceLock, setCompetenceLock] = useState(true); //Locks add button from adding competence until all input boxes on the row have been filled out.
    const [dateLock, setDateLock] = useState(true); //Locks add button from adding a date until all input boxes on the row have been filled out.

    const [competenceRow, setCompetenceRow] = useState<{ id: number, type: "competence"}[]>([{ id: id, type: "competence"}]); //List all rendered CompetencyRow components
    const [availabilityRow, setAvailabilityRow] = useState<{ id: number, type: "date"}[]>([{ id: id, type: "date" }]); //List all rendered DateRow components
    
    //Display or hide input error message for the two different types of input rows.
    const [competenceError, setCompetenceError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    //Data from competence rows
    const [competenceProfileID, setCompetenceProfileID] = useState<Competence[]>([]);
    const [yearsOfExperience, setYearsOfExperience] = useState<Competence[]>([]);
    //Data from date rows
    const [availableFrom, setAvailableFrom] = useState<AvailabilityDate[]>([]);
    const [availableTo, setAvailableTo] = useState<AvailabilityDate[]>([]);

    useEffect(() => {
        getData(competenceProfileID, yearsOfExperience, availableFrom, availableTo);
    },[competenceProfileID, yearsOfExperience, availableFrom, availableTo]);

    //Save currently entered data using the hooks.
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
                setAvailableFrom(prev =>
                    prev.some(item => item.id === id)
                        ? prev.map(item => item.id === id ? {id, from: target.dateString} : item)
                        : [...prev, {id, from: target.dateString}]
                );
            } else if(target.name === "to_date"){
                setAvailableTo(prev =>
                    prev.some(item => item.id === id)
                        ? prev.map(item => item.id === id ? {id, to: target.dateString} : item)
                        : [...prev, {id, to: target.dateString}]
                );
            }  
        }
    };

    /**
     * Remove temporarily stored data using the hooks.
     * 
     * @param id the id of the row to remove
     * @param type the type of row to remove
     */
    const removeData = (id: number, type: "competence" | "date") => {
        if(type === "competence"){
            setCompetenceProfileID(prev => { return [...prev.filter(item => item.id !== id)]; });
            setYearsOfExperience(prev => { return [...prev.filter(item => item.id !== id)]; });
        } else if(type === "date"){
            setAvailableFrom(prev => { return [...prev.filter(item => item.id !== id)]; });
            setAvailableTo(prev => { return [...prev.filter(item => item.id !== id)]; });
        }
    };
 
    /**
     * Add up to three rows with input for competence or unlimited rows with input for date.
     * A new row will be added if the current row has all information needed.
     * 
     * @param type A string specifying what type of row to add
     * @returns true if input is correct, otherwise false
     */
    const addRow = (type: "competence" | "date") => {
        if(checkInput(type)){
            const newId = Date.now();
            if (type === "competence" && competenceRow.length < 3) {
                setCompetenceRow(prev => [...prev, { id: newId, type: "competence" }]);
            } else if (type === "date") {
                setAvailabilityRow(prev => [...prev, { id: newId, from: null, to: null, type: "date" }]);
            }
            return true;
        }
        return false;    
    };

    /**
     * Checks input for errors.
     * If errors are found an error message is displayed, the add button is inactivated and a new input row will not be rendered.
     * When the missing input have been resolved the add button is reactivated and the user can click add to add the data and render a new input row.
     * 
     * @param type what type of row inputs are being checked
     * @returns false if input is wrong and a new row shouldn't be rendered, otherwise true which will render a new row
     */
    const checkInput = (type: "competence" | "date") => {
        if(type === "competence"){
            if(competenceProfileID.length !== yearsOfExperience.length){ 
                setErrorMessage("This competence has already been entered!"); //User tried to add the same competence twice
                setCompetenceError(true);
                return false;
            } else if(competenceLock){
                setErrorMessage("Please fill out all required fields!"); //User tried to add a row without filling out all input boxes
                setCompetenceError(true);
                return false;
            }
        } else if(type === "date"){
            const today = getTodaysDate();
            if(availableFrom.some(date => date.from !== undefined && date.from < today) || availableTo.some(date => date.to !== undefined && date.to < today)){
                setErrorMessage("The selected date cannot be in the past. Please choose a valid date!"); //User entered a date that lies in the past
                setDateError(true);
                return false;
            }
            else if(availableFrom.some(fromDate => availableTo.some(toDate => fromDate.id === toDate.id && toDate.to !== undefined && fromDate.from !== undefined && (new Date(fromDate.from) > new Date (toDate.to) && fromDate.from !== toDate.to)))){ 
                setErrorMessage("The To date must be later than or the same as the From date!"); //User entered a to date that comes before the from date
                setDateError(true);
                return false;
            } else if(dateLock){ //Check that all input fields have been filled out
                setErrorMessage("Please fill out all required fields!"); //User tried to add a row without filling out all input boxes
                setDateError(true);
                return false;
            }
        }
        setDateError(false); //Hide date row error
        setCompetenceError(false); //Hide competence row error
        return true;
    }
    
    /**
     * Get todays date.
     * 
     * @returns todays date as a string "YYYY-MM-DD"
     */
    const getTodaysDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    /**
     * Remove a row from the form. Data will also be removed by calling removeData function.
     * 
     * @param id the id of the row to remove
     * @param type the type of row to remove
     */
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
        <Box sx={{ minHeight: "calc(100vh-64px)"}}>
            <Typography variant="h4" sx={{display: "flex", justifyContent: "center", alignItems: "start", marginTop: 4}}>Application</Typography>
            <Box sx={{display: "flex", flexDirection: "column", marginTop: "50px"}}>
                <Typography sx={{marginLeft: 1}}>Select up to three competencies and provide your years of experience.</Typography>
                <Typography sx={{marginLeft: 1, marginBottom: 2}}>Click add to add the competence to your application.</Typography>
                <Box sx={{height: 40, width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {competenceError && <Typography sx={{color: "red"}}>{errorMessage}</Typography>}
                </Box>
                {competenceRow.map((row)=>(
                    <DynamicInput key={`competence-${row.id}`} id={row.id} addRow={() => addRow("competence")} removeRow={() => removeRow(row.id, "competence")} addData={addData} component={(enableInput: boolean) => <CompetenceRow id={row.id} enableInput={enableInput} addData={addData} setCompetenceLock={setCompetenceLock}/>}/>
                ))}
                <Typography sx={{marginLeft: 1, marginTop: "50px"}}>Please provide the dates for the periods you are available to work.</Typography>
                <Typography sx={{marginLeft: 1, marginBottom: 2}}>Click add to add the date to your application.</Typography>
                <Box sx={{height: 40, width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {dateError && <Typography sx={{color: "red"}}>{errorMessage}</Typography>}
                </Box>
                {availabilityRow.map((row)=>( 
                    <DynamicInput key={`date-${row.id}`} id={row.id} addRow={() => addRow("date")} removeRow={() => removeRow(row.id, "date")} addData={addData} component={(enableInput: boolean) => <DateRow id = {row.id} enableInput={enableInput} addData={addData} setDateLock={setDateLock}/>}/>
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
 * @param id A unique id 
 * @param addRow Function that adds a row to the list of inputs
 * @param removeRow Function that removes a row from the list of inputs
 * @param renderComponent Function that returns the component to be rendered
 * @returns {JSX.Element} DynamicInput
 */
function DynamicInput({ id, addRow: addRow, removeRow: removeRow, addData: addData, component: component }: { id: number, addRow: () => boolean, removeRow: (id: number) => void, addData: (id: number, value: Competence | AvailableFrom | AvailableTo) => void, component: (enableInput: boolean, addData: (id: number, target: Competence | AvailableFrom | AvailableTo) => void) => JSX.Element }){
    const [buttonControl, setButtonControl] = useState(false); //Render an add or remove button
    const [enableInput, setEnableInput] = useState(false); //Enable or disable input boxes

    const add = () => {
        if(addRow()){ 
            setButtonControl(true); 
            setEnableInput(true);    
        }
    }

    return(
        <Box sx={{ marginBottom: 1, minWidth: "750px", display: "flex", flexDirection: "row", gap: 1}}>
            {component(enableInput, addData)}
            {
                buttonControl ? <Button onClick={() => {setButtonControl(false); setEnableInput(false); removeRow(id); }} sx={{backgroundColor: "#white", color: "#1976d2", minWidth: 90}}>Remove</Button> 
                              : <Button onClick={() => {add()}} sx={{backgroundColor: "#white", color: "#1976d2", minWidth: 90}}>Add</Button>
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
function CompetenceRow({ id, setCompetenceLock: setCompetenceLock, enableInput, addData: addData}: { id: number, setCompetenceLock: (check: boolean) => void, enableInput: boolean, addData: (id: number, value: Competence) => void; }){
    const [competenceProfile, setCompetenceProfile] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");

    useEffect(() => {
        if (competenceProfile !== "" && yearsOfExperience !== ""){
            setCompetenceLock(false);
            addData(id, { id: id, name: "competence_profile_id", value: Number(competenceProfile) });
            addData(id, { id: id, name: "years_of_experience", value: Number(yearsOfExperience) });
        } else{
            setCompetenceLock(true); //Lock until both input field have been filled out
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [competenceProfile, yearsOfExperience]);

    return(
        <Box sx={{ minWidth: 750, display: "flex", alignItems: "center", gap: 1, height: "100%"}}>
            <FormControl fullWidth>
                <InputLabel>Select a competence</InputLabel>
                <Select
                    id={`${id}`}
                    name={"competence_profile_id"}
                    value={competenceProfile}
                    disabled={enableInput}
                    onChange={(event) => {
                        if(event !== null){
                            setCompetenceProfile(event.target.value);   
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
                type={"number"}
                value={yearsOfExperience}
                placeholder={"years"}
                disabled={enableInput}
                variant={"outlined"}
                sx={{ minWidth: 200, color:"#1976d2" }} 
                onChange={(event) => {
                    if(event !== null && event.target.value !== "0"){
                        setYearsOfExperience(event.target.value);
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
function DateRow({ id, setDateLock: setDateLock, enableInput, addData: addData}: { id: number, setDateLock: (check: boolean) => void, enableInput: boolean, addData: (id: number, value: AvailableFrom | AvailableTo) => void }){
    const [from, setFrom] = useState<Dayjs | null>(null);
    const [to, setTo] = useState<Dayjs | null>(null);

    useEffect(() => {
        if(from !== null && to !== null){
            setDateLock(false);
            addData(id, { type: "date", name: "from_date", dateString: from.format('YYYY-MM-DD')});
            addData(id, { type: "date", name: "to_date", dateString: to.format('YYYY-MM-DD')});
        } else{
            setDateLock(true); //Lock until both input fields have been filled out
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, to]);

    return(
        <Box sx={{ minWidth: "750px", display: "flex", flexDirection: "row", gap: 1}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{marginBottom: 1, minWidth: "750px", display: "flex", flexDirection: "row", gap: 1}}>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>From: </Typography>
                    <DatePicker
                        key={`from_date-${id}`}
                        name={"from_date"}
                        value={from}
                        disabled={enableInput}
                        format={"YYYY-MM-DD"}
                        sx={{ width: 330 }} 
                        onChange={(event) => {
                            if(event !== null){
                                setFrom(event);
                            }
                        }}
                    />   
                    <Typography sx={{ display: "flex", alignItems: "center" }}>To: </Typography>
                    <DatePicker 
                        key={`to_date-${id}`}
                        name={"to_date"}
                        value={to}
                        disabled={enableInput}
                        format={"YYYY-MM-DD"}
                        sx={{ width: 330}} 
                        onChange={(event) => {
                            if(event !== null){
                                setTo(event);
                            }
                        }}
                    />
                </Box>
            </LocalizationProvider>
        </Box>
    );
}