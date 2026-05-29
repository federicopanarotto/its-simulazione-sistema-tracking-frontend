import { Container, Link, Stack } from "@mui/material";
import LoginForm from "./components/LoginForm";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/", { replace: true });
    return null;
  };

  const handleNavigateRegister = () => {
    navigate("/register", { replace: true });
    return null;
  }

  useEffect(() => {
    if (isAuthenticated) {
      handleNavigateHome();
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container>
      <Stack
        sx={{ height: "90vh", justifyContent: "center", alignItems: "center" }}
        spacing={4}
      >
        <LoginForm successLogin={handleNavigateHome} />
        <Link 
          sx={{
            cursor: "pointer"
          }}
          onClick={handleNavigateRegister}
        >
          Non sei registrato?
        </Link>
      </Stack>
    </Container>
  );
}

export default LoginPage;
