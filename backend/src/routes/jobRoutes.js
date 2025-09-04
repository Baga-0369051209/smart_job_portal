import express from "express";
import { createJob, getJobs } from "../controllers/jobController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticate, authorize("recruiter", "admin"), createJob);
router.get("/", getJobs);

export default router;
