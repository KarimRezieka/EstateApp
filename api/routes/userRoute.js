import express from "express";
import {
  createUser,
  deleteUser,
  getSpecificUser,
  getUsers,
  updateUser,
} from "../services/userService.js";
import { verifyToken } from "../middleware/verfiyToken.js";

const router = express.Router();

router.route("/").get(verifyToken, getUsers).post(verifyToken, createUser);
router
  .route("/:id")
  .get(verifyToken, getSpecificUser)
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);

export default router;
