import { Stack, TextField } from "@mui/material";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import type { ICustomer } from "../api/ICustomer";

interface FormFieldsProps {
  control: Control<Partial<ICustomer>>;
  errors: FieldErrors<Partial<ICustomer>>;
}

export default function CustomerFormFields({ control, errors }: FormFieldsProps) {
  return (
    <Stack sx={{ gap: 2, width: "100%" }}>
      <Controller
        control={control}
        name="name"
        rules={{ required: "Nome obbligatorio" }}
        render={({ field }) => (
          <TextField {...field} label="Nome" fullWidth error={!!errors.name} helperText={errors.name?.message} />
        )}
      />

      <Controller
        control={control}
        name="address"
        render={({ field }) => (
          <TextField {...field} label="Indirizzo" fullWidth />
        )}
      />

      <Controller
        control={control}
        name="city"
        render={({ field }) => (
          <TextField {...field} label="Città" fullWidth />
        )}
      />

      <Controller
        control={control}
        name="province"
        render={({ field }) => (
          <TextField {...field} label="Provincia" fullWidth />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field }) => (
          <TextField {...field} label="Telefono" fullWidth />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{ pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Email non valida" } }}
        render={({ field }) => (
          <TextField {...field} label="Email" fullWidth error={!!errors.email} helperText={errors.email?.message} />
        )}
      />

      <Controller
        control={control}
        name="notes"
        render={({ field }) => (
          <TextField {...field} label="Note" fullWidth multiline rows={3} />
        )}
      />
    </Stack>
  );
}
