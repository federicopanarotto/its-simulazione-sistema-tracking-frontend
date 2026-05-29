import { useEffect, forwardRef, type ForwardedRef } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { DialogTitle, DialogContent, DialogActions, Button, Divider, TextField, MenuItem, CircularProgress } from "@mui/material";
import BaseDialogWrapper from "../../../shared/ui/dialog/BaseDialogWrapper";
import FormWrapper from "../../../shared/ui/form/FormWrapper";
import { closeDialog } from "../../../shared/ui/dialog/dialogHelper";
import type { DialogActionsType } from "../../../shared/interfaces/dialog/DialogActionsType";
import type { IDelivery, DeliveryStatus } from "../api/IDelivery";
import { deliveryApi } from "../api/deliveryApi";

interface StatusFormValues {
  status: DeliveryStatus | "";
}

interface UpdateDeliveryStatusDialogProps {
  delivery?: IDelivery;
}

const statusOptions: Array<{ value: DeliveryStatus; label: string }> = [
  { value: "in_deposito", label: "In deposito" },
  { value: "da_ritirare", label: "Da ritirare" },
  { value: "in_consegna", label: "In consegna" },
  { value: "consegnata", label: "Consegnata" },
  { value: "in_giacenza", label: "In giacenza" },
];

function UpdateDeliveryStatusDialog({ delivery }: UpdateDeliveryStatusDialogProps, ref: ForwardedRef<DialogActionsType>) {
  const { mutateAsync: updateStatus, isPending } = deliveryApi.usePutStatus(delivery?.id ?? "");
  const { control, handleSubmit, reset, formState: { errors } } = useForm<StatusFormValues>({
    defaultValues: { status: "" },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (delivery) {
      reset({ status: delivery.status });
    }
  }, [delivery]);

  const handleClose = () => closeDialog(ref);

  const onSubmit: SubmitHandler<StatusFormValues> = async (data) => {
    if (!delivery) return;
    await updateStatus(data.status as DeliveryStatus);
    handleClose();
  };

  return (
    <BaseDialogWrapper ref={ref}>
      <DialogTitle>Aggiorna Stato</DialogTitle>
      <Divider />
      <FormWrapper handleSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ py: 2 }}>
          <Controller
            name="status"
            control={control}
            rules={{ required: "Stato obbligatorio" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Stato"
                error={Boolean(errors.status)}
                helperText={errors.status?.message}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>Annulla</Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? <CircularProgress size={24} /> : "Aggiorna"}
          </Button>
        </DialogActions>
      </FormWrapper>
    </BaseDialogWrapper>
  );
}

export default forwardRef(UpdateDeliveryStatusDialog);
