import * as React from "react";
import {
  styled,
  useTheme,
  type Theme,
  type CSSObject,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SideNavTitle from "./SideNavTitle";
import { menuItems } from "./MenuItems";
import { useLocation, useNavigate } from "react-router";
// import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { useMediaQuery } from "@mui/material";
import ActionIconButton from "../../button/ActionIconButton";
import LogoutIconButton from "../../button/LogoutIconButton";
import { useMe } from "../../../api/user/useMe";

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

function SideNavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const { data: me } = useMe();

  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
      localStorage.setItem("sidebar-status", !open ? "true" : "false");
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    setOpen(localStorage.getItem("sidebar-status") === "true");
  }, []);

  const drawerContent = (
    <>
      <List>
        {menuItems.map((menuItem, index) => (
          <>
            {(menuItem.role === "all" || menuItem.role === me?.role) && (
              <ListItem
                key={`${menuItem.name}-${index}`}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  selected={location.pathname.includes(menuItem.path)}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    "&.Mui-selected": {
                      background: theme.palette.secondary.main,
                      "&:hover": {
                        background: theme.palette.primary.main,
                      },
                    },
                    borderRadius: 3,
                    "&:hover": {
                      background: theme.palette.primary.main,
                    },
                  }}
                  onClick={() => handleNavigate(menuItem.path)}
                >
                  <ListItemIcon
                    sx={{
                      color: theme.palette.text.secondary,
                      minWidth: 0,
                      justifyContent: "center",
                      mr: 3,
                    }}
                  >
                    {menuItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menuItem.name}
                    sx={{
                      color: theme.palette.text.secondary,
                      opacity: open || isMobile ? 1 : 0,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </>
        ))}
      </List>
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          display: "flex",
          flexDirection: open || isMobile ? "row" : "column",
          justifyContent: open || isMobile ? "space-between" : "center",
          alignItems: "center",
          gap: open || isMobile ? 0 : 1,
          p: 1,
          transition: theme.transitions.create(
            ["flex-direction", "justify-content", "gap"],
            {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            },
          ),
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: open ? "row" : "column",
            alignItems: "center",
            gap: 1,
            transition: theme.transitions.create(["flex-direction", "gap"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <ActionIconButton
            icon={PersonIcon}
            open={open}
            isMobile={isMobile}
            path="/profile"
          />
          {/* <ActionIconButton
            icon={SettingsIcon}
            open={open}
            isMobile={isMobile}
            path="/settings"
          /> */}
        </Box>
        <Box
          sx={{
            transition: theme.transitions.create(["margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            mr: open || isMobile ? 1 : 0,
          }}
        >
          <LogoutIconButton />
        </Box>
      </Box>
    </>
  );

  // Mobile drawer
  if (isMobile) {
    return (
      <Box sx={{ position: "sticky", top: 0, zIndex: theme.zIndex.drawer + 2 }}>
        {/* Title bar sempre visibile su mobile */}
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.drawer + 1,
            background: theme.palette.background.layout,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <SideNavTitle open={true} onToggleDrawer={handleDrawerToggle} />
        </Box>

        {/* Drawer temporaneo per mobile */}
        <MuiDrawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true, // Migliore performance su mobile
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: theme.palette.background.layout,
              pt: 8, // Spazio per la title bar
            },
          }}
        >
          {drawerContent}
        </MuiDrawer>
      </Box>
    );
  }

  // Desktop drawer
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        display: { xs: "none", md: "block" },
      }}
      slotProps={{
        paper: {
          sx: {
            background: theme.palette.background.layout,
          },
        },
      }}
    >
      <SideNavTitle open={open} onToggleDrawer={handleDrawerToggle} />
      {drawerContent}
    </Drawer>
  );
}

export default SideNavBar;
