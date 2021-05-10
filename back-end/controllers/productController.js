import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

/**
 * @desc    Fetch all products
 * @route   GET /api/products
 * @access  Public
 */
const getAllProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});

	res.status(200).json(products);
});

/**
 * @desc    Fetch a single product by id
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error('Product cannot be found');
	}

	res.status(200).json(product);
});

export { getAllProducts, getProductById };
