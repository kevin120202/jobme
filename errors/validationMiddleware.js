import { body, param, validationResult } from "express-validator"
import { BadRequestError, NotFoundError, UnathorizedError, UnauthenticatedError } from "./customErrors.js"
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js"
import Job from "../models/JobModel.js"
import mongoose from "mongoose"
import User from "../models/UserModel.js"

/*
- Takes an array of validation rules and returns an array of middleware functions.
- First Middleware Function: Applies the validation rules to the request.
- Second Middleware Function: Checks for validation errors, maps them to error messages, and throws appropriate custom errors if any are found. Otherwise, it proceeds to the next middleware.
*/
const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg)
                if (errorMessages[0].startsWith("no job")) {
                    throw new NotFoundError(errorMessages)
                }
                if (errorMessages[0].startsWith("not authorized")) {
                    throw new UnathorizedError("not authorized to access this route")
                }
                throw new BadRequestError(errorMessages)
            }
            next()
        }
    ]
}

/*
- Uses withValidationErrors to apply validation rules for creating or updating a job.
- Ensures required fields (company, position, jobLocation) are not empty.
- Ensures jobStatus and jobType have valid values as defined in JOB_STATUS and JOB_TYPE.
*/
export const validateJobInput = withValidationErrors([
    body("company").notEmpty().withMessage("company is required"),
    body("position").notEmpty().withMessage("position is required"),
    body("jobLocation").notEmpty().withMessage("job location is required"),
    body("jobStatus").isIn(Object.values(JOB_STATUS)).withMessage("invalid status value"),
    body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid type value")
])

/*
- Uses withValidationErrors to validate the id parameter in request URLs.
- Ensures the id is a valid MongoDB ObjectId.
- Checks if a job with the given id exists in the database and throws appropriate errors if not.
*/
export const validateIdParams = withValidationErrors([
    param('id')
        .custom(async (value, { req }) => {
            const isValidId = mongoose.Types.ObjectId.isValid(value)
            if (!isValidId) throw new BadRequestError("invalid MongoDB id")
            const job = await Job.findById(value)
            if (!job) throw new NotFoundError(`no job with id ${value}`)
            const isAdmin = req.user.role === "admin"
            const isOwner = req.user.userId === job.createdBy.toString()
            if (!isAdmin && !isOwner) {
                throw new UnathorizedError("not authorized to access this route")
            }
        })
])

/*
- Uses withValidationErrors to apply validation rules for registering.
- Ensures required field are not empty and meets criteria.
*/
export const validateRegisterInput = withValidationErrors([
    body("name").notEmpty().withMessage("name is required"),
    body("email").notEmpty().withMessage("email is required").isEmail().withMessage("invalid email format").custom(async (email) => {
        const user = await User.findOne({ email })
        if (user) throw new BadRequestError('email already exists')
    }),
    body("password").notEmpty().withMessage("password is required").isLength({ min: 8 }).withMessage("password must be 8 characters long"),
    body("lastName").notEmpty().withMessage("last name is required"),
    body("location").notEmpty().withMessage("location is required"),
])

export const validateLoginInput = withValidationErrors([
    body("email").notEmpty().withMessage("email is required").isEmail().withMessage("invalid email format").custom(async (email) => {
        const user = await User.findOne({ email })
        if (!user) throw new UnauthenticatedError("invalid credentials")
    }),
    body("password").notEmpty().withMessage("password is required")
])

export const validateUpdateUserInput = withValidationErrors([
    body("name").notEmpty().withMessage("name is required"),
    body("email").notEmpty().withMessage("email is required").isEmail().withMessage("invalid email format").custom(async (email, { req }) => {
        const user = await User.findOne({ email })
        if (user && user._id.toString() !== req.user.userId) {
            throw new BadRequestError('email already exists')
        }
    }),
    body("lastName").notEmpty().withMessage("last name is required"),
    body("location").notEmpty().withMessage("location is required"),
])