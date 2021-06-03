import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoTrashBinOutline } from 'react-icons/io5';
import { FiChevronDown } from 'react-icons/fi';
import { addToCart } from '../redux/actions/cartActions';
import { removeFromCart } from '../redux/slices/cartSlice';

const CartItem = ({ cartItem }) => {
	const dispatch = useDispatch();

	const setProductQuantity = (quantity) => {
		dispatch(addToCart({ id: cartItem.product, quantity }));
	};

	const handleRemoveFromCart = () => {
		dispatch(removeFromCart(cartItem.product));
	};

	return (
		<div className='w-full max-h-24 flex items-center border-b border-gray-200 mb-4'>
			<img
				className='w-36 max-h-24 pb-2 object-contain flex-none'
				src={cartItem.image}
				alt={cartItem.name}
			/>
			<Link className='ml-10 flex-grow' to={`/product/${cartItem.product}`}>
				<h2 className='uppercase font-medium text-blue-400 hover:underline'>
					{cartItem.name}
				</h2>
			</Link>
			<div className='w-36 ml-10 flex-none'>
				<div className='relative inline-flex'>
					<span className='w-2 h-4 absolute top-0 right-0 my-3 mr-5 pointer-events-none'>
						<FiChevronDown />
					</span>
					<span className='absolute top-0 left-0 my-2 ml-4'>Qty:</span>
					<select
						className={`border border-gray-300 rounded-full text-gray-600 h-10 pl-14 pr-8 bg-white focus:outline-none appearance-none transition duration-500 ease-in-out ${
							cartItem.countInStock === 0
								? 'hover:text-gray-600 cursor-not-allowed'
								: 'hover:border-yellow-500 cursor-pointer'
						}`}
						value={cartItem.quantity}
						onChange={(e) => setProductQuantity(e.target.value)}
					>
						{cartItem.countInStock > 0 ? (
							Array.from(
								{ length: cartItem.countInStock },
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
			<div className='w-28 ml-10 flex-none'>
				<h2 className='text-lg font-semibold'>{`$ ${cartItem.price}`}</h2>
			</div>
			<div className='w-36 flex-none'>
				<button
					className='flex items-center bg-transparent hover:bg-red-400 text-red-500 font-semibold hover:font-bold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent transition-all duration-300 ease-in-out'
					onClick={handleRemoveFromCart}
				>
					<span className='mr-3 uppercase'>Delete</span>
					<span className='text-xl'>
						<IoTrashBinOutline />
					</span>
				</button>
			</div>
		</div>
	);
};

CartItem.propTypes = {
	cartItem: PropTypes.object.isRequired
};

export default CartItem;
