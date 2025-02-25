import { useEffect, useState } from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Applicant {
  application_id: number;
  name: string;
  surname: string;
  email: string;
  status_name: string;
}

const columns = [
  { field: 'application_id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'surname', headerName: 'Surname', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'status_name', headerName: 'Status', width: 200 },
];

export default function ApplicantTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Applicant[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const getApplications = async (): Promise<Applicant[]> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/applications`, {
        credentials: 'include', // This is important for sending cookies
      });

      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }

      const data = (await response.json()) as Applicant[];
      return data;
    } catch {
      setErrorMsg('Something went wrong when fetching applicants, please try again later.');
      return [];
    }
  };

  useEffect(() => {
    void (async () => {
      try {
        const applications = await getApplications();
        setRows(applications);
      } catch (error) {
        console.error('Error getting applications:', error);
      }
    })();
  }, []);

  const handleRowClick = (params: GridRowParams<Applicant>) => {
    void navigate(`/applicants/${params.row.application_id}`);
  };

  return (
    <Paper elevation={2} sx={{ height: '90%', width: '100%', maxWidth: 'min(95dvw, 900px)' }}>
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      <DataGrid
        columnHeaderHeight={25}
        disableColumnMenu={true}
        rows={rows.map((r) => ({ ...r, id: r.application_id }))}
        columns={columns}
        pageSizeOptions={[10, 25, 50, 100]}
        sx={{ border: 0, height: '100%', overflowY: 'auto' }}
        onRowClick={handleRowClick}
      />
    </Paper>
  );
}
