import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import JobAdd from "./pages/JobAdd";
import Applications from "./pages/Applications";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import '../src/index.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Recruiter only */}
          <Route
            path="/add-job"
            element={
              <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
                <JobAdd />
              </ProtectedRoute>
            }
          />

          {/* Admin + Recruiter */}
          <Route
            path="/applications"
            element={
              <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
                <Applications />
              </ProtectedRoute>
            }
          />

          {/* Admin + Recruiter Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
