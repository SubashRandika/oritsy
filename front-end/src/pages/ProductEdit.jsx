import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiUpload } from 'react-icons/fi';
import axios from 'axios';
import { logout } from '../redux/slices/userLoginSlice';
import {
	fetchProductDetails,
	updateProduct
} from '../redux/actions/productActions';
import { productDetailsSelector } from '../redux/slices/productDetailsSlice';
import {
	productUpdateSelector,
	resetProductUpdate
} from '../redux/slices/productUpdateSlice';
import Loader from '../components/Loader/Loader';
import MetaInfo from '../components/MetaInfo';

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
	const { loading: isUpdating, success: updateSuccess } = useSelector(
		productUpdateSelector
	);
	const [uploading, setUploading] = useState(false);

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

		if (updateSuccess) {
			dispatch(resetProductUpdate());
			history.push('/admin/product-list');
		} else {
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
		}
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
		productId,
		updateSuccess
	]);

	const handleUpdateProduct = (e) => {
		e.preventDefault();

		dispatch(
			updateProduct({
				_id: productId,
				name: productInfo?.name,
				price: productInfo?.price,
				countInStock: productInfo?.countInStock,
				image: productInfo?.image,
				brand: productInfo?.brand,
				category: productInfo?.category,
				description: productInfo?.description
			})
		);
	};

	const handleFileUpload = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();

		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				'Content-Type': 'multipart/form-data'
			};

			const { data } = await axios.post('/api/upload', formData, config);

			setProductInfo({
				...productInfo,
				image: data
			});
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	return (
		<main className='container m-auto h-full my-6'>
			{loading ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader />
					<div className='text-lg text-gray-500 font-semibold'>Loading...</div>
				</div>
			) : (
				<>
					<MetaInfo title='Oritsy | Admin | Update Product' />
					<div className='max-w-xl mx-auto my-6'>
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
											step='.01'
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
									<div className='flex items-center'>
										<input
											className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500 mr-4'
											type='text'
											name='image'
											placeholder='Enter image URL or path'
											value={productInfo.image || ''}
											onChange={handleOnChange}
										/>
										<label className='w-44 bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white text-md flex items-center justify-around font-semibold px-6 py-2 shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer'>
											{uploading ? (
												<div className='flex justify-center items-center'>
													<svg
														className='animate-spin h-5 w-5 text-white mr-3'
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
													>
														<circle
															className='opacity-25'
															cx='12'
															cy='12'
															r='10'
															stroke='currentColor'
															strokeWidth='4'
														></circle>
														<path
															className='opacity-75'
															fill='currentColor'
															d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
														></path>
													</svg>
													<p>Uploading</p>
												</div>
											) : (
												<>
													<FiUpload />
													<span>Browse</span>
												</>
											)}
											<input
												type='file'
												className='hidden'
												onChange={handleFileUpload}
											/>
										</label>
									</div>
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
										{isUpdating ? (
											<div className='flex justify-center items-center'>
												<svg
													className='animate-spin h-5 w-5 text-white mr-3'
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
												>
													<circle
														className='opacity-25'
														cx='12'
														cy='12'
														r='10'
														stroke='currentColor'
														strokeWidth='4'
													></circle>
													<path
														className='opacity-75'
														fill='currentColor'
														d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
													></path>
												</svg>
												<p>Updating</p>
											</div>
										) : (
											<p>Update</p>
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</>
			)}
		</main>
	);
};

export default ProductEdit;
