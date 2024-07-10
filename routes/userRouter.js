import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../errors/validationMiddleware.js";
import { authorizePermission } from "../middleware/authMiddleware.js";
const router = Router()

// Route to get current user information
router.get("/current-user", getCurrentUser)
// Route to get application statistics, accessible only to users with 'admin' role
router.get("/admin/app-stats", [authorizePermission("admin"), getApplicationStats])
// Route to update user information, validating input before updating
router.get("/update-user", validateUpdateUserInput, updateUser)

export default router
