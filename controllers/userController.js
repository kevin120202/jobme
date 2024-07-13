import { StatusCodes } from "http-status-codes"
import User from "../models/UserModel.js"
import Job from "../models/JobModel.js"
import cloudinary from 'cloudinary';
import { formatImage } from "../middleware/multerMiddleware.js";

/**
 * Fetches the current user's details.
 * - Finds the user by their ID from the request object (set by authentication middleware).
 * - Converts the user object to JSON, excluding sensitive fields like the password.
 * - Returns the user details in the response.
 * This function allows the authenticated user to retrieve their profile information.
 */
export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId })
    const userWithoutPassword = user.toJSON()
    res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}

/**
 * Fetches statistics about the application.
 * - Counts the total number of users in the database.
 * - Counts the total number of jobs in the database.
 * This function provides administrative insights into the number of users and jobs in the system.
 */
export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments()
    res.status(StatusCodes.OK).json({ users, jobs })
}

/**
 * Updates the current user's profile information.
 * - Excludes the password from the update to prevent unintended changes.
 * - Finds the user by their ID and updates their details with the provided data.
 * This function allows the authenticated user to update their profile information, excluding their password.
 */
export const updateUser = async (req, res) => {
    let newUser = { ...req.body }
    delete newUser.password

    if (req.file) {
        const file = formatImage(req.file)
        const response = await cloudinary.v2.uploader.upload(file)
        newUser.avatar = response.secure_url
        newUser.avatarPublicId = response.public_id
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser)

    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }
    res.status(StatusCodes.OK).json({ msg: "update user" })
}