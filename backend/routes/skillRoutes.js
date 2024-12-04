import express from "express";
import { isAuthenticated } from "../middleWares/authentication.js";
import { addNewSkill, deleteSkill, getAllSkills, updateSkill } from "../controllers/skillController.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewSkill);
router.put("/update/:id", isAuthenticated, updateSkill);
router.delete("/delete/:id", isAuthenticated, deleteSkill);
router.get("/getall", getAllSkills);

export default router;
