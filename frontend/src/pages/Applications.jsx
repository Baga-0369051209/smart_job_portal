import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchApps = async () => {
      const res = await axios.get("/applications", {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setApplications(res.data);
    };
    fetchApps();
  }, [user]);

  return (
    <div className="page-container">
      <h2>Candidate Applications</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Job Title</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.title}</td>
              <td>{new Date(app.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Applications;
