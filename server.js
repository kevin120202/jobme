import "express-async-errors"
import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express()
// If the app is in development mode, use the morgan middleware for logging
import morgan from "morgan"
import mongoose from "mongoose"
import { StatusCodes } from "http-status-codes"

// routers
import jobRouter from "./routes/jobRouter.js"

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMIddleware.js"

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Use the express.json middleware to parse JSON bodies
app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello")
})

app.post("/", (req, res) => {
    console.log(req);
    res.json({ message: "receieved", data: req.body })
})

// Use the jobRouter for routes starting with /api/v1/jobs
app.use("/api/v1/jobs", jobRouter)

// Handle all other routes that are not defined and send a 404 response
app.use("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "not found" })
})

// Error handling middleware
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100

try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`server running on PORT ${port}`);
    })
} catch (error) {
    console.log(error);
    process.exit(1)
}

