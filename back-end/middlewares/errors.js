const routeNotFount = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	return res.status(statusCode).json({
		message: err.message,
		stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack
	});
};

export { routeNotFount, errorHandler };
