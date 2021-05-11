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

/**
 * @desc    Get login user profile details
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = async (req, res) => {
	const user = await User.findById(req.user._id);

	if (!user) {
		res.status(404);
		throw new Error('User cannot be found');
	}

	const { _id, name, email, isAdmin } = user;

	res.status(200).json({
		_id,
		name,
		email,
		isAdmin
	});
};

export { userLogin, getUserProfile };
