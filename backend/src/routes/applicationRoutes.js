import express from "express";
import multer from "multer";
import { applyJob, getApplications } from "../controllers/applicationController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", authenticate, authorize("user"), upload.single("resume"), applyJob);
router.get("/", authenticate, authorize("recruiter", "admin"), getApplications);

export default router;
