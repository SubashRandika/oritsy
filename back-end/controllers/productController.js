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

/**
 * @desc    Delete a single product by id. Only for admin.
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error('Product cannot be found');
	}

	await product.remove();

	res.status(200).json({ message: 'Product was successfully deleted' });
});

/**
 * @desc    Create a dummy product. Only for admin.
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Dummy Product',
		description: 'Dummy Product description',
		image:
			'https://www.gemkom.com.tr/wp-content/uploads/2020/02/NO_IMG_600x600-1.png',
		brand: 'Dummy brand',
		price: 0,
		category: 'Dummy category',
		countInStock: 0,
		numReviews: 0,
		user: req.user._id
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

/**
 * @desc    Update existing product. Only for admin.
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
	const { name, description, image, price, brand, category, countInStock } =
		req.body;

	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error('Product cannot be found');
	}

	product.name = name;
	product.description = description;
	product.image = image;
	product.price = price;
	product.brand = brand;
	product.category = category;
	product.countInStock = countInStock;

	const updateProduct = await product.save();
	res.status(200).json(updateProduct);
});

export {
	getAllProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct
};
