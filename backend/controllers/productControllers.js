import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


// Create a new Product by Admin
const addProducts = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields
        switch (true) {
            case !name:
                return res.json({ error: "Please enter a name" })

            case !description:
                return res.json({ error: "Please enter a description" })

            case !price:
                return res.json({ error: "Please enter a price" })

            case !category:
                return res.json({ error: "Please enter a category" })

            case !quantity:
                return res.json({ error: "Please enter a quantity" })

            case !brand:
                return res.json({ error: "Please enter a brand" })

        }

        const product = new Product({ ...req.fields })
        await product.save()
        res.json(product)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error p01" })
    }
})

// Update Product by id (Admin)
const updateProductDetails = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields
        switch (true) {
            case !name:
                return res.json({ error: "Please enter a name" })

            case !description:
                return res.json({ error: "Please enter a description" })

            case !price:
                return res.json({ error: "Please enter a price" })

            case !category:
                return res.json({ error: "Please enter a category" })

            case !quantity:
                return res.json({ error: "Please enter a quantity" })

            case !brand:
                return res.json({ error: "Please enter a brand" })
        }

        const product = await Product.findByIdAndUpdate(req.params.id, { ...req.fields }, { new: true })
        await product.save()
        res.json(product)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error p02" })
    }
})

// Delete a product by id (Admin)
const removeProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error p03" })
    }
})

// Fetch Product List
const fetchProducts = asyncHandler(async (req, res) => {
    try {
        const pageSize = 6
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: "i",
                },
            }
            : {}
        const count = await Product.countDocuments({ ...keyword })
        const products = await Product.find({ ...keyword }).limit(pageSize)

        res.json({
            products,
            page: 1,
            pages: Math.ceil(count / pageSize),
            hasMore: false
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error p04" })
    }
})

// Fetch Product by ID
const fetchProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404).json({ message: "Product not found" })
        } else {
            res.json(product)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error p05" })
    }
})

// Fetch all products 
const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).populate("category").limit(12).sort({ createdAt: -1 })
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error p06" })
    }
})

// Add a review to a product
const addProductReview = asyncHandler(async (req, res) => {
    try {
        const { rating, comment } = req.body
        const product = await Product.findById(req.params.id)

        if (product) {
            const alreadyReview = product.reviews.find((r) => r.user.toString() === req.user._id.toString())
            if (alreadyReview) {
                res.status(400).json({ message: "Review already added" })
            }
            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id
            }
            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
            await product.save()
            res.status(201).json({ message: "Review added" })
        } else {
            res.status(404)
            throw new Error("Product not found")
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error p07" })
    }
})

//Fetching the top products
const fetchTopProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(4)
        res.json(products)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error p08" })
    }
})

// Fetch the newly created products
const fetchNewProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({ _id: -1 }).limit(5)
        res.json(products)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error p09" })
    }
})

export {
    addProducts, updateProductDetails, removeProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReview,
    fetchTopProducts, fetchNewProducts
}