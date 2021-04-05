const express = require('express');
const products = require('../back-end/data/products');

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

app.listen(5000, () => console.log('Server listening on port 5000'));
