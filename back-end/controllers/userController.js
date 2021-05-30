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

/**
 * @desc    Get all users. Only for admin
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getAllUsers = async (req, res) => {
	const users = await User.find({});

	res.status(200).json(users);
};

/**
 * @desc    Delete a user. Only for admin
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
const deleteUser = async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		res.status(404);
		throw new Error('User cannot be found');
	}

	await user.remove();
	res.status(200).json({ message: 'User successfully deleted' });
};

/**
 * @desc    Get any user by id. Only for admin
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
const getUserById = async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');

	if (!user) {
		res.status(404);
		throw new Error('User cannot be found');
	}

	res.status(200).json(user);
};

/**
 * @desc    Update any user by id. Only for admin
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
const updateUser = async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		res.status(404);
		throw new Error('User cannot be found');
	}

	user.name = req.body.name || user.name;
	user.email = req.body.email || user.email;
	user.isAdmin = req.body.isAdmin;

	const updatedUser = await user.save();
	const { _id, name, email, isAdmin } = updatedUser;

	res.status(200).json({
		_id,
		name,
		email,
		isAdmin
	});
};

export {
	userLogin,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getAllUsers,
	deleteUser,
	getUserById,
	updateUser
};
