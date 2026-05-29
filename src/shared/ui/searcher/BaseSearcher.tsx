import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface BaseSearcherProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function BaseSearcher({
  value,
  onChange,
  placeholder = "Cerca...",
}: BaseSearcherProps) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      sx={{ maxWidth: 400, mb: {xs: 2, md: 0} }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default BaseSearcher;
