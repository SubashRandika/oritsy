import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { productsSelector } from '../redux/slices/productsSlice';
import { fetchProducts } from '../redux/actions/productActions';
import Loader from '../components/Loader/Loader';

const tostOptions = {
	position: 'top-center',
	autoClose: '10000',
	type: 'error'
};

const ProductList = () => {
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector(productsSelector);

	useEffect(() => {
		dispatch(fetchProducts());

		if (error) {
			toast('Unable to fetch products list', tostOptions);
		}
	}, [dispatch, error]);

	const handleProductDelete = (productId) => {
		console.log(productId);
	};

	return (
		<main className='container m-auto h-full my-6'>
			{loading ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader />
					<div className='text-lg text-gray-500 font-semibold'>Loading...</div>
				</div>
			) : (
				<div className='max-w-8xl mx-auto mt-10'>
					<div className='flex items-center justify-between mb-6'>
						<h1 className='text-2xl font-semibold'>Products List</h1>
						<button className='flex items-center justify-around w-52 bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white text-lg font-semibold px-6 py-2 shadow-md hover:shadow-lg transition duration-300 ease-in-out'>
							<FaPlus />
							<span>Create Product</span>
						</button>
					</div>
					<div className='shadow overflow-hidden border-b border-gray-200'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead>
								<tr className='bg-gray-100 text-gray-600 uppercase text-sm'>
									<th
										scope='col'
										className='px-6 py-3 text-left font-bold tracking-wider'
									>
										Id
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left font-bold tracking-wider'
									>
										Name
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left font-bold tracking-wider'
									>
										Price
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left font-bold tracking-wider'
									>
										Category
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left font-bold tracking-wider'
									>
										Brand
									</th>
									<th scope='col' className='relative px-6 py-3'>
										<span className='sr-only'>Action</span>
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{products.map((product, idx) => (
									<tr
										key={product._id}
										className={`${(idx + 1) % 2 === 0 ? 'bg-gray-50' : ''}`}
									>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-900'>{product._id}</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<Link
												className='text-sm text-blue-400 hover:underline'
												to={`/product/${product._id}`}
											>
												{product.name}
											</Link>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-900'>{`$ ${product.price}`}</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-900'>
												{product.category}
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-900'>
												{product.brand}
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-lg'>
											<div className='flex item-center justify-center'>
												<Link to={`/admin/product/${product._id}/edit`}>
													<FiEdit className='mr-3 hover:text-yellow-600 transition duration-500 ease-in-out transform hover:scale-125 cursor-pointer' />
												</Link>
												<FaRegTrashAlt
													className='mr-3 hover:text-red-600 transition duration-500 ease-in-out transform hover:scale-125 cursor-pointer'
													onClick={() => handleProductDelete(product._id)}
												/>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</main>
	);
};

export default ProductList;
