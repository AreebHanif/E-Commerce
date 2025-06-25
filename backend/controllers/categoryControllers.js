import asyncHandler from 'express-async-handler';
import Category from "../models/categoryModel.js";

// For creating category(Admin)
const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.json({ error: "name is required" })
        }
        const existingCategory = await Category.findOne({ name })
        if (existingCategory) {
            return res.json({ error: "Already Exist" })
        }
        const category = await new Category({ name }).save();
        res.json(category)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Internal Server Error C01" })
    }
})

// For Updating category(Admin)
const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body
        const { categoryId } = req.params
        const category = await Category.findOne({ _id: categoryId })
        if (!category) {
            return res.status(404).json({ error: "Category not found" })
        }
        category.name = name
        const updatedCategory = await category.save()
        res.json(updatedCategory)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error C02" })
    }
})

// For deleting category(Admin)
const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId)
        res.json(removed)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error C03" })
    }
})

// For getting list of categories
const getCategory = asyncHandler(async (req, res) => {
    try {
        const getCategory = await Category.find({})
        res.json(getCategory)
    } catch (error) {
        console.log(error)
        res.json({ error: "Internal Server Error C03" })
    }
})

// For getting single category by id
const readCategory = asyncHandler(async (req, res) => {
    try {
        const _id = req.params.id
        const category = await Category.findById(_id)
        if (!category) {
            return res.status(404).json({ error: "Category not found" })
        }
        return res.status(200).json(category)
    } catch (error) {
        console.log(error)
        res.json("Internal server error C05", error.message)
    }
})

export { createCategory, updateCategory, deleteCategory, getCategory, readCategory }