import { useEffect, useState } from "react";
import axios from "../api/axios";
import JobCard from "../components/JobCard";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get("/jobs");
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="page-container">
      <h2>Available Jobs</h2>
      <div className="job-list">
        {jobs.map((job) => <JobCard key={job.id} job={job} />)}
      </div>
    </div>
  );
};

export default JobList;
