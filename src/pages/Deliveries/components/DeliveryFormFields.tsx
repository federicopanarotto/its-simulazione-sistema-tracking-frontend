import { Stack, TextField, MenuItem, Autocomplete } from "@mui/material";
import {
  Controller,
  useWatch,
  type Control,
  type FieldErrors,
} from "react-hook-form";
import type { ICustomer } from "../../Customers/api/ICustomer";
import type { DeliveryStatus } from "../api/IDelivery";
import { customerApi } from "../../Customers/api/customerApi";

export interface DeliveryFormValues {
  customer: ICustomer | null;
  pickupDate: string;
  deliveryDate: string;
  status: DeliveryStatus | "";
}

interface FormFieldsProps {
  control: Control<DeliveryFormValues>;
  errors: FieldErrors<DeliveryFormValues>;
  disableStatusField?: boolean;
}

const statusOptions: { value: DeliveryStatus; label: string }[] = [
  { value: "in_deposito", label: "In deposito" },
  { value: "in_consegna", label: "In consegna" },
  { value: "consegnata", label: "Consegnata" },
  { value: "in_giacenza", label: "In giacenza" },
];

export default function DeliveryFormFields({
  control,
  errors,
  disableStatusField = false,
}: FormFieldsProps) {
  const { data: customers, isLoading: isLoadingCustomers } =
    customerApi.useGetList();
  const pickupDate = useWatch({ control, name: "pickupDate" });

  return (
    <Stack sx={{ gap: 2, width: "100%" }}>
      <Controller
        control={control}
        name="customer"
        rules={{ required: "Cliente obbligatorio" }}
        render={({ field }) => (
          <Autocomplete
            options={customers || []}
            getOptionLabel={(option) => option.name || ""}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            value={field.value}
            onChange={(_, value) => field.onChange(value)}
            loading={isLoadingCustomers}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cliente"
                error={!!errors.customer}
                helperText={errors.customer?.message}
              />
            )}
          />
        )}
      />

      <Controller
        control={control}
        name="pickupDate"
        rules={{ required: "Data ritiro obbligatoria" }}
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            fullWidth
            label="Data Ritiro"
            error={!!errors.pickupDate}
            helperText={errors.pickupDate?.message}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />

      <Controller
        control={control}
        name="deliveryDate"
        rules={{
          required: "Data consegna obbligatoria",
          validate: (value) => {
            if (!pickupDate || !value) return true;
            return (
              new Date(value) >= new Date(pickupDate) ||
              "La data consegna deve essere uguale o successiva alla data di ritiro"
            );
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            fullWidth
            label="Data Consegna"
            error={!!errors.deliveryDate}
            helperText={errors.deliveryDate?.message}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />

      {!disableStatusField && (
        <Controller
          control={control}
          name="status"
          rules={{ required: "Stato obbligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              fullWidth
              label="Stato"
              error={!!errors.status}
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
      )}
    </Stack>
  );
}
