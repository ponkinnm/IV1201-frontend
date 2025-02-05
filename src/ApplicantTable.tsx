import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

//TODO: Replace test data with data from the database
const columns = [
    { field: 'testID', headerName: 'testID', width: 100}, //TODO: testID is only used for testing purposes!
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'surname', headerName: 'Surname', width: 200 },
    { field: 'pnr', headerName: 'Pnr', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'availiableFrom', headerName: 'Availiable from', width: 200 },
    { field: 'availiableTo', headerName: 'Availiable to', width: 200 }
];

//TODO: Replace test data with data from the database
function getRows(){
    const rows = [];
    let i = 0;
    for(i=0; i < 100; i+=2){
        rows.push({ id:i, testID:i, name:'Max', surname:'Andersson', pnr:'20250101-1234', email:'max.andersson@mail.se', username:'maxand', availiableFrom:'2025-06-01', availiableTo:'2025-08-31'});
        rows.push({ id:i+1, testID:i+1, name:'Lisa', surname:'Persson', pnr:'20250101-6789', email:'lisa.persson@mail.se', username:'lipe', availiableFrom:'2025-06-05', availiableTo:'2025-08-15'});
    }
    return rows;
}

//Set start page and number of entries per page.
const paginationModel = {page:0, pageSize:10}; 

//Returns a Material UI table component.
function ApplicantTable(){
    return(
        <div className="applicant-table-container">
            <Paper sx={{ height: '100%', width: '100%'}}>
                <DataGrid
                    columnHeaderHeight={25}
                    disableColumnMenu={true}
                    rows={getRows()}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[10, 25, 50, 100]}
                    sx={{ border: 0, height: '100%', overflowY: 'auto'}}
                    
                />
            </Paper>
        </div>
    )
}

export default ApplicantTable;