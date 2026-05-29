import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  type ForwardedRef,
  type ReactNode,
} from "react";
import { CircularProgress, Dialog, useMediaQuery, useTheme, type SxProps } from "@mui/material";
import type { DialogActionsType } from "../../interfaces/dialog/DialogActionsType";
import type { Theme } from "@emotion/react";

interface BaseDialogProps {
  children: ReactNode;
  onClose?: () => void;
  isDialogOpen?: (open: boolean) => void;
  sx?: SxProps<Theme> | undefined;
  fullscreenDisable?: boolean | undefined;
  isLoading?: boolean | undefined;
}

function BaseDialogWrapper(
  { children, isDialogOpen, sx, fullscreenDisable = false, onClose, isLoading }: BaseDialogProps,
  ref: ForwardedRef<DialogActionsType>
) {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useImperativeHandle(ref, () => ({
    getStatus: open,
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  useEffect(() => {
    isDialogOpen?.(open);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  }

  return (
    <Dialog
      fullScreen={isSmallScreen && !fullscreenDisable}
      open={open}
      onClose={() => handleClose()}
      slotProps={{
        paper: {
          sx: {
            minWidth: { xs: 0, md: 500 },
            borderRadius: isSmallScreen && !fullscreenDisable ? 0 : 4,
          },
        },
      }}
      sx={{ ...sx }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>{children}</>
      )}
    </Dialog>
  );
}

export default forwardRef(BaseDialogWrapper);
