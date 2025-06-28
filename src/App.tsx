import { useEffect, useState } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Home from "./pages/home/Home";
import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import type { TUsers } from "./data/Users";
import DefaultLayout from "./DefaultLayout";
import AdminDashboard from "./pages/home/dashboard/admin/AdminDashboard";
import Appointments from "./pages/home/dashboard/admin/Appointments";
import CalendarView from "./pages/home/dashboard/admin/CalendarView";
import PatientDashboard from "./pages/home/dashboard/patient/PatientDashboard";
import { ProtectedRoute, PublicProtectedRoute } from "./ProtectedRoute";
import About from "./pages/about/About";

// Simple Loader Component
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
  </div>
);

const getCurrentUser = () =>
  JSON.parse(sessionStorage.getItem("currentUser") || "null");

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<TUsers>(getCurrentUser());

  useEffect(() => {
    const loadUser = () => {
      setTimeout(() => {
        const user = JSON.parse(sessionStorage.getItem("currentUser") || "null");
        setCurrentUser(user);
        setLoading(false);
      }, 1000); // can reduce to 500ms if needed
    };

    loadUser();

    const handleStorage = () => loadUser();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Show loader while auth status is checking
  if (loading) return <Loader />;

  return (
    <Router>
      {!currentUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <PublicProtectedRoute>
              <Home />
            </PublicProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicProtectedRoute>
              <Login />
            </PublicProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicProtectedRoute>
              <Register />
            </PublicProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicProtectedRoute>
              <About />
            </PublicProtectedRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <DefaultLayout>
                <Outlet />
              </DefaultLayout>
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/appointment" element={<Appointments />} />
          <Route path="/calendar/view" element={<CalendarView />} />
        </Route>
      </Routes>

      {!currentUser && <Footer />}
    </Router>
  );
}

export default App;
