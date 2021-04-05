import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const getAllProducts = async () => {
			const { data } = await axios.get('/api/products');
			setProducts(data);
		};

		getAllProducts();
	}, []);

	return (
		<main className='container m-auto py-4'>
			<h1 className='text-2xl font-semibold'>Latest Products</h1>
			<div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
				{products.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</main>
	);
};

export default Home;
