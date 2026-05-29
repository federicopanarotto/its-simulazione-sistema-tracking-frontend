import { Container, Link, Stack } from "@mui/material";
import RegistrationForm from "./components/RegistrationForm";
import { useNavigate } from "react-router";

function RegistrationPage() {
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate("/login", { replace: true });
    return null;
  }

  return (
    <Container>
      <Stack
        sx={{ height: "90vh", justifyContent: "center", alignItems: "center" }}
        spacing={4}
      >
        <RegistrationForm successRegistration={handleNavigateLogin} />
        <Link 
          sx={{
            cursor: "pointer"
          }}
          onClick={handleNavigateLogin}
        >
          Già registrato?
        </Link>
      </Stack>
    </Container>
  )
}

export default RegistrationPage;