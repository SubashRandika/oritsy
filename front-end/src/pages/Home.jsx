import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillCloseCircle } from 'react-icons/ai';
import { fetchProducts } from '../redux/actions/productActions';
import { productsSelector } from '../redux/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader/Loader';
import Alert from '../components/Alert';

const Home = () => {
	const dispatch = useDispatch();
	const productsList = useSelector(productsSelector);
	const { products, loading, error } = productsList;

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return (
		<main className='container m-auto py-4 flex-grow'>
			<h1 className='text-2xl font-semibold'>Latest Products</h1>
			{loading ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader />
					<div className='text-lg text-gray-500 font-semibold'>Loading...</div>
				</div>
			) : error ? (
				<div className='flex mt-6'>
					<Alert
						type='error'
						header='Error Occurred'
						body='Something went wrong'
						icon={<AiFillCloseCircle />}
					/>
				</div>
			) : (
				<div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6'>
					{products?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
			)}
		</main>
	);
};

export default Home;
