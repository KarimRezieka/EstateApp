import express from "express";
import {
  getPosts,
  getSpecificPost,
  createPost,
  updatePost,
  deletePost,
} from "../services/postService.js";
import { verifyToken } from "../middleware/verfiyToken.js";

const router = express.Router();

router.route("/").get(getPosts).post(verifyToken, createPost);
router
  .route("/:id")
  .get( getSpecificPost)
  .put(verifyToken, updatePost)
  .delete(verifyToken, deletePost);

export default router;
