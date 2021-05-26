import express from 'express';
const router = express.Router();
import { createOrder, getOrderById } from '../controllers/orderController.js';
import secure from '../middlewares/auth.js';

// all order related routes
router.route('/').post(secure, createOrder);
router.route('/:id').get(secure, getOrderById);

export default router;
