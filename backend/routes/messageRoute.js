import express from "express";
import { deleteMessage, getAllMessages, sendMessage } from "../controllers/messageController.js";
import { isAuthenticated } from "../middleWares/authentication.js";
const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", getAllMessages);
router.delete("/delete/:messageId", isAuthenticated, deleteMessage);

export default router;
