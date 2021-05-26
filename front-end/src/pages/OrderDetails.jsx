import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../redux/actions/orderActions';
import { orderDetailsSelector } from '../redux/slices/orderDetailsSlice';
import Loader from '../components/Loader/Loader';
import Alert from '../components/Alert';

const OrderDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { order, loading } = useSelector(orderDetailsSelector);

	const withDecimal = (value) => {
		return (Math.round(value * 100) / 100).toFixed(2);
	};

	const getItemsPrice = () => {
		return withDecimal(
			order?.orderItems.reduce(
				(acc, item) => acc + item.quantity * item.price,
				0
			)
		);
	};

	useEffect(() => {
		if (!order) {
			dispatch(getOrderDetails(id));
		}
	}, [dispatch, id, order]);

	return (
		<main className='container m-auto h-full my-6'>
			{loading ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader />
					<div className='text-lg text-gray-500 font-semibold'>Loading...</div>
				</div>
			) : (
				<>
					<h2 className='text-4xl text-gray-600 font-bold uppercase mt-4'>
						Order
						<span className='font-semibold text-gray-500 pl-4'>
							{order._id}
						</span>
					</h2>
					<div className='mx-auto mt-10 grid grid-cols-4 gap-8'>
						<div className='col-span-3'>
							<div className='grid grid-flow-col gird-cols-2'>
								<div className='flex flex-col pl-20'>
									<h2 className='text-2xl text-gray-600 font-bold uppercase border-b border-gray-200 pb-2'>
										Shipping
									</h2>
									<p className='flex mt-4 text-md'>
										<span className='font-bold text-gray-600'>Name :</span>
										<span className='pl-8 text-gray-600'>
											{order.user.name}
										</span>
									</p>
									<p className='flex mt-2 text-md'>
										<span className='font-bold text-gray-600'>Email :</span>
										<a
											className='pl-9 text-blue-400 hover:underline'
											href={`mailto:${order.user.email}`}
										>
											{order.user.email}
										</a>
									</p>
									<p className='flex mt-2 text-md'>
										<span className='font-bold text-gray-600'>Address :</span>
										<span className='pl-4 text-gray-600'>
											{`${order.shippingAddress.address},`} <br />
											{`${order.shippingAddress.city}, ${order.shippingAddress.postalCode},`}{' '}
											<br />
											{order.shippingAddress.country}
										</span>
									</p>
									{order.isDelivered ? (
										<div className='mt-3'>
											<Alert
												type='success'
												body={`Delivered on ${order.deliveredAt}`}
											/>
										</div>
									) : (
										<div className='mt-3'>
											<Alert type='error' body='Not Delivered' />
										</div>
									)}
								</div>
								<div className='flex flex-col'>
									<h2 className='text-2xl text-gray-600 font-bold uppercase border-b border-gray-200 pb-2'>
										Payment
									</h2>
									<p className='flex mt-4 text-md'>
										<span className='font-bold text-gray-600'>Method :</span>
										<span className='pl-4 text-gray-600'>
											{order.paymentMethod}
										</span>
									</p>
									{order.isPaid ? (
										<div className='mt-3'>
											<Alert type='success' body={`Paid on ${order.paidAt}`} />
										</div>
									) : (
										<div className='mt-3'>
											<Alert type='error' body='Not Paid' />
										</div>
									)}
								</div>
							</div>
							<div className='pl-20 mt-10'>
								<h2 className='text-2xl text-gray-600 font-bold uppercase mb-8'>
									Order Items
								</h2>
								{order?.orderItems.length > 0 &&
									order?.orderItems.map((cartItem) => (
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
											<div className='w-5/12 flex-none pl-4'>
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
									<p className='py-4 w-40 text-gray-600 font-extrabold'>{`$ ${getItemsPrice()}`}</p>
								</div>
								<div className='flex border-t border-gray-300'>
									<p className='pl-6 py-4 flex-grow font-medium text-gray-600'>
										Shipping
									</p>
									<p className='py-4 w-40 text-gray-600 font-extrabold'>{`$ ${order.shippingPrice}`}</p>
								</div>
								<div className='flex border-t border-gray-300'>
									<p className='pl-6 py-4 flex-grow font-medium text-gray-600'>
										Tax
									</p>
									<p className='py-4 w-40 text-gray-600 font-extrabold'>{`$ ${order.taxPrice}`}</p>
								</div>
								<div className='flex border-t border-gray-300'>
									<p className='pl-6 py-4 flex-grow font-medium text-gray-600'>
										Total
									</p>
									<p className='py-4 w-40 text-gray-600 font-extrabold'>{`$ ${order.totalPrice}`}</p>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</main>
	);
};

export default OrderDetails;
