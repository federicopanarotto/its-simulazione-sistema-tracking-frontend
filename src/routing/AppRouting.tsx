import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LoginPage from "../pages/Login/LoginPage";
import AuthUserGuard from "./guards/AuthUserGuard";
import Layout from "../shared/ui/layout/Layout";
import SettingsPage from "../pages/Settings/SettingsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import RegistrationPage from "../pages/Registration/RegistrationPage";
import CustomersPage from "../pages/Customers/CustomersPage";
import StatisticsPage from "../pages/Statistics/StatisticsPage";
import DeliveriesPage from "../pages/Deliveries/DeliveriesPage";
import { TrackingPage } from "../pages/Tracking/TrackingPage";
import { HomePage } from "../pages/Home/HomePage";

function AppRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/tracking" element={<TrackingPage />} />

        <Route element={<AuthUserGuard />}>
          <Route element={<Layout />}>
            <Route path="/*" element={<Navigate to="/home" />} />
            <Route index path="/" element={<Navigate to="/dashboard" />} />
            
            <Route path="/dashboard" element={<StatisticsPage />} />

            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/deliveries" element={<DeliveriesPage />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouting;
