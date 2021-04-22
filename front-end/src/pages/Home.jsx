import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../redux/actions/productActions';
import { productsSelector } from '../redux/slices/productsSlice';

const Home = () => {
	const dispatch = useDispatch();
	const productsList = useSelector(productsSelector);
	const { products, loading, error } = productsList;

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

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
