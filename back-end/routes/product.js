import express from 'express';
const router = express.Router();
import {
	getAllProducts,
	getProductById
} from '../controllers/productController.js';

// all products related routes
router.route('/').get(getAllProducts);
router.route('/:id').get(getProductById);

export default router;
