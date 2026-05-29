import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface SideNavTitleProps {
  open?: boolean;
  onToggleDrawer: () => void;
}

function SideNavTitle({ onToggleDrawer }: SideNavTitleProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        width: "100%",
        p: 1,
        pl: 1.5,
        background: (theme) => theme.palette.background.layout,
      }}
    >
      <IconButton onClick={onToggleDrawer} color="primary" sx={{ mr: 1 }}>
        <MenuIcon />
      </IconButton>

      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ ml: 1 }}
        color="textSecondary"
      >
        React template
      </Typography>
    </Box>
  );
}

export default SideNavTitle;
