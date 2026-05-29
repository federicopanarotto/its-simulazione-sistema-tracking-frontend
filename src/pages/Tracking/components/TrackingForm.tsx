import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Stack,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { TrackingRequest } from "../api/trackingApi";

interface TrackingFormProps {
  onSearch: (payload: TrackingRequest) => void;
  isLoading: boolean;
}

export const TrackingForm = ({ onSearch, isLoading }: TrackingFormProps) => {
  const [deliveryKey, setDeliveryKey] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [errors, setErrors] = useState<{
    deliveryKey?: string;
    deliveryDate?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!deliveryKey.trim()) {
      newErrors.deliveryKey = "Codice consegna obbligatorio";
    }

    if (!deliveryDate) {
      newErrors.deliveryDate = "Data consegna obbligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSearch({
      deliveryKey: deliveryKey.trim(),
      deliveryDate,
    });
  };

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Alert severity="info">
            Inserisci il codice consegna e la data per tracciare il tuo pacco
          </Alert>

          <TextField
            label="Codice Consegna"
            value={deliveryKey}
            onChange={(e) => {
              setDeliveryKey(e.target.value);
              if (errors.deliveryKey) {
                setErrors({ ...errors, deliveryKey: undefined });
              }
            }}
            error={!!errors.deliveryKey}
            helperText={errors.deliveryKey}
            fullWidth
            disabled={isLoading}
          />

          <TextField
            label="Data Consegna"
            type="date"
            value={deliveryDate}
            onChange={(e) => {
              setDeliveryDate(e.target.value);
              if (errors.deliveryDate) {
                setErrors({ ...errors, deliveryDate: undefined });
              }
            }}
            error={!!errors.deliveryDate}
            helperText={errors.deliveryDate}
            fullWidth
            disabled={isLoading}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            type="submit"
            variant="contained"
            startIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SearchIcon />
              )
            }
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? "Ricerca in corso..." : "Cerca"}
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};
