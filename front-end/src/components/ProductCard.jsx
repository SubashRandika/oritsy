import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GiShoppingCart } from 'react-icons/gi';
import { toast } from 'react-toastify';
import Rating from 'react-rating';
import { addToCart } from '../redux/actions/cartActions';
import { cartSelector } from '../redux/slices/cartSlice';
import { FaRegStar, FaStar } from 'react-icons/fa';

const tostOptions = {
	position: 'top-center',
	autoClose: '10000',
	type: 'info'
};

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	const { cartItems } = useSelector(cartSelector);

	const checkCartItemOutOfStock = () => {
		return product.countInStock === 0;
	};

	const handleAddToCart = (e) => {
		e.preventDefault();

		if (checkCartItemOutOfStock()) {
			toast(`Product ${product.name} is out of stock`, tostOptions);
			return;
		} else {
			const itemInCart = cartItems.find((item) => item.product === product._id);

			if (itemInCart) {
				return;
			}

			dispatch(addToCart({ id: product._id, quantity: 1 }));
		}
	};

	return (
		<Link
			className='group shadow-sm overflow-hidden border border-gray-200 transition-shadow duration-500 transform hover:shadow-md'
			to={`/product/${product._id}`}
		>
			<div className='flex items-end justify-end relative overflow-hidden h-56'>
				<img
					className='absolute w-full max-h-56 p-5 object-contain transition-all duration-1000 ease-in-out transform group-hover:scale-110'
					src={product.image}
					alt='Product'
				/>
				<button
					className='relative p-2 rounded-full bg-yellow-500 text-white mx-3 hover:bg-red-400 focus:outline-none mb-2 transition duration-500 ease-in-out'
					onClick={handleAddToCart}
				>
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
							readonly
							emptySymbol={<FaRegStar className='text-gray-300 text-xl' />}
							fullSymbol={<FaStar className='text-yellow-500 text-xl' />}
							initialRating={product.rating}
						/>
						<span className='text-gray-500 my-2'>{`${product.numReviews} reviews`}</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

ProductCard.propTypes = {
	product: PropTypes.object.isRequired
};

export default ProductCard;
