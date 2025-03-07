import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Paper,
  Alert,
  CircularProgress,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  SelectChangeEvent 
} from '@mui/material';
import { useTranslation } from "react-i18next";

interface Availability {
  person_id: number;
  from_date: string;
  to_date: string;
}

interface Person {
  person_id: number;
  name: string;
  surname: string;
  pnr: string;
  email: string;
  role_id: number;
}

interface Competence {
  competence_name: string;
  years_of_experience: string;
}

interface ApplicationDetails {
  application_id: number;
  availability: Availability[];
  competence: Competence[];
  person: Person;
  status: string;
}

interface StatusOption {
  status_id: number;
  status_name: string;
  name: string;
}

export default function ApplicationDetails() {
  const { application_id } = useParams();
  const [details, setDetails] = useState<ApplicationDetails | null>(null);
  const [error, setError] = useState<string>('');
  const [statusUpdateError, setStatusUpdateError] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);
  const { t } = useTranslation("ApplicationDetails");

  const STATUS_OPTIONS: StatusOption[] = [
    { status_id: 1, status_name: "unhandled", name: t("unhandled") },
    { status_id: 2, status_name: "accepted", name: t("accepted") },
    { status_id: 3, status_name: "rejected", name: t("rejected") }
  ];

  const fetchDetails = useCallback(async () => {
    try { //${import.meta.env.VITE_API_URL}
      const response = await fetch(`${import.meta.env.VITE_API_URL}/applications/${application_id}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }

      const data = (await response.json()) as ApplicationDetails;
      setDetails(data);
    } catch (error: unknown) {
      console.error(t("log_fetch_error"), error);
      setError(t("fetch_error"));
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [application_id]);

  useEffect(() => {
    void fetchDetails();
  }, [fetchDetails]);

  const handleStatusChange = async (event: SelectChangeEvent<number>) => {
    const newStatusId = event.target.value as number;
    setIsUpdating(true);
    setStatusUpdateError('');

    try {//${import.meta.env.VITE_API_URL}
      const response = await fetch(`${import.meta.env.VITE_API_URL}/applications/${application_id}/status`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_status_id: newStatusId,
          old_status_id: STATUS_OPTIONS.find((opt) => opt.status_name === details?.status)?.status_id,
        }),
      });

      if (!response.ok) {
        throw new Error(t("response_error"));
      }

      void fetchDetails();
    } catch (error: unknown) {
      console.error(t("log_update_error"), error);
      setStatusUpdateError(t("update_error"));
    } finally {
      setIsUpdating(false);
    }
  };

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!details) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">{t("details_error")}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t("headline")}
        </Typography>
        
        {/* Personal Information */}
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          {t("person_info")}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flex: '1 1 calc(50% - 12px)', minWidth: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
            <Typography variant="subtitle1" color="text.secondary">
              {t("name")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {details.person.name} {details.person.surname}
            </Typography>
          </Box>
          <Box sx={{ flex: '1 1 calc(50% - 12px)', minWidth: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
            <Typography variant="subtitle1" color="text.secondary">
              {t("pnr")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {details.person.pnr}
            </Typography>
          </Box>
          <Box sx={{ flex: '1 1 100%' }}>
            <Typography variant="subtitle1" color="text.secondary">
            {t("email")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {details.person.email}
            </Typography>
          </Box>
        </Box>

        {/* Application Status */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          {t("status_header")}
        </Typography>
        <Box sx={{ mb: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="status-select-label">{t("status")}</InputLabel>
            <Select
            labelId="status-select-label"
            value={STATUS_OPTIONS.find(opt => opt.status_name === details.status)?.status_id ?? ''}
            onChange={(event) => void handleStatusChange(event)}
            label="Status"
            disabled={isUpdating}
            >

              {STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.status_id} value={option.status_id}>
                  {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {isUpdating && (
            <Box sx={{ mt: 1 }}>
              <CircularProgress size={20} />
            </Box>
          )}
          {statusUpdateError && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {statusUpdateError}
            </Alert>
          )}
        </Box>

        {/* Availability Periods */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          {t("availability_period")}
        </Typography>
        {details.availability.length > 0 ? (
          details.availability.map((period, index) => (
            <Paper key={index} sx={{ p: 2, mb: 1, backgroundColor: 'background.default' }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t("from")}
                  </Typography>
                  <Typography variant="body1">
                    {new Date(period.from_date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t("to")}
                  </Typography>
                  <Typography variant="body1">
                    {new Date(period.to_date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            {t("no_availability_periods")}
          </Typography>
        )}

        {/* Competencies */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          {t("competencies")}
        </Typography>
        {details.competence.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {details.competence.map((comp, index) => (
              <Paper key={index} sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                  <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {t("competence")}
                    </Typography>
                    <Typography variant="body1">
                      {comp.competence_name}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {t("years_of_experience")}
                    </Typography>
                    <Typography variant="body1">
                      {parseFloat(comp.years_of_experience)} {parseFloat(comp.years_of_experience) === 1 ? 'year' : 'years'}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary">
            {t("no_competencies")}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}