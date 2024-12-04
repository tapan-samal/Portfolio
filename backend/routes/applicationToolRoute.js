import express from "express";
import { isAuthenticated } from "../middleWares/authentication.js";
import {
  addApplicationTool,
  deleteApplicationTool,
  getAllApplicationTool,
} from "../controllers/applicationToolController.js";

const router = express.Router();

router.post("/add", isAuthenticated, addApplicationTool);
router.delete("/delete/:id", isAuthenticated, deleteApplicationTool);
router.get("/getall", getAllApplicationTool);

export default router;
