import { StatusCodes } from "http-status-codes"
import Job from "../models/JobModel.js"
import mongoose from "mongoose"
import day from 'dayjs'

// Controller to get all jobs
export const getAllJobs = async (req, res) => {
    const { search, jobStatus, jobType, sort } = req.query
    const queryObj = {
        createdBy: req.user.userId
    }
    if (search) {
        queryObj.$or = [
            { position: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } }
        ]
    }
    if (jobStatus && jobStatus !== 'all') {
        queryObj.jobStatus = jobStatus
    }
    if (jobType && jobType !== 'all') {
        queryObj.jobType = jobType
    }
    const sortOptions = {
        newest: "-createdAt",
        oldest: "createdAt",
        'a-z': 'position',
        'z-a': "-position",
    }
    const sortKey = sortOptions[sort] || sortOptions.newest
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    const skip = (page - 1) * limit
    const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit)
    const totalJobs = await Job.countDocuments(queryObj)
    const numOfPages = Math.ceil(totalJobs / limit)
    res.status(StatusCodes.OK).json({ totalJobs, numOfPages, currentPage: page, jobs })
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

export const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: "$jobStatus", count: { $sum: 1 } } }
    ])

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr
        acc[title] = count
        return acc
    }, {})

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }

    let monthlyApps = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id.year": -1, "_id.month": -1 } },
        { $limit: 6 }
    ])

    monthlyApps = monthlyApps.map(job => {
        const date = day(`${job._id.year}-${job._id.month}-01`)
        return {
            date: date.format('MMMM YY'),
            count: job.count
        }
    }).reverse()

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApps })
}