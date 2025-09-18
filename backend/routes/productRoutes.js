import express from "express"
import formidable from "express-formidable"
import {
    addProducts,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filteredProducts
} from "../controllers/productControllers.js"

const router = express.Router()

import { authneticate, authorizeAdmin } from "../middleware/authMiddleware.js"
import checkId from "../middleware/checkId.js"

router
    .route("/")
    .get(fetchProducts)
    .post(authneticate, authorizeAdmin, formidable(), addProducts)

router
    .route("/allProducts")
    .get(fetchAllProducts)

router
    .route("/new")
    .get(fetchNewProducts)

router
    .route("/:id/review").post(authneticate, addProductReview)

router
    .route("/top").get(fetchTopProducts)

router
    .route("/:id")
    .get(fetchProductById)
    .put(authneticate, authorizeAdmin, formidable(), updateProductDetails)
    .delete(authneticate, authorizeAdmin, removeProduct)

router.route('/filtered-products').post(filteredProducts)

export default router