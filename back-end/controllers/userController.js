import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

/**
 * @desc    User authenticate and login
 * @route   POST /api/users/login
 * @access  Public
 */
const userLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		res.status(401);
		throw new Error('Invalid email provided');
	}

	if (await user.matchPassword(password)) {
		const { _id, name, email, isAdmin } = user;

		return res.status(200).json({
			_id,
			name,
			email,
			isAdmin,
			token: generateToken(_id)
		});
	} else {
		res.status(401);
		throw new Error('Invalid password provided');
	}
});

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const existingUser = await User.findOne({ email });

	if (existingUser) {
		res.status(400);
		throw new Error('User already registered with this email');
	}

	const user = await User.create({
		name,
		email,
		password
	});

	if (user) {
		const { _id, name, email, isAdmin } = user;

		res.status(201).json({
			_id,
			name,
			email,
			isAdmin,
			token: generateToken(_id)
		});
	} else {
		res.status(400);
		throw new Error('Incorrect user details provided');
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

/**
 * @desc    Update user profile details
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = async (req, res) => {
	const user = await User.findById(req.user._id);

	if (!user) {
		res.status(404);
		throw new Error('User cannot be found');
	}

	user.name = req.body.name || user.name;
	user.email = req.body.email || user.email;

	if (req.body.password) {
		user.password = req.body.password;
	}

	const updatedUser = await user.save();
	const { _id, name, email, isAdmin } = updatedUser;

	res.status(200).json({
		_id,
		name,
		email,
		isAdmin,
		token: generateToken(_id)
	});
};

export { userLogin, registerUser, getUserProfile, updateUserProfile };
