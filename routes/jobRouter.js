import { Router } from "express";
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from "../controllers/jobController.js";
import { validateJobInput } from "../errors/validationMiddleware.js";
const router = Router()

// Define a route for getting all jobs and creating a new job
// GET /api/v1/jobs - Fetch all jobs
// POST /api/v1/jobs - Create a new job
router.route("/").get(getAllJobs).post(validateJobInput, createJob)

// Define a route for getting, updating, and deleting a job by ID
// GET /api/v1/jobs/:id - Fetch a single job by its ID
// PATCH /api/v1/jobs/:id - Update a job by its ID
// DELETE /api/v1/jobs/:id - Delete a job by its ID
router.route("/:id").get(getJob).patch(validateJobInput, updateJob).delete(deleteJob)

export default router