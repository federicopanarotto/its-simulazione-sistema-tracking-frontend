import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LoginPage from "../pages/Login/LoginPage";
import AuthUserGuard from "./guards/AuthUserGuard";
import Layout from "../shared/ui/layout/Layout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import RegistrationPage from "../pages/Registration/RegistrationPage";
import CustomersPage from "../pages/Customers/CustomersPage";
import StatisticsPage from "../pages/Statistics/StatisticsPage";
import DeliveriesPage from "../pages/Deliveries/DeliveriesPage";

function AppRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        <Route element={<AuthUserGuard />}>
          <Route element={<Layout />}>
            <Route path="/*" element={<Navigate to="/" />} />
            <Route index path="/" element={<Navigate to="/dashboard" />} />
            
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/deliveries" element={<DeliveriesPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouting;
