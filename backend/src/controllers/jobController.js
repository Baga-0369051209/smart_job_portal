import pool from "../config/db.js";

export const createJob = async (req, res) => {
  const { title, company, location, description, skills } = req.body;
  try {
    await pool.query(
      "INSERT INTO jobs (title, company, location, description, skills, recruiter_id) VALUES (?, ?, ?, ?, ?, ?)",
      [title, company, location, description, skills, req.user.id]
    );
    res.status(201).json({ message: "Job created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getJobs = async (req, res) => {
  const { title, location, skills } = req.query;
  let query = "SELECT * FROM jobs WHERE 1=1";
  let params = [];

  if (title) {
    query += " AND title LIKE ?";
    params.push(`%${title}%`);
  }
  if (location) {
    query += " AND location LIKE ?";
    params.push(`%${location}%`);
  }
  if (skills) {
    query += " AND skills LIKE ?";
    params.push(`%${skills}%`);
  }

  try {
    const [jobs] = await pool.query(query, params);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
