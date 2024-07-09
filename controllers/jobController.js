import { StatusCodes } from "http-status-codes"
import Job from "../models/JobModel.js"

// Controller to get all jobs
export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ jobs })
}

// Controller to create a new job
export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

// Controller to get a single job by ID
export const getJob = async (req, res) => {
    const { id } = req.params
    const job = await Job.findById(id)
    res.status(StatusCodes.OK).json({ job })
}

// Controller to update a job by ID
export const updateJob = async (req, res) => {
    const { id } = req.params
    // Find the job by ID and update it with the new data from the request body
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true })
    res.status(StatusCodes.OK).json({ msg: "job modified", job: updatedJob })
}

// Controller to delete a job by ID
export const deleteJob = async (req, res) => {
    const { id } = req.params
    const removedJob = await Job.findByIdAndDelete(id)
    res.status(StatusCodes.OK).json({ job: removedJob })
}