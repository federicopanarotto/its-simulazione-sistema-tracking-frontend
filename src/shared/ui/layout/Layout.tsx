import Box from "@mui/material/Box";
import { Outlet } from "react-router";
import SideNavBar from "./sidenavbar/SideNavBar";
import { usePageLoader } from "../../../context/PageLoaderContext";
import { LinearProgress } from "@mui/material";

function Layout() {
  const { isLoading } = usePageLoader();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100dvh",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {isLoading && (
        <LinearProgress
          color="primary"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: (theme) => theme.zIndex.drawer + 3,
            height: 3,
          }}
        />
      )}

      <SideNavBar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
