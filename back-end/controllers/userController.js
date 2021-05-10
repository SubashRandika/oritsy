import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

/**
 * @desc    user authenticate and login
 * @route   POST /api/users/login
 * @access  Public
 */
const userLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		res.status(401);
		throw new Error('Invalid email or password provided');
	}

	if (user.matchPassword(password)) {
		const { _id, name, email, isAdmin } = user;

		return res.status(200).json({
			_id,
			name,
			email,
			isAdmin,
			token: generateToken(_id)
		});
	}
});

export { userLogin };
