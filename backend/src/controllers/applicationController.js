import pool from "../config/db.js";

export const applyJob = async (req, res) => {
  const { jobId } = req.body;
  const resume = req.file.filename;

  try {
    await pool.query(
      "INSERT INTO applications (user_id, job_id, resume) VALUES (?, ?, ?)",
      [req.user.id, jobId, resume]
    );
    res.status(201).json({ message: "Application submitted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    const [apps] = await pool.query(
      "SELECT a.id, u.name, u.email, j.title, a.created_at FROM applications a JOIN users u ON a.user_id=u.id JOIN jobs j ON a.job_id=j.id WHERE j.recruiter_id=?",
      [req.user.id]
    );
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
