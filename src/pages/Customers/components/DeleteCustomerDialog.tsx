import { forwardRef, type ForwardedRef } from "react";
import { 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  CircularProgress,
  Box
} from "@mui/material";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import BaseDialogWrapper from "../../../shared/ui/dialog/BaseDialogWrapper";
import { closeDialog } from "../../../shared/ui/dialog/dialogHelper";
import type { ICustomer } from "../api/ICustomer";
import type { DialogActionsType } from "../../../shared/interfaces/dialog/DialogActionsType";
import { useSnackbar } from "../../../context/SnackbarContext";
import { customerApi } from "../api/customerApi";
import type { ApiError } from "../../../shared/api/ApiError";

interface DeleteProps {
  customer?: ICustomer;
}

function DeleteCustomerDialog({ customer }: DeleteProps, ref: ForwardedRef<DialogActionsType>) {
  const { showSnackbar } = useSnackbar();
  const { mutateAsync: deleteCustomer, isPending } = customerApi.useDelete();

  const handleClose = () => {
    if (!isPending) closeDialog(ref);
  };

  const handleDelete = async () => {
    if (!customer) return;
    try {
      await deleteCustomer((customer.id as any) as any);
      showSnackbar("Cliente eliminato con successo", "success");
      closeDialog(ref);
    } catch (error: ApiError | any) {
      showSnackbar(error.response?.data?.message || "Errore durante l'eliminazione", "error");
    }
  };

  return (
    <BaseDialogWrapper ref={ref}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3 }}>
        <WarningAmberRoundedIcon sx={{ fontSize: 60, color: 'error.main', mb: 1 }} />
        <DialogTitle sx={{ pb: 1 }}>Conferma Eliminazione</DialogTitle>
      </Box>

      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography variant="body1">
          Sei sicuro di voler eliminare il cliente:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 700, mt: 1 }}>
          {customer ? customer.name : "---"}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
          Questa operazione non può essere annullata.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
        <Button 
          onClick={handleClose} 
          variant="outlined" 
          disabled={isPending}
          sx={{ borderRadius: 4, px: 4 }}
        >
          Annulla
        </Button>
        <Button 
          onClick={handleDelete} 
          variant="contained" 
          color="error"
          disabled={isPending}
          sx={{ borderRadius: 4, px: 4, minWidth: 120 }}
        >
          {isPending ? <CircularProgress size={24} color="inherit" /> : "Elimina"}
        </Button>
      </DialogActions>
    </BaseDialogWrapper>
  );
}

export default forwardRef(DeleteCustomerDialog);
