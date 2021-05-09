import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { cartSelector } from '../redux/slices/cartSlice';

const Cart = () => {
	const { cartItems } = useSelector(cartSelector);

	const getTotalCartItems = () => {};

	const getTotalPrice = () => {};

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
					<div>
						<p>{`Subtotal (${getTotalCartItems()}) Items`}</p>
						<p>{`Total Price: ${getTotalPrice()}`}</p>
					</div>
					<div>
						<button>Go to checkout</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Cart;
