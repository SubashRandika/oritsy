import express from 'express';
const router = express.Router();
import { userLogin } from '../controllers/userController.js';

// all auth and user related routes
router.post('/login', userLogin);

export default router;
