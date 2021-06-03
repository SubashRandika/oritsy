import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import path from 'path';
import morgan from 'morgan';
import connectDB from '../back-end/config/database.js';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';
import uploadRoutes from './routes/upload.js';
import { routeNotFount, errorHandler } from './middlewares/errors.js';

colors.setTheme({
	info: ['brightYellow', 'bold'],
	success: ['brightCyan', 'bold', 'underline'],
	error: ['brightRed', 'bold', 'underline']
});

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

app.get('/health', (req, res) => {
	return res.status(200).json({
		status: 'OK',
		message: 'API is running'
	});
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
});

// This is because es6 modules not supported __dirname like common js way.
// This way you can use __dirname with es6 modules.
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(routeNotFount);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(
		`Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`.info
	)
);
