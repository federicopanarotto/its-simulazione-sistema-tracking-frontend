import type { Theme } from "@emotion/react";
import { Box, type SxProps } from "@mui/material";
import type { ReactNode } from "react";

interface CalloutProps {
  children: ReactNode;
  sx?: SxProps<Theme> | undefined;
}

function Callout({ children, sx }: CalloutProps) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: (theme) => theme.palette.divider,
        p: 2,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        gap: 2,
        ...sx
      }}
    >
      {children}
    </Box>
  );
}

export default Callout;
