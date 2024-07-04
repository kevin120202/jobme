import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express()
import morgan from "morgan"
import { nanoid } from "nanoid"

let jobs = [
    { id: nanoid(), company: "google", position: "swe" },
    { id: nanoid(), company: "apple", position: "manager" }
]

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello")
})

app.post("/", (req, res) => {
    console.log(req);
    res.json({ message: "receieved", data: req.body })
})

// GET ALL JOBS
app.get("/api/v1/jobs", (req, res) => {
    res.status(200).json({ jobs })
})

// CREATE A JOB
app.post("/api/v1/jobs", (req, res) => {
    const { company, position } = req.body
    if (!company || !position) {
        return res.status(404).json({ msg: "please provide all information" })
    }
    const id = nanoid(10)
    const job = { id, company, position }
    jobs.push(job)
    res.status(200).json({ jobs })
})

const port = process.env.PORT || 5100

app.listen(port, () => {
    console.log(`server running on ${port}`);
})