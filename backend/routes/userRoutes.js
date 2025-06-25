import express from "express"
import {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    updateUserById,
    getUserById
} from "../controllers/userControllers.js"

import {
    authneticate,
    authorizeAdmin
} from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/')
.post(createUser)
.get(authneticate, authorizeAdmin, getAllUsers)

router.post('/auth', loginUser)
router.post('/logout', logoutUser)
router.route('/profile')
.get(authneticate, getCurrentUserProfile)
.put(authneticate, updateCurrentUserProfile)

// Admins Routes
router.route("/:id")
.delete(authneticate, authorizeAdmin, deleteUserById)
.put(authneticate, authorizeAdmin, updateUserById)
.get(authneticate, authorizeAdmin, getUserById);

export default router