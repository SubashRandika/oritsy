import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cartSelector } from '../redux/slices/cartSlice';
import { FaCartArrowDown } from 'react-icons/fa';
import CheckoutStepper from '../components/CheckoutStepper/CheckoutStepper';

const PlaceOrder = () => {
	const [prices] = useState({});
	const {
		cartItems,
		shippingAddress: { address, city, postalCode, country },
		paymentMethod
	} = useSelector(cartSelector);

	const withDecimal = (value) => {
		return (Math.round(value * 100) / 100).toFixed(2);
	};

	prices.itemsPrice = withDecimal(
		cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
	);

	prices.shippingPrice = withDecimal(prices.itemsPrice > 100 ? 0 : 100);

	prices.taxPrice = withDecimal(Number((0.15 * prices.itemsPrice).toFixed(2)));

	prices.totalPrice = (
		Number(prices.itemsPrice) +
		Number(prices.shippingPrice) +
		Number(prices.taxPrice)
	).toFixed(2);

	const handlePlaceOrder = (e) => {
		console.log('Order Placed');
	};

	return (
		<main className='container m-auto h-full my-6'>
			<div className='max-w-4xl mx-auto'>
				<CheckoutStepper
					stepStatus={['outline', 'outline', 'outline', 'active']}
				/>
			</div>
			<div className='mx-auto mt-24 grid grid-cols-4 gap-8'>
				<div className='col-span-3'>
					<div className='grid grid-flow-col gird-cols-2'>
						<div className='flex flex-col pl-36'>
							<h2 className='text-2xl text-gray-600 font-bold uppercase border-b border-gray-200 pb-2'>
								Shipping
							</h2>
							<p className='flex mt-4 text-md'>
								<span className='font-bold text-gray-600'>Address :</span>
								<span className='pl-4 text-gray-600'>
									{`${address},`} <br />
									{`${city}, ${postalCode},`} <br />
									{country}
								</span>
							</p>
						</div>
						<div className='flex flex-col'>
							<h2 className='text-2xl text-gray-600 font-bold uppercase border-b border-gray-200 pb-2'>
								Payment
							</h2>
							<p className='flex mt-4 text-md'>
								<span className='font-bold text-gray-600'>Method :</span>
								<span className='pl-4 text-gray-600'>{paymentMethod}</span>
							</p>
						</div>
					</div>
					<div className='pl-36 mt-16'>
						<h2 className='text-2xl text-gray-600 font-bold uppercase mb-8'>
							Order Items
						</h2>
						{cartItems?.length > 0 &&
							cartItems.map((cartItem) => (
								<div
									className='w-full max-h-16 flex items-center border-b border-gray-200 mb-4'
									key={cartItem.product}
								>
									<img
										className='w-28 max-h-16 pb-2 object-contain flex-none'
										src={cartItem.image}
										alt={cartItem.name}
									/>
									<Link
										className='ml-10 flex-grow'
										to={`/product/${cartItem.product}`}
									>
										<h2 className='font-medium text-blue-400 hover:underline'>
											{cartItem.name}
										</h2>
									</Link>
									<div className='w-64 flex-none'>
										<span className='text-gray-600'>{`${cartItem.quantity} x $ ${cartItem.price} = `}</span>
										<span className='text-md font-bold'>
											&nbsp;{`$ ${cartItem.price}`}
										</span>
									</div>
								</div>
							))}
					</div>
				</div>
				<div>
					<div className='border border-gray-200 shadow-md grid -mt-5'>
						<h2 className='text-2xl text-gray-600 font-bold uppercase px-4 py-3.5 text-center'>
							Order Summary
						</h2>
						<div className='flex border-t border-gray-300'>
							<p className='pl-6 py-4 flex-grow font-medium text-gray-600'>
								Items
							</p>
							<p className='py-4 w-40 text-gray-600 font-extrabold'>{`$ ${prices.itemsPrice}`}</p>
						</div>
						<div className='flex border-t border-gray-300'>
							<p className='pl-6 py-4 flex-grow font-medium text-gray-600'>
								Shipping
							</p>
							<p className='py-4 w-40 text-gray-600 font-extrabold'>{`$ ${prices.shippingPrice}`}</p>
						</div>
						<div className='flex border-t border-gray-300'>
							<p className='pl-6 py-4 flex-grow font-medium text-gray-600'>
								Tax
							</p>
							<p className='py-4 w-40 text-gray-600 font-extrabold'>{`$ ${prices.taxPrice}`}</p>
						</div>
						<div className='flex border-t border-gray-300'>
							<p className='pl-6 py-4 flex-grow font-medium text-gray-600'>
								Total
							</p>
							<p className='py-4 w-40 text-gray-600 font-extrabold'>{`$ ${prices.totalPrice}`}</p>
						</div>
						<div className='p-6 flex justify-center items-center border-t border-gray-300'>
							<button
								className='flex items-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white font-semibold px-6 py-2 shadow-md hover:shadow-lg transition duration-300 ease-in-out'
								onClick={handlePlaceOrder}
							>
								<span className='mr-3 uppercase'>Place Order</span>
								<span className='text-xl'>
									<FaCartArrowDown />
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default PlaceOrder;
