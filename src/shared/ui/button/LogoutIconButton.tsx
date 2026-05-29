import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../../context/AuthContext";

function LogoutIconButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <IconButton onClick={handleLogout}>
      <LogoutIcon color="primary" />
    </IconButton>
  );
}

export default LogoutIconButton;
