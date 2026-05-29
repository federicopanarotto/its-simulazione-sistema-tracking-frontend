import BasePageWrapper from "../../shared/ui/page/BasePageWrapper";
import { Box, Button, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useRef, useState } from "react";
import type { DialogActionsType } from "../../shared/interfaces/dialog/DialogActionsType";
import { openDialog } from "../../shared/ui/dialog/dialogHelper";
import DeliveryTable from "./components/DeliveryTable";
import CreateDeliveryDialog from "./components/CreateDeliveryDialog";
import DeliveryFilters from "./components/DeliveryFilters";
import type { DeliveryStatus } from "./api/IDelivery";

function DeliveriesPage() {
  const createDialogRef = useRef<DialogActionsType | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<DeliveryStatus | "">("");

  return (
    <BasePageWrapper>
      <Stack spacing={3} sx={{ width: '100%' }}>
        <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
          <DeliveryFilters
            customerId={selectedCustomerId}
            status={selectedStatus}
            onCustomerChange={(customer) => setSelectedCustomerId(customer?.id ?? null)}
            onStatusChange={(status) => setSelectedStatus(status)}
          />
          <Button startIcon={<AddIcon />} variant="contained" onClick={() => openDialog(createDialogRef)}>
            Nuova Consegna
          </Button>
        </Box>

        <DeliveryTable customerId={selectedCustomerId} status={selectedStatus} />
      </Stack>

      <CreateDeliveryDialog ref={createDialogRef} />
    </BasePageWrapper>
  );
}

export default DeliveriesPage;
