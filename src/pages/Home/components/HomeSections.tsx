import { Box, Container, Stack, Typography, Button, Card, Divider } from "@mui/material";
import { useNavigate } from "react-router";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SearchIcon from "@mui/icons-material/Search";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import LoginIcon from "@mui/icons-material/Login";
import TrackingIcon from "@mui/icons-material/SpatialTracking";

const features = [
  {
    icon: <SearchIcon sx={{ fontSize: 40 }} />,
    title: "Tracciamento in Tempo Reale",
    description: "Monitora la posizione del tuo pacco istante per istante",
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: "Sicuro e Affidabile",
    description: "I tuoi dati sono protetti con le migliori tecnologie",
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
    title: "Veloce e Intuitivo",
    description: "Interfaccia semplice e di facile utilizzo",
  },
];

export const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        pt: 12,
        pb: 8,
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} sx={{ py: 6 }}>
          {/* Hero Title */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <LocalShippingIcon sx={{ fontSize: 60 }} />
          </Box>

          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.2,
            }}
          >
            Traccia i Tuoi Pacchi Ovunque
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              fontWeight: 300,
              opacity: 0.95,
            }}
          >
            Il sistema di tracciamento più affidabile per le tue spedizioni.
            Conosci in tempo reale dove si trova il tuo pacco.
          </Typography>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: "center", mt: 4 }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<TrackingIcon />}
              onClick={() => navigate("/tracking")}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Inizia a Tracciare
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              size="large"
              startIcon={<LoginIcon />}
              onClick={() => navigate("/login")}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Accedi al Portale
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ mt: 6 }} />
      </Container>
    </Box>
  );
};

export const HomeFeatures = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={8}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Perché Scegliere TrackingHub?
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Scopri le funzionalità che rendono il nostro servizio leader nel settore
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                p: 3,
                textAlign: "center",
                transition: "transform 0.3s, boxShadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 3,
                },
              }}
            >
              <Box sx={{ color: "primary.main", mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {feature.description}
              </Typography>
            </Card>
          ))}
        </Box>
      </Stack>
    </Container>
  );
};

export const HomeFooter = () => {
  return (
    <Box sx={{ bg: "grey.100", py: 4, mt: 8, borderTop: "1px solid #e0e0e0" }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center" }}>
          © 2026 TrackingHub. Tutti i diritti riservati.
        </Typography>
      </Container>
    </Box>
  );
};
