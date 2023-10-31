import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ServicesPage from "./pages/ServicesPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthLayout from "./components/AuthLayout";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <HomePage />
            <Footer />
          </>
        }
      />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:id" element={<ServiceDetailPage />} />
      <Route
        path="/signup"
        element={<AuthLayout children={<SignupPage />} />}
      />
      <Route path="/login" element={<AuthLayout children={<LoginPage />} />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};
