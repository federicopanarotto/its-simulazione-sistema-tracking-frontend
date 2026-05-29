import { Stack, TextField, Autocomplete, MenuItem } from "@mui/material";
import { customerApi } from "../../Customers/api/customerApi";
import type { ICustomer } from "../../Customers/api/ICustomer";
import type { DeliveryStatus } from "../api/IDelivery";

interface DeliveryFiltersProps {
  customerId: string | null;
  status: DeliveryStatus | "";
  onCustomerChange: (customer: ICustomer | null) => void;
  onStatusChange: (status: DeliveryStatus | "") => void;
}

const statusOptions: Array<{ value: DeliveryStatus | ""; label: string }> = [
  { value: "", label: "Tutti gli stati" },
  { value: "in_deposito", label: "In deposito" },
  { value: "da_ritirare", label: "Da ritirare" },
  { value: "in_consegna", label: "In consegna" },
  { value: "consegnata", label: "Consegnata" },
  { value: "in_giacenza", label: "In giacenza" },
];

export default function DeliveryFilters({
  customerId,
  status,
  onCustomerChange,
  onStatusChange,
}: DeliveryFiltersProps) {
  const { data: customers = [] } = customerApi.useGetList();

  const selectedCustomer = customerId
    ? (customers.find((customer) => customer.id === customerId) ?? null)
    : null;

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ width: "100%" }}
    >
      <Autocomplete
        options={customers}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={selectedCustomer}
        onChange={(_, value) => onCustomerChange(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Cliente"
            placeholder="Tutti i clienti"
          />
        )}
        fullWidth
      />

      <TextField
        select
        fullWidth
        label="Stato"
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value as DeliveryStatus | "")
        }
      >
        {statusOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
