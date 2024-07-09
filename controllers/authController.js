import { StatusCodes } from "http-status-codes"
import User from "../models/UserModel.js"
import { comparePassword, hashPassword } from "../utils/passwordUtils.js"
import { UnauthenticatedError } from "../errors/customErrors.js"
import { createJWT } from "../utils/tokenUtils.js"

/**
 * Registers a new user.
 * - If it's the first user, they are assigned the "admin" role; otherwise, "user" role.
 * - The password is hashed before saving.
 * - A new user document is created and saved in the database.
 * - Returns a success message upon creation.
 */
export const register = async (req, res) => {
    const documentsCount = await User.countDocuments()
    req.body.role = documentsCount === 0 ? "admin" : "user"
    req.body.password = await hashPassword(req.body.password)
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ msg: "user created" })
}

/**
 * Logs in an existing user.
 * - Finds the user by email.
 * - Compares the provided password with the stored hashed password.
 * - Throws an error if credentials are invalid.
 * - Creates a JWT token upon successful authentication.
 * - Sets a cookie with the JWT token and returns a success message.
 */
export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const isPasswordCorrect = await comparePassword(req.body.password, user.password)
    if (!isPasswordCorrect) throw new UnauthenticatedError("invalid credentials")
    const token = createJWT({ userId: user._id, role: user.role })
    const oneDay = 1000 * 60 * 60 * 24
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production"
    })
    res.status(StatusCodes.OK).json({ msg: "user logged in" })
}