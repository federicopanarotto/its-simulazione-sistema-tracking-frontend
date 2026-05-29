import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface BaseCreateButtonProps {
  onClick: () => void;
}

function BaseCreateButton({ onClick }: BaseCreateButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{
        position: { xs: "fixed", md: "static" },
        mb: { xs: 0, md: 2 },
        bottom: 16,
        right: 8,
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <AddIcon /> Nuovo
    </Button>
  );
}

export default BaseCreateButton;
