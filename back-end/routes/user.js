import express from 'express';
const router = express.Router();
import {
	userLogin,
	registerUser,
	getUserProfile
} from '../controllers/userController.js';
import secure from '../middlewares/auth.js';

// all auth and user related routes
router.route('/').post(registerUser);
router.route('/login').post(userLogin);
router.route('/profile').get(secure, getUserProfile);

export default router;
