import express from "express";
import { updateUserRole } from "../controllers/admin.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.patch(
  "/users/:userId/role",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateUserRole
);

export default router;