import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ jobs: 0, applications: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user.role === "recruiter" || user.role === "admin") {
          const jobsRes = await axios.get("/jobs", {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          const appsRes = await axios.get("/applications", {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setStats({ jobs: jobsRes.data.length, applications: appsRes.data.length });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, [user]);

  return (
    <div className="table-container">
      <h2>Dashboard</h2>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
          <h3>Total Jobs</h3>
          <p>{stats.jobs}</p>
        </div>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
          <h3>Total Applications</h3>
          <p>{stats.applications}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
