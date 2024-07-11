import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../errors/validationMiddleware.js";
import { authorizePermission, checkForTestUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router = Router()

// Route to get current user information
router.get("/current-user", getCurrentUser)
// Route to get application statistics, accessible only to users with 'admin' role
router.get("/admin/app-stats", [authorizePermission("admin"), getApplicationStats])
// Route to update user information, validating input before updating
router.patch("/update-user", upload.single("avatar"), [checkForTestUser, validateUpdateUserInput], updateUser)

export default router
