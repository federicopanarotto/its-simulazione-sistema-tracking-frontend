import { forwardRef, type ForwardedRef } from "react";
import { DialogTitle, DialogContent, DialogActions, Button, Typography, Divider, Stack } from "@mui/material";
import BaseDialogWrapper from "../../../shared/ui/dialog/BaseDialogWrapper";
import { closeDialog } from "../../../shared/ui/dialog/dialogHelper";
import type { IDelivery } from "../api/IDelivery";
import type { DialogActionsType } from "../../../shared/interfaces/dialog/DialogActionsType";

interface DeliveryDetailDialogProps {
  delivery?: IDelivery;
}

function DeliveryDetailDialog({ delivery }: DeliveryDetailDialogProps, ref: ForwardedRef<DialogActionsType>) {
  return (
    <BaseDialogWrapper ref={ref}>
      <DialogTitle>Dettaglio Consegna</DialogTitle>
      <Divider />
      <DialogContent sx={{ py: 2 }}>
        <Stack spacing={1} sx={{color: 'text.primary'}}>
          <Typography variant="subtitle2" color="primary">Cliente</Typography>
          <Typography>{typeof delivery?.customer === "string" ? delivery?.customer : delivery?.customer?.name}</Typography>

          <Typography variant="subtitle2" color="primary">Tracking</Typography>
          <Typography>{delivery?.deliveryKey ?? "-"}</Typography>

          <Typography variant="subtitle2" color="primary">Data ritiro</Typography>
          <Typography>{delivery ? new Date(delivery.pickupDate).toLocaleDateString("it-IT") : "-"}</Typography>

          <Typography variant="subtitle2" color="primary">Data consegna</Typography>
          <Typography>{delivery ? new Date(delivery.deliveryDate).toLocaleDateString("it-IT") : "-"}</Typography>

          <Typography variant="subtitle2" color="primary">Stato</Typography>
          <Typography sx={{ textTransform: "capitalize" }}>{delivery?.status ?? "-"}</Typography>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={() => closeDialog(ref)}>Chiudi</Button>
      </DialogActions>
    </BaseDialogWrapper>
  );
}

export default forwardRef(DeliveryDetailDialog);
