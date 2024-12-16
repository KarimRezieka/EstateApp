import express from "express";
import {
  getChats,
  getChat,
  addChat,
  readChat,
} from "../services/chatService.js";
import { verifyToken } from "../middleware/verfiyToken.js";
const router = express.Router();

router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);
router.post("/", verifyToken, addChat);
router.put("/read/:id", verifyToken, readChat);

export default router;
