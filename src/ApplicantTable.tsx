import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

//TODO: Replace test columns with columns from the database
const columns = [
    { field: 'testId', headerName: 'ID', width: 20},
    { field: 'firstName', headerName: 'First name', width: 200 },
    { field: 'lastName', headerName: 'Last name', width: 200 }
];

//TODO: Replace test data with data from the database
function getRows(){

    let rows = [];
    let i = 0;
    for(i=0; i < 100; i++){
        rows.push({ id: i, testId: i, firstName: 'Max', lastName: 'Andersson' });
    }
    
    return rows;
}

const paginationModel = {page:0, pageSize:10};

function ApplicantTable(){
    return(
        <div className="applicant-table-container">
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={getRows()}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[10, 25, 50, 100]}
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    )
}

export default ApplicantTable;