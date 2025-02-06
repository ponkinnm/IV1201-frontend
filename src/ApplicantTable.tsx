import { useState, useEffect } from 'react';
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
  const [rows, setRows] = useState<Applicant[]>([]);

  const getApplications: () => Promise<Applicant[]> = async () => {
    try {
        const response = await fetch('https://amusement-4d39a0dcf184.herokuapp.com/getApplications');
        const data: Applicant[] = await response.json() as Applicant[];
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
  }

  useEffect(() => {
    getApplications().then(applications => setRows(applications)).catch(() => {
        console.error("Error getting applications")
    });

  }, []);

  return (
    <div className="applicant-table-container">
            <Paper sx={{ height: '100%', width: '100%'}}>
                <DataGrid
                    columnHeaderHeight={25}
                    disableColumnMenu={true}
                    rows={rows.map(r => ({...r, id: r.person_id}))}
                    columns={columns}
                    pageSizeOptions={[10, 25, 50, 100]}
                    sx={{ border: 0, height: '100%', overflowY: 'auto'}}
                    
                />
            </Paper>
        </div>
    )
}