import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import { productsSelector } from '../redux/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader/Loader';
import Pagination from '../components/Pagination';

const Home = () => {
	const dispatch = useDispatch();
	const { products, loading, page, pages } = useSelector(productsSelector);
	const { keyword, pageNumber } = useParams();

	useEffect(() => {
		dispatch(
			fetchProducts({ keyword: keyword || '', pageNumber: pageNumber || 1 })
		);
	}, [dispatch, keyword, pageNumber]);

	return (
		<main className='container m-auto py-3 flex-grow'>
			<h1 className='text-2xl font-semibold'>Latest Products</h1>
			{loading ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader />
					<div className='text-lg text-gray-500 font-semibold'>Loading...</div>
				</div>
			) : (
				<div className='flex flex-col'>
					<div className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5'>
						{products?.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
					<Pagination
						page={page}
						pages={pages}
						keyword={keyword ? keyword : ''}
					/>
				</div>
			)}
		</main>
	);
};

export default Home;
