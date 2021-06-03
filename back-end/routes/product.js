import express from 'express';
const router = express.Router();
import {
	getAllProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	reviewProduct
} from '../controllers/productController.js';
import { secure, adminOnly } from '../middlewares/auth.js';

// all products related routes
router.route('/').get(getAllProducts).post(secure, adminOnly, createProduct);
router
	.route('/:id')
	.put(secure, adminOnly, updateProduct)
	.get(getProductById)
	.delete(secure, adminOnly, deleteProduct);
router.route('/:id/reviews').post(secure, reviewProduct);

export default router;
