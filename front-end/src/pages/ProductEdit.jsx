import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userLoginSlice';
import { fetchProductDetails } from '../redux/actions/productActions';
import { productDetailsSelector } from '../redux/slices/productDetailsSlice';
import Loader from '../components/Loader/Loader';

const ProductEdit = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id: productId } = useParams();
	const { loading, error, product } = useSelector(productDetailsSelector);
	const [productInfo, setProductInfo] = useState({
		name: '',
		price: 0,
		countInStock: 0,
		image: '',
		brand: '',
		category: '',
		description: ''
	});

	const handleOnChange = (e) => {
		setProductInfo({
			...productInfo,
			[e.target.name]: e.target.value
		});
	};

	useEffect(() => {
		if (error === 'Not authorized, Token verification failed') {
			dispatch(logout(history));
			return;
		}

		dispatch(fetchProductDetails(productId));

		setProductInfo({
			name: product?.name,
			price: product?.price,
			countInStock: product?.countInStock,
			image: product?.image,
			brand: product?.brand,
			category: product?.category,
			description: product?.description
		});
	}, [
		dispatch,
		error,
		history,
		product?.brand,
		product?.category,
		product?.countInStock,
		product?.description,
		product?.image,
		product?.name,
		product?.price,
		productId
	]);

	const handleUpdateProduct = (e) => {
		e.preventDefault();
        
	};

	return (
		<main className='container m-auto h-full my-6'>
			{loading ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader />
					<div className='text-lg text-gray-500 font-semibold'>Loading...</div>
				</div>
			) : (
				<div className='max-w-lg mx-auto my-6'>
					<h1 className='my-8 text-3xl text-center font-bold text-gray-700'>
						Update Product
					</h1>
					<div className='my-6'>
						<form onSubmit={handleUpdateProduct}>
							<div className='flex flex-col mb-6'>
								<label
									className='font-semibold text-sm text-gray-600 mb-2'
									htmlFor='name'
								>
									Name
								</label>
								<input
									className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
									type='text'
									name='name'
									placeholder='Enter name'
									value={productInfo?.name || ''}
									onChange={handleOnChange}
								/>
							</div>
							<div className='flex justify-between'>
								<div className='flex flex-col mb-6 mr-8'>
									<label
										className='font-semibold text-sm text-gray-600 mb-2'
										htmlFor='price'
									>
										Price ($)
									</label>
									<input
										className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
										type='number'
										name='price'
										min={0}
										placeholder='Enter Price'
										value={productInfo.price || 0}
										onChange={handleOnChange}
									/>
								</div>
								<div className='flex flex-col mb-6'>
									<label
										className='font-semibold text-sm text-gray-600 mb-2'
										htmlFor='countInStock'
									>
										Stock Count
									</label>
									<input
										className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
										type='number'
										name='countInStock'
										min={0}
										placeholder='Enter count'
										value={productInfo.countInStock || 0}
										onChange={handleOnChange}
									/>
								</div>
							</div>
							<div className='flex flex-col mb-6'>
								<label
									className='font-semibold text-sm text-gray-600 mb-2'
									htmlFor='image'
								>
									Image
								</label>
								<input
									className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
									type='text'
									name='image'
									placeholder='Enter image URL or path'
									value={productInfo.image || ''}
									onChange={handleOnChange}
								/>
							</div>
							<div className='flex flex-col mb-6'>
								<label
									className='font-semibold text-sm text-gray-600 mb-2'
									htmlFor='brand'
								>
									Brand
								</label>
								<input
									className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
									type='text'
									name='brand'
									placeholder='Enter brand'
									value={productInfo.brand || ''}
									onChange={handleOnChange}
								/>
							</div>
							<div className='flex flex-col mb-6'>
								<label
									className='font-semibold text-sm text-gray-600 mb-2'
									htmlFor='category'
								>
									Category
								</label>
								<input
									className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
									type='text'
									name='category'
									placeholder='Enter category'
									value={productInfo.category || ''}
									onChange={handleOnChange}
								/>
							</div>
							<div className='flex flex-col mb-6'>
								<label
									className='font-semibold text-sm text-gray-600 mb-2'
									htmlFor='description'
								>
									Description
								</label>
								<textarea
									className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
									name='description'
									rows={3}
									placeholder='Enter description'
									value={productInfo.description || ''}
									onChange={handleOnChange}
								/>
							</div>
							<div className='my-10 flex justify-center'>
								<button
									className='w-60 bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white text-lg font-semibold px-6 py-2 shadow-md hover:shadow-lg transition duration-300 ease-in-out'
									type='submit'
								>
									Update
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</main>
	);
};

export default ProductEdit;
