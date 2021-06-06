import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchProducts,
	getTopRatedProducts
} from '../redux/actions/productActions';
import { productsSelector } from '../redux/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader/Loader';
import Pagination from '../components/Pagination';
import TopProductsCarousel from '../components/TopProductsCarousel';
import { productsTopSelector } from '../redux/slices/productsTopSlice';

const Home = () => {
	const dispatch = useDispatch();
	const { products, loading, page, pages } = useSelector(productsSelector);
	const { products: topProducts, loading: loadingTop } =
		useSelector(productsTopSelector);
	const { keyword, pageNumber } = useParams();

	useEffect(() => {
		dispatch(getTopRatedProducts());
		dispatch(
			fetchProducts({ keyword: keyword || '', pageNumber: pageNumber || 1 })
		);
	}, [dispatch, keyword, pageNumber]);

	return (
		<main className='container m-auto py-3 flex-grow'>
			{loading && loadingTop ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader />
					<div className='text-lg text-gray-500 font-semibold'>Loading...</div>
				</div>
			) : (
				<>
					{!keyword && <TopProductsCarousel products={topProducts} />}
					<div className='flex flex-col'>
						<div className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5'>
							{products?.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
						</div>
						<Pagination
							loading={loading}
							page={page}
							pages={pages}
							keyword={keyword ? keyword : ''}
						/>
					</div>
				</>
			)}
		</main>
	);
};

export default Home;
