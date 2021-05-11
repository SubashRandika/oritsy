import express from 'express';
const router = express.Router();
import { userLogin, getUserProfile } from '../controllers/userController.js';
import secure from '../middlewares/auth.js';

// all auth and user related routes
router.post('/login', userLogin);
router.route('/profile').get(secure, getUserProfile);

export default router;
