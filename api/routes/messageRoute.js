import express from "express";
import { addMessage } from "../services/messageService.js";
import { verifyToken } from "../middleware/verfiyToken.js";

const router = express.Router();

router.post("/:chatId", verifyToken, addMessage);

export default router;
