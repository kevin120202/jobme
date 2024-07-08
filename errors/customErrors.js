import { StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = "NotFoundError"
        this.StatusCode = StatusCodes.NOT_FOUND
    }
}

export class BadRequestError extends Error {
    constructor(message) {
        super(message)
        this.name = "BadRequestError"
        this.StatusCode = StatusCodes.BAD_REQUEST
    }
}

export class UnauthenticatedError extends Error {
    constructor(message) {
        super(message)
        this.name = "UnauthenticatedError"
        this.StatusCode = StatusCodes.UNAUTHORIZED
    }
}

export class UnathorizedError extends Error {
    constructor(message) {
        super(message)
        this.name = "UnathorizedError"
        this.StatusCode = StatusCodes.FORBIDDEN
    }
}