import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/Product.js';

/**
 * @desc    Fetch all products
 * @route   GET /api/products
 * @access  Public
 */
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const products = await Product.find({});

		return res.status(200).json(products);
	})
);

/**
 * @desc    Fetch a single product by id
 * @route   GET /api/products/:id
 * @access  Public
 */
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: 'Product cannot be found' });
		}

		return res.status(200).json(product);
	})
);

export default router;
