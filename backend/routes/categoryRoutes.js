import express from "express";
import { authneticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import { createCategory, updateCategory, deleteCategory, getCategory, readCategory } from "../controllers/categoryControllers.js";

const router = express.Router();

// Admin routes
router.route("/").post(authneticate, authorizeAdmin, createCategory)
router.route("/:categoryId").put(authneticate, authorizeAdmin, updateCategory)
router.route("/:categoryId").delete(authneticate, authorizeAdmin, deleteCategory)

// Route for everyone
router.route("/categories").get(getCategory)
router.route("/:id").get(readCategory)

export default router