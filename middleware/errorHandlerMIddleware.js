import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    const statusCode = err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const message = err.message || "something went wrong"
    res.status(statusCode).json({ message })
}

export default errorHandlerMiddleware