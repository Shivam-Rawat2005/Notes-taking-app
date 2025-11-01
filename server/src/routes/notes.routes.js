import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  toggleComplete, // ✅ import the new controller
} from "../controllers/notescontroller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ All routes require login
router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getNotes);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

// ✅ New route to toggle completed / strike-through
router.patch("/toggle/:id", authMiddleware, toggleComplete);

export default router;
