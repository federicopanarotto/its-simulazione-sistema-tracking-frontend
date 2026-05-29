import { forwardRef, type ForwardedRef } from "react";
import BaseDialogWrapper from "../../../shared/ui/dialog/BaseDialogWrapper";
import { DialogTitle, Divider } from "@mui/material";
import { CustomerCreateForm } from "./CustomerCreateForm";
import type { DialogActionsType } from "../../../shared/interfaces/dialog/DialogActionsType";
import { closeDialog } from "../../../shared/ui/dialog/dialogHelper";

function CreateCustomerDialog(_: {}, ref: ForwardedRef<DialogActionsType>) {
  const handleSuccess = () => {
    closeDialog(ref);
  };

  return (
    <BaseDialogWrapper ref={ref}>
      <DialogTitle>Nuovo Cliente</DialogTitle>
      <Divider />
      <CustomerCreateForm onSuccess={handleSuccess} />
    </BaseDialogWrapper>
  );
}

export default forwardRef(CreateCustomerDialog);
