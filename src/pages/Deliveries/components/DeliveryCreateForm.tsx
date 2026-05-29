import { Card, Button, CircularProgress } from "@mui/material";
import DeliveryFormFields, { type DeliveryFormValues } from "./DeliveryFormFields";
import { useSnackbar } from "../../../context/SnackbarContext";
import { useForm, type SubmitHandler } from "react-hook-form";
import FormWrapper from "../../../shared/ui/form/FormWrapper";
import { deliveryApi } from "../api/deliveryApi";
import type { DeliveryStatus } from "../api/IDelivery";

interface DeliveryCreateFormProps {
  onSuccess?: () => void;
}

export function DeliveryCreateForm({ onSuccess }: DeliveryCreateFormProps) {
  const { showSnackbar } = useSnackbar();
  const { mutateAsync: createDelivery, isPending } = deliveryApi.usePost();

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

  const onSubmit: SubmitHandler<DeliveryFormValues> = async (data) => {
    try {
      const payload = {
        customer: data.customer?.id ?? "",
        pickupDate: new Date(data.pickupDate),
        deliveryDate: new Date(data.deliveryDate),
        status: data.status as DeliveryStatus,
      };

      await createDelivery(payload as any);
      reset();
      showSnackbar("Consegna creata con successo", "success");
      onSuccess?.();
    } catch (error) {
      showSnackbar("Errore durante la creazione della consegna", "error");
    }
  };

  return (
    <Card sx={{ p: 4, width: "100%", background: (t) => t.palette.background.default }}>
      <FormWrapper handleSubmit={handleSubmit(onSubmit)}>
        <DeliveryFormFields control={control} errors={errors} disableStatusField/>

        <Button type="submit" variant="contained" fullWidth disabled={isPending} sx={{ mt: 3, height: 55 }}>
          {isPending ? <CircularProgress size={24} color="inherit" /> : "Crea Consegna"}
        </Button>
      </FormWrapper>
    </Card>
  );
}
