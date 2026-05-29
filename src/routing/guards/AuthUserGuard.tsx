import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../shared/ui/form/Loading";

function AuthUserGuard() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />
}

export default AuthUserGuard;
