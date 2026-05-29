import { Card, Stack, Typography, Box, Chip, Alert } from "@mui/material";
import dayjs from "dayjs";
import type { TrackingResponse } from "../api/ITracking";
import type { DeliveryStatus } from "../../Deliveries/api/IDelivery";

interface TrackingResultsProps {
  data: TrackingResponse;
}

const getStatusColor = (
  status?: DeliveryStatus
): "default" | "primary" | "success" | "warning" | "error" => {
  switch (status) {
    case "consegnata":
      return "success";
    case "in_consegna":
      return "primary";
    case "in_giacenza":
      return "warning";
    case "in_deposito":
      return "default";
    default:
      return "default";
  }
};

const getStatusLabel = (status?: DeliveryStatus): string => {
  switch (status) {
    case "consegnata":
      return "Consegnata";
    case "in_consegna":
      return "In Consegna";
    case "in_giacenza":
      return "In Giacenza";
    case "in_deposito":
      return "In Deposito";
    default:
      return "Sconosciuto";
  }
};

export const TrackingResults = ({ data }: TrackingResultsProps) => {
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Stato della Consegna
          </Typography>
          <Chip
            label={getStatusLabel(data.status)}
            color={getStatusColor(data.status)}
            variant="filled"
            size="medium"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="caption">
              Data Ritiro
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
              {data.pickupDate
                ? dayjs(data.pickupDate).format("DD/MM/YYYY")
                : "Non disponibile"}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption">
              Data Consegna Prevista
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
              {data.deliveryDate
                ? dayjs(data.deliveryDate).format("DD/MM/YYYY")
                : "Non disponibile"}
            </Typography>
          </Box>
        </Box>

        {data.status === "consegnata" && (
          <Alert severity="success">
            ✓ Il tuo pacco è stato consegnato con successo!
          </Alert>
        )}

        {data.status === "in_consegna" && (
          <Alert severity="info">
            → Il tuo pacco è in transito verso la destinazione finale.
          </Alert>
        )}

        {data.status === "in_giacenza" && (
          <Alert severity="warning">
            ⚠ Il tuo pacco è in giacenza. Contatta il supporto per più informazioni.
          </Alert>
        )}

        {data.status === "in_deposito" && (
          <Alert severity="info">
            📦 Il tuo pacco è nel deposito in preparazione.
          </Alert>
        )}
      </Stack>
    </Card>
  );
};
