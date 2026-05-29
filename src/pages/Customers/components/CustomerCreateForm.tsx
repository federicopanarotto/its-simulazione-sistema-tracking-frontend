import { Card, Typography, Button, CircularProgress } from "@mui/material";
import CustomerFormFields from "./CustomerFormFields";
import { useSnackbar } from "../../../context/SnackbarContext";
import { useForm, type SubmitHandler } from "react-hook-form";
import FormWrapper from "../../../shared/ui/form/FormWrapper";
import type { ICustomer } from "../api/ICustomer";
import { customerApi } from "../api/customerApi";

interface CustomerCreateFormProps {
  onSuccess?: () => void;
}

export function CustomerCreateForm({ onSuccess }: CustomerCreateFormProps) {
  const { showSnackbar } = useSnackbar();
  const { mutateAsync: createCustomer, isPending } = customerApi.usePost();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Partial<ICustomer>>({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      province: "",
      phone: "",
      email: "",
      notes: "",
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<Partial<ICustomer>> = async (data) => {
    try {
      await createCustomer(data as any);
      reset();
      showSnackbar("Cliente creato con successo", "success");
      onSuccess?.();
    } catch (error) {
      showSnackbar("Errore durante la creazione", "error");
    }
  };

  return (
    <Card
      sx={{
        p: 4,
        width: "100%",
        background: (t) => t.palette.background.default,
      }}
    >
      <FormWrapper handleSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" textAlign="center" sx={{ mb: 3 }}>
          Nuovo Cliente
        </Typography>

        <CustomerFormFields control={control} errors={errors} />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isPending}
          sx={{ mt: 3, height: 55 }}
        >
          {isPending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Crea Cliente"
          )}
        </Button>
      </FormWrapper>
    </Card>
  );
}
