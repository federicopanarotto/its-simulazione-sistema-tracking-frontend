import { forwardRef, type ForwardedRef } from "react";
import BaseDialogWrapper from "../../../shared/ui/dialog/BaseDialogWrapper";
import { DialogTitle, Divider } from "@mui/material";
import { CustomerCreateForm } from "./CustomerCreateForm";
import type { DialogActionsType } from "../../../shared/interfaces/dialog/DialogActionsType";

function CreateCustomerDialog(_: {}, ref: ForwardedRef<DialogActionsType>) {
  return (
    <BaseDialogWrapper ref={ref}>
      <DialogTitle>Nuovo Cliente</DialogTitle>
      <Divider />
      <CustomerCreateForm />
    </BaseDialogWrapper>
  );
}

export default forwardRef(CreateCustomerDialog);
