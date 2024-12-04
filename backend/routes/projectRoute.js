import express from "express";
import { isAuthenticated } from "../middleWares/authentication.js";
import { addNewProject, deleteProject, getAllProject, getProject, updateProject } from "../controllers/projectController.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewProject)
router.delete("/delete/:id", isAuthenticated, deleteProject)
router.put("/update/:id", isAuthenticated, updateProject)
router.get("/get/:id", getProject)
router.get("/getall", getAllProject)

export default router;