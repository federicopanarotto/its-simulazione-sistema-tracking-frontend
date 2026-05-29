import { useState } from "react";
import { Container, Stack, Typography, Box, Alert, Skeleton } from "@mui/material";
import { TrackingForm } from "./components/TrackingForm";
import { TrackingResults } from "./components/TrackingResults";
import { trackingApi, type TrackingRequest } from "./api/trackingApi";
import type { TrackingResponse } from "./api/ITracking";

export const TrackingPage = () => {
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
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Traccia il Tuo Pacco
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Monitora lo stato della tua consegna in tempo reale
          </Typography>
        </Box>

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
