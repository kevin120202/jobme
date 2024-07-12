import { Router } from "express";
import { createJob, deleteJob, getAllJobs, getJob, showStats, updateJob } from "../controllers/jobController.js";
import { validateIdParams, validateJobInput } from "../errors/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";
const router = Router()

// Define a route for getting all jobs and creating a new job
// GET /api/v1/jobs - Fetch all jobs
// POST /api/v1/jobs - Create a new job
router.route("/").get(getAllJobs).post(checkForTestUser, validateJobInput, createJob)

// GET /api/v1/jobs/stats
router.route("/stats").get(showStats)

// Define a route for getting, updating, and deleting a job by ID
// GET /api/v1/jobs/:id - Fetch a single job by its ID
// PATCH /api/v1/jobs/:id - Update a job by its ID
// DELETE /api/v1/jobs/:id - Delete a job by its ID
router.route("/:id").get(validateIdParams, getJob).patch(checkForTestUser, validateJobInput, validateIdParams, updateJob).delete(checkForTestUser, validateIdParams, deleteJob)

export default router