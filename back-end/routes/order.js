import express from 'express';
const router = express.Router();
import { createOrder } from '../controllers/orderController.js';
import secure from '../middlewares/auth.js';

// all order related routes
router.route('/').post(secure, createOrder);

export default router;
