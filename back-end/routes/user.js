import express from 'express';
const router = express.Router();
import {
	userLogin,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getAllUsers,
	deleteUser
} from '../controllers/userController.js';
import { secure, adminOnly } from '../middlewares/auth.js';

// all auth and user related routes
router.route('/').post(registerUser).get(secure, adminOnly, getAllUsers);
router.route('/login').post(userLogin);
router
	.route('/profile')
	.get(secure, getUserProfile)
	.put(secure, updateUserProfile);
router.route('/:id').delete(secure, adminOnly, deleteUser);

export default router;
