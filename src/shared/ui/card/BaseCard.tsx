import { Card, type SxProps } from "@mui/material";
import type { ReactNode } from "react";

interface BaseCardProps {
  children: ReactNode;
  sx?: SxProps;
}

function BaseCard({ children, sx }: BaseCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        background: (theme) => theme.palette.background.default,
        position: "relative",
        ...sx
      }}
    >
      {children}
    </Card>
  );
}

export default BaseCard;
