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
        rules={{ required: "Indirizzo obbligatorio" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Indirizzo"
            fullWidth
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="city"
        rules={{ required: "Città obbligatoria" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Città"
            fullWidth
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="province"
        rules={{ required: "Provincia obbligatoria" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Provincia"
            fullWidth
            error={!!errors.province}
            helperText={errors.province?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        rules={{ required: "Telefono obbligatorio" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Telefono"
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email obbligatoria",
          pattern: {
            value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
            message: "Email non valida",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="notes"
        render={({ field }) => (
          <TextField
            {...field}
            label="Note"
            fullWidth
            multiline
            rows={3}
            helperText={errors.notes?.message}
          />
        )}
      />
    </Stack>
  );
}
