import type { DialogActionsType } from "../../interfaces/dialog/DialogActionsType";

function withRef(ref: React.Ref<DialogActionsType> | null, fn: (dialog: DialogActionsType) => void) {
  if (!ref) return;
  if ("current" in ref && ref.current) {
    fn(ref.current);
  } else if (typeof ref === "function") {
    fn({
      getStatus: false,
      open: () => {},
      close: () => {},
    });
  }
}

export function openDialog(ref: React.Ref<DialogActionsType> | null) {
  withRef(ref, dialog => dialog.open());
}

export function closeDialog(ref: React.Ref<DialogActionsType> | null) {
  withRef(ref, dialog => dialog.close());
}