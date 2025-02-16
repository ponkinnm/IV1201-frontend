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

interface ResponseData {
  application_id: number;
  person_id: number;
  status_id: number;
  submitted_date: string | null;
  Person: {
    person_id: number;
    name: string;
    surname: string;
    email: string;
  };
  Status: {
    status_name: string;
  };
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

      const returnedData = await response.json() as ResponseData[];

      const data: Applicant[] = returnedData.map((applicant) => ({
        person_id: applicant.Person?.person_id ?? null,
        name: applicant.Person?.name ?? "",
        surname: applicant.Person?.surname ?? "",
        email: applicant.Person?.email ?? "",
        status_name: applicant.Status?.status_name ?? "Unknown",
      }));
      return data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setErrorMsg('Something went wrong when fetching applicants, please try again later.');
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
