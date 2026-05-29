import { IconButton, type SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { useNavigate } from "react-router";

interface ActionIconButtonProps {
  open: boolean;
  isMobile: boolean;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  path: string;
} 

function ActionIconButton({
  open,
  isMobile,
  icon: Icon,
  path
}: ActionIconButtonProps) {
  const navigate = useNavigate();

  return (
    <IconButton
      size={open || isMobile ? "medium" : "small"}
      sx={{
        transition: theme => theme.transitions.create(["width", "height"], {
          duration: theme.transitions.duration.shorter,
        }),
        color: (theme) =>
          location.pathname.includes(path)
            ? "#000"
            : theme.palette.secondary.main,
        background: (theme) =>
          location.pathname.includes(path)
            ? theme.palette.primary.main
            : "transparent",
        borderRadius: 4,
        "&:hover": {
          background: theme => theme.palette.primary.main,
          color: "#000",
        },
      }}
      onClick={() => navigate(path)}
    >
      <Icon sx={{ color: "inherit" }} />
    </IconButton>
  );
}

export default ActionIconButton;
