import express from "express";
import { isAuthenticated } from "../middleWares/authentication.js";
import {
  addNewTimeline,
  deleteTimeline,
  getAllTimeline,
} from "../controllers/timelineController.js";
const router = express.Router();

router.post("/add", isAuthenticated, addNewTimeline);
router.delete("/delete/:id", isAuthenticated, deleteTimeline);
router.get("/getall", getAllTimeline);

export default router;