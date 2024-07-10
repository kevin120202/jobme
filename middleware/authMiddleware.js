import { UnathorizedError, UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

/**
 * Middleware to authenticate a user.
 * - Checks for a JWT token in the request cookies.
 * - Throws an UnauthenticatedError if no token is found.
 * - Verifies the token using verifyJWT utility function.
 * - Sets req.user with userId and role extracted from the token.
 * This middleware ensures that incoming requests are from authenticated users
 * by validating their JWT token and setting the authenticated user's information
 * in the req.user object for use in subsequent middleware or routes.
 */
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

/**
 * Middleware to authorize user permissions based on roles.
 * - Takes a list of roles as arguments.
 * - Checks if req.user.role is included in the list of roles.
 * - Throws an UnathorizedError if req.user.role is not included.
 * This middleware checks if the authenticated user has the required role
 * to access the route or perform the action. If not, it throws an error,
 * preventing unauthorized access to protected routes.
 */
export const authorizePermission = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnathorizedError("unauthorize to access")
        }
        next()
    }
}