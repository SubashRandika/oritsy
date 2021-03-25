import React from 'react';
import { GiShoppingCart } from 'react-icons/gi';

const ProductCard = ({ product }) => {
	return (
		<div className='shadow-sm overflow-hidden border border-gray-200 cursor-pointer transition-shadow duration-500 transform hover:shadow-md'>
			<div className='flex items-end justify-end relative overflow-hidden h-56'>
				<img
					className='absolute w-full max-h-56 bg-cover transition-all duration-700 ease-in-out transform hover:scale-110'
					src={product.image}
					alt='Product'
				/>
				<button className='relative p-2 rounded-full bg-yellow-500 text-white mx-3 hover:bg-red-400 focus:outline-none mb-2'>
					<span className='text-3xl'>
						<GiShoppingCart />
					</span>
				</button>
			</div>
			<div className='px-5 py-4'>
				<h3 className='text-gray-700 my-2'>{product.name}</h3>
				<span className='text-2xl font-semibold text-gray-700 mt-2'>
					${product.price}
				</span>
				<div className='flex items-center mt-1'>
					<svg
						className='w-4 h-4 fill-current text-yellow-500'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
					>
						<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
					</svg>
					<svg
						className='w-4 h-4 fill-current text-yellow-500'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
					>
						<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
					</svg>
					<svg
						className='w-4 h-4 fill-current text-yellow-500'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
					>
						<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
					</svg>
					<svg
						className='w-4 h-4 fill-current text-yellow-500'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
					>
						<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
					</svg>
					<svg
						className='w-4 h-4 fill-current text-gray-300'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
					>
						<path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
					</svg>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
