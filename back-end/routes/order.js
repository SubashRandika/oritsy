import express from 'express';
const router = express.Router();
import {
	createOrder,
	getAuthUserOrders,
	getOrderById,
	updateOrderToPaidStatus,
	updateOrderToDeliverStatus,
	getAllOrders
} from '../controllers/orderController.js';
import { adminOnly, secure } from '../middlewares/auth.js';

// all order related routes
router
	.route('/')
	.post(secure, createOrder)
	.get(secure, adminOnly, getAllOrders);
router.route('/self').get(secure, getAuthUserOrders);
router.route('/:id').get(secure, getOrderById);
router.route('/:id/pay').put(secure, updateOrderToPaidStatus);
router.route('/:id/deliver').put(secure, adminOnly, updateOrderToDeliverStatus);

export default router;
