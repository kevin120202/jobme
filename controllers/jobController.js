import { StatusCodes } from "http-status-codes"
import Job from "../models/JobModel.js"
import { NotFoundError } from "../errors/customErrors.js"

// Controller to get all jobs
export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({})
    res.status(StatusCodes.OK).json({ jobs })
}

// Controller to create a new job
export const createJob = async (req, res) => {
    const { company, position } = req.body
    const job = await Job.create({ company, position })
    res.status(StatusCodes.CREATED).json({ job })
}

// Controller to get a single job by ID
export const getJob = async (req, res) => {
    const { id } = req.params
    const job = await Job.findById(id)
    if (!job) throw new NotFoundError(`no job with id ${id}`)
    res.status(StatusCodes.OK).json({ job })
}

// Controller to update a job by ID
export const updateJob = async (req, res) => {
    const { id } = req.params
    // Find the job by ID and update it with the new data from the request body
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true })
    if (!updatedJob) throw new NotFoundError(`no job with id ${id}`)
    res.status(StatusCodes.OK).json({ msg: "job modified", job: updatedJob })
}

// Controller to delete a job by ID
export const deleteJob = async (req, res) => {
    const { id } = req.params
    const removedJob = await Job.findByIdAndDelete(id)
    if (!removedJob) throw new NotFoundError(`no job with id ${id}`)
    res.status(StatusCodes.OK).json({ job: removedJob })
}