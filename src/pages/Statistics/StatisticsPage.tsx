import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BasePageWrapper from "../../shared/ui/page/BasePageWrapper";
import {
  useDeliveryStatistics,
  type DeliveryStatisticsResponse,
  type DeliveryStatus,
} from "./api/statisticsApi";

const statusOptions: Array<{ value: DeliveryStatus | ""; label: string }> = [
  { value: "", label: "Tutti gli stati" },
  { value: "in_deposito", label: "In deposito" },
  { value: "da_ritirare", label: "Da ritirare" },
  { value: "in_consegna", label: "In consegna" },
  { value: "consegnata", label: "Consegnata" },
  { value: "in_giacenza", label: "In giacenza" },
];

function StatisticsPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState<DeliveryStatus | "">("");

  // Funzione per ripulire tutti i campi di ricerca simultaneamente
  const handleResetFilters = () => {
    setFromDate("");
    setToDate("");
    setStatus("");
  };

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (fromDate) params.from = fromDate;
    if (toDate) params.to = toDate;
    if (status) params.status = status;
    return params;
  }, [fromDate, toDate, status]);

  const { data, isLoading, isFetching, error } =
    useDeliveryStatistics(queryParams);

  const statisticsItem = useMemo<DeliveryStatisticsResponse | null>(() => {
    if (!data || data.length === 0) {
      return null;
    }
    return data[0];
  }, [data]);

  return (
    <BasePageWrapper>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Dashboard Statistiche
          </Typography>
        </Box>

        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ fontWeight: 600 }} color="primary">
              Filtri di ricerca
            </Typography>

            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  label="Da"
                  type="date"
                  value={fromDate}
                  onChange={(event) => setFromDate(event.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  label="A"
                  type="date"
                  value={toDate}
                  onChange={(event) => setToDate(event.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  select
                  label="Stato"
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as DeliveryStatus | "")
                  }
                  fullWidth
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleResetFilters}
                  fullWidth
                  size="large"
                  sx={{ height: "56px" }} // Allinea perfettamente l'altezza del pulsante con i campi di testo
                >
                  Resetta filtri
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Card>

        {error && (
          <Alert severity="error">
            Errore durante il caricamento delle statistiche. Riprova più tardi.
          </Alert>
        )}

        {isLoading || isFetching ? (
          <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress />
          </Box>
        ) : statisticsItem ? (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card sx={{ p: 4, height: 290 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Numero totale di consegne
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 700 }}>
                  {statisticsItem.numberOfDeliveries}
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Card sx={{ p: 4, height: "100%" }}>
                <Typography variant="subtitle2" gutterBottom>
                  Tempo medio di consegna (ore)
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 700 }}>
                  {statisticsItem.averageDeliveryTimeHours.toFixed(1)} h
                </Typography>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Alert severity="info">
            Nessun risultato disponibile per i filtri selezionati.
          </Alert>
        )}
      </Stack>
    </BasePageWrapper>
  );
}

export default StatisticsPage;