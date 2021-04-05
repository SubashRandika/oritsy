import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiChevronDown } from 'react-icons/fi';
import { GiShoppingCart } from 'react-icons/gi';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import Rating from '../components/Rating';

const ProductDetails = () => {
	const [product, setProduct] = useState({});
	const { id } = useParams();

	useEffect(() => {
		const getProductById = async () => {
			const { data } = await axios.get(`/api/products/${id}`);
			setProduct(data);
		};

		getProductById();
	}, [id]);

	return (
		<main className='container m-auto py-16'>
			<div className='flex'>
				<div className='flex relative h-96 w-1/2'>
					<img
						className='w-full max-h-96 object-contain'
						src={product.image}
						alt='Product'
					/>
				</div>
				<div className='flex flex-col w-1/2 px-5'>
					<h2 className='text-md title-font text-gray-500 tracking-widest uppercase'>
						{product.brand}
					</h2>
					<h1 className='text-gray-900 text-3xl title-font font-semibold my-1.5'>
						{product.name}
					</h1>
					<div className='flex items-center divide-x-2 divide-gray-300'>
						<div className='flex items-center py-2 pr-5'>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
								ratingStyle={`text-yellow-500 text-2xl`}
								textStyle={`text-lg text-gray-500 ml-5`}
							/>
						</div>
						<div className='flex items-center pl-5'>
							<h2 className='text-blue-400 mr-4'>Share</h2>
							<span className='text-2xl text-gray-400 cursor-pointer mr-2 transition duration-500 ease-in-out transform hover:scale-125'>
								<FiMail />
							</span>
							<span className='text-2xl text-facebook cursor-pointer mr-2 transition duration-500 ease-in-out transform hover:scale-125'>
								<FaFacebook />
							</span>
							<span className='text-2xl text-twitter cursor-pointer mr-2 transition duration-500 ease-in-out transform hover:scale-125'>
								<FaTwitter />
							</span>
							<span className='text-2xl text-pinterest cursor-pointer mr-2 transition duration-500 ease-in-out transform hover:scale-125'>
								<FaPinterest />
							</span>
						</div>
					</div>
					<p className='my-4 w-2/3'>{product.description}</p>
					<div className='flex items-center my-3'>
						<h2
							className={`text-xl font-semibold mr-4 ${
								product.countInStock > 0 ? 'text-green-600' : 'text-red-500'
							}`}
						>
							{product.countInStock > 0 ? 'In Stock.' : 'Out Of Stock.'}
						</h2>
						<div className='relative inline-flex'>
							<span className='w-2 h-4 absolute top-0 right-0 my-3 mr-5 pointer-events-none'>
								<FiChevronDown />
							</span>
							<span className='absolute top-0 left-0 my-2 ml-4'>Qty:</span>
							<select
								disabled={product.countInStock === 0}
								className={`border border-gray-300 rounded-full text-gray-600 h-10 pl-14 pr-8 bg-white focus:outline-none appearance-none ${
									product.countInStock === 0
										? 'hover:text-gray-600 cursor-not-allowed'
										: 'hover:border-yellow-500 cursor-pointer'
								}`}
							>
								{product.countInStock > 0 ? (
									Array.from(
										{ length: product.countInStock },
										(_, index) => index + 1
									).map((qty, idx) => (
										<option key={idx} value={qty}>
											{qty}
										</option>
									))
								) : (
									<option key='0'>0</option>
								)}
							</select>
						</div>
					</div>
					<hr className='w-2/3 my-3 bg-gradient-to-r from-white via-gray-300 to-white h-0.5 border-0' />
					<div className='flex justify-end w-2/3 my-3'>
						<button className='flex items-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white font-semibold px-6 py-2 mr-5 shadow-md hover:shadow-lg transition duration-300 ease-in-out'>
							<span className='uppercase mr-2'>Add to cart</span>
							<span className='text-2xl'>
								<GiShoppingCart />
							</span>
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ProductDetails;
