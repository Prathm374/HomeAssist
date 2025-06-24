import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Whoop404 from "./pages/Whoop404.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import { useEffect } from "react";
import { useUserStore } from "./store/useUserStore.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const fetchUserFromToken = useUserStore((state) => state.fetchUserFromToken);
  useEffect(() => {
    fetchUserFromToken();
  }, [fetchUserFromToken]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Normal user protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<MainPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/service" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Admin-only protected route */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>

          <Route path="*" element={<Whoop404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
