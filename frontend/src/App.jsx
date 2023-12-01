import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ServicesPage from "./pages/ServicesPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthLayout from "./components/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPasswordPage from "./pages/ResetPasswordPage";

export const App = () => {
  const { isAuth } = useAuth();
  console.log(isAuth);
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
      <Route
        path="/services"
        element={
          <>
            <Navbar />
            <ServicesPage />
            <Footer />
          </>
        }
      />
      <Route
        path="/services/:id"
        element={
          <>
            <Navbar />
            <ServiceDetailPage />
            <Footer />
          </>
        }
      />

      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route
        element={<ProtectedRoute isAllowed={!isAuth} redirectTo={"/profile"} />}
      >
        <Route
          path="/signup"
          element={<AuthLayout children={<SignupPage />} />}
        />
        <Route
          path="/login"
          element={<AuthLayout children={<LoginPage />} />}
        />
      </Route>

      <Route
        element={<ProtectedRoute isAllowed={isAuth} redirectTo={"/login"} />}
      >
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <ProfilePage />
              <Footer />
            </>
          }
        />
      </Route>
    </Routes>
  );
};
