import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Alert } from '@mui/material';

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
  { field: 'status_name', headerName: 'Status', width: 200 },
];

export default function ApplicantTable() {
  const [rows, setRows] = useState<Applicant[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const getApplications = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getApplications`);
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      return (await response.json()) as Promise<Applicant[]>;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setErrorMsg('Something went wrong when fetching applications, please try again later.');
      return [];
    }
  };

  useEffect(() => {
    getApplications()
      .then((applications) => setRows(applications))
      .catch(() => {
        console.error('Error getting applications');
      });
  }, []);

  return (
    <Paper elevation={2} sx={{ height: '90%', width: '100%', maxWidth: '900px' }}>
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      <DataGrid
        columnHeaderHeight={25}
        disableColumnMenu={true}
        rows={rows.map((r) => ({ ...r, id: r.person_id }))}
        columns={columns}
        pageSizeOptions={[10, 25, 50, 100]}
        sx={{ border: 0, height: '100%', overflowY: 'auto' }}
      />
    </Paper>
  );
}
