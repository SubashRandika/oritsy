import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const secure = asyncHandler(async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		res.status(401);
		throw new Error('Not authorized, Must be provided authorization header');
	}

	if (authorization && authorization.startsWith('Bearer')) {
		const token = authorization.split('Bearer ')[1];

		if (!token) {
			res.status(401);
			throw new Error('Not authorized, Bearer token does not exist');
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (error) {
			console.error(`Token verification failed: ${error}`.brightRed.inverse);
			res.status(401);
			throw new Error('Not authorized, Token verification failed');
		}
	}
});

const adminOnly = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(403);
		throw new Error('You are not authorized to access. Sign in as admin');
	}
};

export { secure, adminOnly };
