import BasePageWrapper from "../../shared/ui/page/BasePageWrapper";
import { Box, Button, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CustomerTable from "./components/CustomerTable";
import CreateCustomerDialog from "./components/CreateCustomerDialog";
import { useRef } from "react";
import type { DialogActionsType } from "../../shared/interfaces/dialog/DialogActionsType";
import { openDialog } from "../../shared/ui/dialog/dialogHelper";

function CustomersPage() {
  const createDialogRef = useRef<DialogActionsType | null>(null);

  return (
    <BasePageWrapper>
      <Stack spacing={3} sx={{ width: '100%' }}>
        <Box display="flex" justifyContent="flex-end">
          <Button startIcon={<AddIcon />} variant="contained" onClick={() => openDialog(createDialogRef)}>
            Nuovo Cliente
          </Button>
        </Box>

        <CustomerTable />
      </Stack>

      <CreateCustomerDialog ref={createDialogRef} />
    </BasePageWrapper>
  );
}

export default CustomersPage;
