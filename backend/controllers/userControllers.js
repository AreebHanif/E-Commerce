import bcrypt from "bcryptjs"

import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js"
import createToken from "../utils/createToken.js"

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new Error("Please Fill all the inputs field")
    }

    const userExist = await User.findOne({ email })

    if (userExist) return res.status(400).send("User already exists.")
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password, salt)
    let newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        createToken(res, newUser._id)
        return res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        })
    } catch (error) {
        res.status(400)
        throw new Error("Invalid User Data.")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("Please Fill all the inputs field")
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        const ispasswordMatch = await bcrypt.compare(password, existingUser.password)
        if (ispasswordMatch) {
            createToken(res, existingUser._id)
            return res.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            })
        } else {
            res.status(401)
            throw new Error("Invalid Email or Password")
        }
    } else {
        res.status(400)
        throw new Error("Email or password is invalid")
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("areebjwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: "Logged out successfully" })
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hashedPassword
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
        })
    } else {
        res.status(404)
        throw new Error("User not found.")
    }
})

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        if (user.isAdmin) {
            res.status(400)
            throw new Error("You can't delete an admin.")
        }
        await user.deleteOne({ _id: user._id })
        res.status(200).json({ message: "User Deleted." })
    }
    else {
        res.status(404)
        throw new Error("User not found.")
    }
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
  
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

export {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    updateUserById,
    getUserById,
}