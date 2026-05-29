import { forwardRef, type ForwardedRef } from "react";
import BaseDialogWrapper from "../../../shared/ui/dialog/BaseDialogWrapper";
import { DialogTitle, Divider } from "@mui/material";
import { DeliveryCreateForm } from "./DeliveryCreateForm";
import type { DialogActionsType } from "../../../shared/interfaces/dialog/DialogActionsType";
import { closeDialog } from "../../../shared/ui/dialog/dialogHelper";

function CreateDeliveryDialog(_: {}, ref: ForwardedRef<DialogActionsType>) {
  const handleSuccess = () => {
    closeDialog(ref);
  };

  return (
    <BaseDialogWrapper ref={ref}>
      <DialogTitle>Nuova Consegna</DialogTitle>
      <Divider />
      <DeliveryCreateForm onSuccess={handleSuccess} />
    </BaseDialogWrapper>
  );
}

export default forwardRef(CreateDeliveryDialog);
