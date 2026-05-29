import { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Stack, Typography, Box, Alert, Skeleton, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TrackingForm } from "./components/TrackingForm";
import { TrackingResults } from "./components/TrackingResults";
import { trackingApi, type TrackingRequest } from "./api/trackingApi";
import type { TrackingResponse } from "./api/ITracking";

export const TrackingPage = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<TrackingResponse | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const trackingMutation = trackingApi.useTrackingSearch();

  const handleSearch = (payload: TrackingRequest) => {
    setHasSearched(true);
    setSearchData(null);
    trackingMutation.mutate(payload, {
      onSuccess: (data) => {
        setSearchData(data);
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Traccia il Tuo Pacco
            </Typography>
            <Typography variant="body2">
              Monitora lo stato della tua consegna in tempo reale
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
          >
            Torna alla Home
          </Button>
        </Stack>

        <TrackingForm
          onSearch={handleSearch}
          isLoading={trackingMutation.isPending}
        />

        {trackingMutation.isPending && (
          <Stack spacing={2}>
            <Skeleton variant="rectangular" height={120} />
            <Skeleton variant="rectangular" height={100} />
          </Stack>
        )}

        {hasSearched && !trackingMutation.isPending && searchData && (
          <TrackingResults data={searchData} />
        )}

        {hasSearched && !trackingMutation.isPending && !searchData && (
          <Alert severity="warning">
            Nessun risultato trovato. Verifica i dati e riprova.
          </Alert>
        )}
      </Stack>
    </Container>
  );
};
