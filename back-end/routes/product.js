import express from 'express';
const router = express.Router();
import {
	getAllProducts,
	getProductById,
	deleteProduct
} from '../controllers/productController.js';
import { secure, adminOnly } from '../middlewares/auth.js';

// all products related routes
router.route('/').get(getAllProducts);
router
	.route('/:id')
	.get(getProductById)
	.delete(secure, adminOnly, deleteProduct);

export default router;
