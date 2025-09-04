import { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const JobAdd = () => {
  const [form, setForm] = useState({ title: "", company: "", location: "", description: "", skills: "" });
  const { user } = useContext(AuthContext);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/jobs", form, { headers: { Authorization: `Bearer ${user.token}` } });
      alert("Job posted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error posting job");
    }
  };

  return (
    <div className="form-container">
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input name="skills" placeholder="Skills" value={form.skills} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobAdd;
