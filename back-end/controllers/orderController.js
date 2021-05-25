import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

/**
 * @desc    Place a new order
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('Order items not available');
	}

	const newOrder = new Order({
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice,
		user: req.user._id
	});

	const createdOrder = await newOrder.save();
	res.status(201).json(createdOrder);
});

export { createOrder };
