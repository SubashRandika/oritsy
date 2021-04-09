import express from 'express';
import dotenv from 'dotenv';
import products from '../back-end/data/products.js';

dotenv.config();

const app = express();

app.get('/health', (req, res) => {
	return res.status(200).json({
		status: 'OK',
		message: 'API is running'
	});
});

app.get('/api/products', (req, res) => {
	return res.status(200).json(products);
});

app.get('/api/products/:id', (req, res) => {
	const product = products.find((product) => product._id === req.params.id);
	return res.status(200).json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(
		`Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`
	)
);
