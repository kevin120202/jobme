import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../errors/validationMiddleware.js";
import { authorizePermission } from "../middleware/authMiddleware.js";
const router = Router()

router.get("/current-user", getCurrentUser)
router.get("/admin/app-stats", [authorizePermission("admin"), getApplicationStats])
router.get("/update-user", validateUpdateUserInput, updateUser)

export default router
