import express from 'express';
const router = express.Router();
import {
	userLogin,
	registerUser,
	getUserProfile,
	updateUserProfile
} from '../controllers/userController.js';
import secure from '../middlewares/auth.js';

// all auth and user related routes
router.route('/').post(registerUser);
router.route('/login').post(userLogin);
router
	.route('/profile')
	.get(secure, getUserProfile)
	.put(secure, updateUserProfile);

export default router;
