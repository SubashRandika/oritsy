import express from 'express';
const router = express.Router();
import {
	getAllProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct
} from '../controllers/productController.js';
import { secure, adminOnly } from '../middlewares/auth.js';

// all products related routes
router.route('/').get(getAllProducts).post(secure, adminOnly, createProduct);
router
	.route('/:id')
	.put(secure, adminOnly, updateProduct)
	.get(getProductById)
	.delete(secure, adminOnly, deleteProduct);

export default router;
