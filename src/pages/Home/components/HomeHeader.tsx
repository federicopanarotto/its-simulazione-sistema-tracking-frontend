import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LoginIcon from "@mui/icons-material/Login";
import TrackingIcon from "@mui/icons-material/SpatialTracking";

export const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo/Brand */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flex: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <LocalShippingIcon sx={{ fontSize: 32 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              TrackingHub
            </Typography>
          </Box>

          {/* Actions */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<TrackingIcon />}
              onClick={() => navigate("/tracking")}
            >
              Traccia Pacco
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<LoginIcon />}
              onClick={() => navigate("/login")}
            >
              Accedi
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
