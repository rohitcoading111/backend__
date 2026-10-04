import express from "express";
import { updateUserRole } from "../controllers/admin.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { roleValidation } from "../validators/admin.validator.js";

const router = express.Router();

router.patch(
  "/users/:userId/role",
  authMiddleware,
  roleMiddleware("ADMIN"),
  roleValidation,
  updateUserRole
);

export default router;