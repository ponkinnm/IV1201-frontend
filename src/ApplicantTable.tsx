import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

interface Applicant {
  person_id: number;
  name: string;
  surname: string;
  email: string;
  status_name: string;
}

const columns = [
  { field: 'person_id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'surname', headerName: 'Surname', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'status_name', headerName: 'Status', width: 200 }
];

export default function ApplicantTable() {
  const [rows, setRows] = React.useState<Applicant[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:3000/getApplications');
        const data: Applicant[] = await response.json();
        setRows(data.map(row => ({ ...row, id: row.person_id })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <div className="applicant-table-container">
            <Paper sx={{ height: '100%', width: '100%'}}>
                <DataGrid
                    columnHeaderHeight={25}
                    disableColumnMenu={true}
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[10, 25, 50, 100]}
                    sx={{ border: 0, height: '100%', overflowY: 'auto'}}
                    
                />
            </Paper>
        </div>
    )
}