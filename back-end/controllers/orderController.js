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

/**
 * @desc    Get a order by its id
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);

	if (!order) {
		res.status(404);
		throw new Error('Order does not exist');
	}

	res.status(200).json(order);
});

/**
 * @desc    Update order to paid status
 * @route   PUT /api/orders/:id/pay
 * @access  Private
 */
const updateOrderToPaidStatus = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		res.status(404);
		throw new Error('Order does not exist');
	}

	order.isPaid = true;
	order.paidAt = Date.now();
	order.paymentResult = {
		id: req.body.id,
		status: req.body.status,
		updatedTime: req.body.update_time,
		emailAddress: req.body.email_address
	};

	const updatedOrder = await order.save();

	res.status(200).json(updatedOrder);
});

/**
 * @desc    Update order to delivered status. Only for admin.
 * @route   PUT /api/orders/:id/deliver
 * @access  Private/Admin
 */
const updateOrderToDeliverStatus = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		res.status(404);
		throw new Error('Order does not exist');
	}

	order.isDelivered = true;
	order.deliveredAt = Date.now();

	const updatedOrder = await order.save();

	res.status(200).json(updatedOrder);
});

/**
 * @desc    Get authenticated user orders
 * @route   GET /api/orders/self
 * @access  Private
 */
const getAuthUserOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });

	res.status(200).json(orders);
});

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
const getAllOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name');

	res.status(200).json(orders);
});

export {
	createOrder,
	getOrderById,
	updateOrderToPaidStatus,
	updateOrderToDeliverStatus,
	getAuthUserOrders,
	getAllOrders
};
