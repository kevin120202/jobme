import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../errors/validationMiddleware.js";
const router = Router()

// Route for user registration
// This route uses the POST method to handle user registration
// It first validates the registration input using the validateRegisterInput middleware
// If the input is valid, it calls the register controller function to create a new user
// POST /api/v1/jobs/register - Register
router.post("/register", validateRegisterInput, register)

// Route for user login
// This route uses the POST method to handle user login
// It first validates the login input using the validateLoginInput middleware
// It directly calls the login controller function to authenticate the user
// POST /api/v1/jobs/login - Login
router.post("/login", validateLoginInput, login)

export default router