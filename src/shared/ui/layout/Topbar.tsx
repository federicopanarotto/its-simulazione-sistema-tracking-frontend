import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface TopbarProps {
  backPath?: string;
}

function Topbar({ backPath }: TopbarProps) {
  const navigate = useNavigate();

  return (
    <Box position="static" sx={{ py: 2, px: 2, pb: 0 }}>
      {backPath && (
        <Button
          sx={{ px: 1, py: 0, minHeight: 30 }}
          onClick={() => navigate(backPath)}
        >
          <ArrowBackIcon sx={{ mr: 0.4 }} /> Torna indietro
        </Button>
      )}
    </Box>
  );
}

export default Topbar;
