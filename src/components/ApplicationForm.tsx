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
export default function ApplicationForm({ getData: getData }:{ getData: (competenceProfileID: Competence[], yearsOfExperience: Competence[], availabilityFrom: AvailabilityDate[], availabilityTo: AvailabilityDate[]) => void}){
    const [id] = useState(Date.now()); //Unique id for each input box
    const [lock, setLock] = useState(true); //Locks add button from adding data until all input boxes on the row have been filled out.
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
    const [availabilityFrom, setAvailabilityFrom] = useState<AvailabilityDate[]>([]);
    const [availabilityTo, setAvailabilityTo] = useState<AvailabilityDate[]>([]);

   /* TODO: useEffect(() => {
        checkInput("competence");
    }, [competenceProfileID, yearsOfExperience]);*/

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
            setAvailabilityFrom(prev => { return [...prev.filter(item => item.id !== id)]; });
            setAvailabilityTo(prev => { return [...prev.filter(item => item.id !== id)]; });
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
        console.log(lock);
        if(type === "competence" && lock){
            /*
            if((competenceProfileID.length !== yearsOfExperience.length 
                || (competenceProfileID.length === yearsOfExperience.length && !competenceProfileID.some(comp => yearsOfExperience.some(exp => comp.id === exp.id))))){
                setCompetenceError(true); //Display error for competency rows
                console.log("no matching competence id");
                return false;
            } */

            //Check not unique on competence
            //check years of experience is larger than 0 
            //Check both boxes are filled out
            console.log("yoe");
            console.log(yearsOfExperience.map(exp => exp.value));
            if(yearsOfExperience.some(exp => Number(exp.value) < 0 )){ setErrorMessage("Please enter a higher number for years of experience!"); }
            else if(competenceProfileID.some(comp => competenceProfileID.some(com => comp.id === com.id))){ setErrorMessage("This competence has already been entered!"); }
            else{ setErrorMessage("Please fill out all required fields!"); }
            setCompetenceError(true);
            
            return false;
        } else if(type === "date" && lock){
           /* if((availabilityFrom.length !== availabilityTo.length 
                || (availabilityFrom.length === availabilityTo.length && !availabilityFrom.some(from => availabilityTo.some(to => from.id === to.id))))){
                setDateError(true); //Display error for date rows
                console.log("no matching date id");
                return false;
            }*/

            //check both filled out
            //check from date is before to date
            //
            setDateError(true);
            setErrorMessage("TEST B");
            return false;
        }

        console.log("All systems are go");
       // console.log(competenceProfileID.length !== yearsOfExperience.length || !competenceProfileID.some(comp => yearsOfExperience.some(exp => comp.id === exp.id)));
        console.log(competenceProfileID);
        console.log(yearsOfExperience);
        setDateError(false); //Hide error
        setCompetenceError(false); //Hide error
        return true;
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
        <Box sx={{ minHeight: "100vh", marginTop: 4}}>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "start"}}>
                <Typography variant="h4">Application</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", marginTop: "50px"}}>
                <Typography sx={{marginLeft: 1}}>Select up to three competencies and provide your years of experience.</Typography>
                <Typography sx={{marginLeft: 1, marginBottom: 2}}>Click add to add the competence to your application.</Typography>
                <Box sx={{height: 40, width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {competenceError && <Typography sx={{color: "red"}}>{errorMessage}</Typography>}
                </Box>
                {competenceRow.map((row)=>(
                    <DynamicInput key={`competence-${row.id}`} id={row.id} addRow={() => addRow("competence")} removeRow={() => removeRow(row.id, "competence")} addData={addData} component={(enableInput: boolean) => <CompetenceRow id={row.id} enableInput={enableInput} addData={addData} setLock={setLock}/>}/>
                ))}
                <Typography sx={{marginLeft: 1, marginTop: "50px"}}>Please provide the dates for the periods you are available to work.</Typography>
                <Typography sx={{marginLeft: 1, marginBottom: 2}}>Click add to add the date to your application.</Typography>
                <Box sx={{height: 40, width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {dateError && <Typography sx={{color: "red"}}>{errorMessage}</Typography>}
                </Box>
                {availabilityRow.map((row)=>( 
                    <DynamicInput key={`date-${row.id}`} id={row.id} addRow={() => addRow("date")} removeRow={() => removeRow(row.id, "date")} addData={addData} component={(enableInput: boolean) => <DateRow id = {row.id} enableInput={enableInput} addData={addData} setLock={setLock}/>}/>
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
function CompetenceRow({ id, setLock: setLock, enableInput, addData: addData}: { id: number, setLock: (check: boolean) => void, enableInput: boolean, addData: (id: number, value: Competence) => void; }){
    const [competenceProfile, setCompetenceProfile] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");

    useEffect(() => {
        if (competenceProfile !== "" && yearsOfExperience !== ""){
            addData(id, { id: id, name: "competence_profile_id", value: 1 });
            addData(id, { id: id, name: "years_of_experience", value: 1});
            setLock(false);
        } else{
            setLock(true);
        }
    }, [competenceProfile, yearsOfExperience, id, addData, setLock]);

    return(
        <Box sx={{ minWidth: 750, display: "flex", alignItems: "center", gap: 1, height: "100%"}}>
            <FormControl fullWidth>
                <InputLabel>Competence</InputLabel>
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
                    if(event !== null){
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
function DateRow({ id, setLock: setLock, enableInput, addData: addData}: { id: number, setLock: (check: boolean) => void, enableInput: boolean, addData: (id: number, value: AvailableFrom | AvailableTo) => void }){
    const [from, setFrom] = useState<Dayjs | null>(null);
    const [to, setTo] = useState<Dayjs | null>(null);

    useEffect(() => {
        if(from !== null && to !== null){
            addData(id, { type: "date", name: "from_date", dateString: from.format('YYYY-MM-DD')});
            addData(id, { type: "date", name: "to_date", dateString: to.format('YYYY-MM-DD')});
            setLock(false);
        } else{
            setLock(true);
        }
    }, [from, to, id, addData, setLock]);

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