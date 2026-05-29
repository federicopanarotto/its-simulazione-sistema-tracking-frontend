import { forwardRef, type ForwardedRef } from "react";
import { DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress, Box, Divider } from "@mui/material";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import BaseDialogWrapper from "../../../shared/ui/dialog/BaseDialogWrapper";
import { closeDialog } from "../../../shared/ui/dialog/dialogHelper";
import type { DialogActionsType } from "../../../shared/interfaces/dialog/DialogActionsType";
import type { IDelivery } from "../api/IDelivery";
import { deliveryApi } from "../api/deliveryApi";
import { useSnackbar } from "../../../context/SnackbarContext";

interface DeleteDeliveryDialogProps {
  delivery?: IDelivery;
}

function DeleteDeliveryDialog({ delivery }: DeleteDeliveryDialogProps, ref: ForwardedRef<DialogActionsType>) {
  const { showSnackbar } = useSnackbar();
  const { mutateAsync: deleteDelivery, isPending } = deliveryApi.useDelete();

  const canDelete = delivery?.status !== "consegnata";

  const handleClose = () => {
    if (!isPending) closeDialog(ref);
  };

  const handleDelete = async () => {
    if (!delivery || !canDelete) return;
    await deleteDelivery(delivery.id as any);
    showSnackbar("Consegna eliminata con successo", "success");
    closeDialog(ref);
  };

  return (
    <BaseDialogWrapper ref={ref}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3 }}>
        <WarningAmberRoundedIcon sx={{ fontSize: 60, color: 'error.main', mb: 1 }} />
        <DialogTitle sx={{ pb: 1 }}>Conferma Eliminazione</DialogTitle>
      </Box>

      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography variant="body1">Sei sicuro di voler eliminare la consegna:</Typography>
        <Typography variant="body1" sx={{ fontWeight: 700, mt: 1 }}>
          {delivery?.deliveryKey ?? "---"}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
          {canDelete ? "Questa operazione non può essere annullata." : "La consegna non può essere eliminata perché è già consegnata."}
        </Typography>
      </DialogContent>

      <Divider />
      <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
        <Button onClick={handleClose} variant="outlined" disabled={isPending} sx={{ borderRadius: 4, px: 4 }}>
          Annulla
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={isPending || !canDelete}
          sx={{ borderRadius: 4, px: 4, minWidth: 120 }}
        >
          {isPending ? <CircularProgress size={24} color="inherit" /> : "Elimina"}
        </Button>
      </DialogActions>
    </BaseDialogWrapper>
  );
}

export default forwardRef(DeleteDeliveryDialog);
