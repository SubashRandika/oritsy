import React from 'react';
import { useSelector } from 'react-redux';
import { ImCreditCard } from 'react-icons/im';
import CartItem from '../components/CartItem';
import { cartSelector } from '../redux/slices/cartSlice';

const Cart = () => {
	const { cartItems } = useSelector(cartSelector);

	const getTotalCartItems = () => {
		const itemTotal = cartItems.reduce(
			(currentQuantity, currentItem) => currentQuantity + currentItem.quantity,
			0
		);

		if (itemTotal > 1) {
			return `(${itemTotal} items)`;
		} else {
			return `(${itemTotal} item)`;
		}
	};

	const getTotalPrice = () => {
		return cartItems
			.reduce(
				(currentPrice, currentItem) => currentPrice + currentItem.price,
				0
			)
			.toFixed(2);
	};

	return (
		<main className='container m-auto py-4 h-full'>
			<h1 className='text-2xl font-semibold'>Shopping Cart</h1>
			<div className='grid grid-cols-4 gap-8 mt-10'>
				<div className='col-span-3'>
					{cartItems?.length === 0 ? (
						<div>Cart is empty</div>
					) : (
						cartItems.map((cartItem) => (
							<CartItem key={cartItem.product} cartItem={cartItem} />
						))
					)}
				</div>
				<div>
					<div className='border border-gray-200 shadow-md'>
						<div className='border-b border-gray-200 p-6'>
							<p className='text-2xl font-bold'>
								Cart Subtotal
								<span className='font-normal text-gray-500 px-3'>
									{getTotalCartItems()}
								</span>
							</p>
							<p className='text-2xl font-bold mt-5 text-red-700'>
								{`$ ${getTotalPrice()}`}
							</p>
						</div>
						<div className='p-6 flex justify-center items-center'>
							<button className='flex items-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white font-semibold px-6 py-2 shadow-md hover:shadow-lg transition duration-300 ease-in-out'>
								<span className='mr-3 uppercase'>Proceed to checkout</span>
								<span className='text-xl'>
									<ImCreditCard />
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Cart;
