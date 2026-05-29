import { DialogTitle, DialogContent, DialogActions, Button, Divider, CircularProgress } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { forwardRef, type ForwardedRef, useEffect } from "react";
import BaseDialogWrapper from "../../../shared/ui/dialog/BaseDialogWrapper";
import FormWrapper from "../../../shared/ui/form/FormWrapper";
import { closeDialog } from "../../../shared/ui/dialog/dialogHelper";
import type { DialogActionsType } from "../../../shared/interfaces/dialog/DialogActionsType";
import type { IDelivery } from "../api/IDelivery";
import DeliveryFormFields, { type DeliveryFormValues } from "./DeliveryFormFields";
import { deliveryApi } from "../api/deliveryApi";

interface EditDeliveryDialogProps {
  delivery?: IDelivery;
}

function EditDeliveryDialog({ delivery }: EditDeliveryDialogProps, ref: ForwardedRef<DialogActionsType>) {
  const { mutateAsync: updateDelivery, isPending } = deliveryApi.usePut();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeliveryFormValues>({
    defaultValues: {
      customer: null,
      pickupDate: "",
      deliveryDate: "",
      status: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!delivery) return;
    reset({
      customer: typeof delivery.customer === "string" ? null : delivery.customer,
      pickupDate: delivery.pickupDate ? new Date(delivery.pickupDate).toISOString().split("T")[0] : "",
      deliveryDate: delivery.deliveryDate ? new Date(delivery.deliveryDate).toISOString().split("T")[0] : "",
      status: delivery.status,
    });
  }, [delivery]);

  const handleClose = () => closeDialog(ref);

  const onSubmit: SubmitHandler<DeliveryFormValues> = async (data) => {
    if (!delivery) return;
    const customerValue = data.customer?.id ?? (typeof delivery.customer === "string" ? delivery.customer : delivery.customer?.id);

    await updateDelivery({
      id: delivery.id,
      payload: {
        customer: customerValue,
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
        status: data.status,
      },
    } as any);

    reset();
    handleClose();
  };

  return (
    <BaseDialogWrapper ref={ref}>
      <DialogTitle>Modifica Consegna</DialogTitle>
      <Divider />
      <FormWrapper handleSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ py: 2 }}>
          <DeliveryFormFields control={control} errors={errors} />
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>Annulla</Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? <CircularProgress size={24} /> : "Salva"}
          </Button>
        </DialogActions>
      </FormWrapper>
    </BaseDialogWrapper>
  );
}

export default forwardRef(EditDeliveryDialog);