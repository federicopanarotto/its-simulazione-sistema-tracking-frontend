import { DialogTitle, DialogContent, DialogActions, Button, Divider, CircularProgress } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import BaseDialogWrapper from "../../../shared/ui/dialog/BaseDialogWrapper";
import FormWrapper from "../../../shared/ui/form/FormWrapper";
import { closeDialog } from "../../../shared/ui/dialog/dialogHelper";
import type { ICustomer } from "../api/ICustomer";
import { forwardRef, type ForwardedRef, useEffect } from "react";
import type { DialogActionsType } from "../../../shared/interfaces/dialog/DialogActionsType";
import CustomerFormFields from "./CustomerFormFields";
import { customerApi } from "../api/customerApi";
import { useSnackbar } from "../../../context/SnackbarContext";

interface EditProps {
  customer?: ICustomer;
}

function EditCustomerDialog({ customer }: EditProps, ref: ForwardedRef<DialogActionsType>) {
  const { showSnackbar } = useSnackbar();
  const { mutateAsync: updateCustomer, isPending } = customerApi.usePut();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<Partial<ICustomer>>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (customer) {
      reset({
        name: customer.name,
        address: customer.address,
        city: customer.city,
        province: customer.province,
        phone: customer.phone,
        email: customer.email,
        notes: customer.notes,
      });
    }
  }, [customer]);

  const handleClose = () => closeDialog(ref);

  const onSubmit: SubmitHandler<Partial<ICustomer>> = async (data) => {
    if (!customer) return;
    try {
      await updateCustomer({ id: (customer.id as any), payload: data } as any);
      reset();
      handleClose();
      showSnackbar("Cliente aggiornato con successo", "success");
    } catch (error) {
      showSnackbar("Errore durante l'aggiornamento", "error");
    }
  };

  return (
    <BaseDialogWrapper ref={ref}>
      <DialogTitle>Modifica Cliente</DialogTitle>
      <Divider />
      <FormWrapper handleSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ py: 2 }}>
          <CustomerFormFields control={control} errors={errors} />
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>Annulla</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isPending}
            sx={{ minWidth: 100 }}
          >
            {isPending ? <CircularProgress size={24} /> : "Salva"}
          </Button>
        </DialogActions>
      </FormWrapper>
    </BaseDialogWrapper>
  );
}

export default forwardRef(EditCustomerDialog);
