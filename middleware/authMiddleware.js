import { UnathorizedError, UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
    const { token } = req.cookies
    if (!token) throw new UnauthenticatedError("authentication invalid")
    try {
        const { userId, role } = verifyJWT(token)
        req.user = { userId, role }
        next()
    } catch (error) {
        throw new UnauthenticatedError("authentication invalid")
    }
}

export const authorizePermission = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnathorizedError("unauthorize to access")
        }
        next()
    }
}