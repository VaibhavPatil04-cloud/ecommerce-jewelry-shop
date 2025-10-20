import express from 'express'
import {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  filterProducts,
  createProduct,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getAllProducts)
router.get('/search', searchProducts)
router.get('/filter', filterProducts)
router.get('/category/:category', getProductsByCategory)
router.get('/:id', getProductById)
router.post('/', protect, admin, createProduct)

export default router
