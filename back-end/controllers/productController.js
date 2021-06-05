import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

/**
 * @desc    Fetch all products
 * @route   GET /api/products
 * @access  Public
 */
const getAllProducts = asyncHandler(async (req, res) => {
	const pageSize = 8;
	const page = Number(req.query.pageNumber) || 1;
	const query = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i'
				}
		  }
		: {};

	const count = await Product.countDocuments({ ...query });
	const products = await Product.find({ ...query })
		.sort({ createdAt: -1 })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
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

	product.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

/**
 * @desc    Create a product review by product id.
 * @route   POST /api/products/:id/reviews
 * @access  Private
 */
const reviewProduct = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error('Product cannot be found');
	}

	const isProductReviewByUser = product.reviews.find(
		(review) => review.user.toString() === req.user._id.toString()
	);

	if (isProductReviewByUser) {
		res.status(400);
		throw new Error('Product is already reviewed by the user');
	}

	const review = {
		name: req.user.name,
		rating: Number(rating),
		comment,
		user: req.user._id
	};

	product.reviews.push(review);
	product.numReviews = product.reviews.length;
	product.rating =
		product.reviews.reduce(
			(currReviewSum, currReview) => currReviewSum + currReview.rating,
			0
		) / product.reviews.length;

	await product.save();
	res.status(201).json({ message: 'Review successfully added to the product' });
});

export {
	getAllProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	reviewProduct
};
