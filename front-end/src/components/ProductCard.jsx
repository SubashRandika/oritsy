import React from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import Rating from './Rating';

const ProductCard = ({ product }) => {
	return (
		<div className='shadow-sm overflow-hidden border border-gray-200 cursor-pointer transition-shadow duration-500 transform hover:shadow-md'>
			<div className='flex items-end justify-end relative overflow-hidden h-56'>
				<img
					className='absolute w-full max-h-56 p-4 object-contain transition-all duration-1000 ease-in-out transform hover:scale-110'
					src={product.image}
					alt='Product'
				/>
				<button className='relative p-2 rounded-full bg-yellow-500 text-white mx-3 hover:bg-red-400 focus:outline-none mb-2'>
					<span className='text-3xl'>
						<GiShoppingCart />
					</span>
				</button>
			</div>
			<div className='flex flex-col px-4 py-1'>
				<h3 className='font-semibold text-gray-700 my-2'>{product.name}</h3>
				<div className='flex justify-between items-center'>
					<span className='text-2xl font-bold text-gray-700'>
						<span className='pr-0.5'>$</span>
						{product.price}
					</span>
					<div className='flex flex-col items-center mt-1'>
						<Rating
							value={product.rating}
							text={`${product.numReviews} reviews`}
							ratingStyle={`text-yellow-500 text-lg`}
							textStyle={`text-gray-500 my-2`}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
