import { StatusCodes } from "http-status-codes"
import User from "../models/UserModel.js"
import { comparePassword, hashPassword } from "../utils/passwordUtils.js"
import { UnauthenticatedError } from "../errors/customErrors.js"
import { createJWT } from "../utils/tokenUtils.js"

export const register = async (req, res) => {
    const documentsCount = await User.countDocuments()
    req.body.role = documentsCount === 0 ? "admin" : "user"
    req.body.password = await hashPassword(req.body.password)
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ msg: "user created" })
}

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