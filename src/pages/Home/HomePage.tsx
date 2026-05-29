import { Box, Stack } from "@mui/material";
import { HomeHeader } from "./components/HomeHeader";
import { HomeHero, HomeFeatures, HomeFooter } from "./components/HomeSections";

export const HomePage = () => {
  return (
    <Stack sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <HomeHeader />

      <Box sx={{ flex: 1 }}>
        <HomeHero />
        <HomeFeatures />
      </Box>

      <HomeFooter />
    </Stack>
  );
};
