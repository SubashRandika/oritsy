import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer
} from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import {
	getOrderDetails,
	payOrder,
	deliverOrder
} from '../redux/actions/orderActions';
import { orderDetailsSelector } from '../redux/slices/orderDetailsSlice';
import {
	orderPaymentSelector,
	resetPayOrder
} from '../redux/slices/orderPaymentSlice';
import {
	orderDeliverSelector,
	resetDeliverOrder
} from '../redux/slices/orderDeliverSlice';
import { userLoginSelector } from '../redux/slices/userLoginSlice';
import Loader from '../components/Loader/Loader';
import Alert from '../components/Alert';
import MetaInfo from '../components/MetaInfo';

const tostOptions = {
	position: 'top-center',
	autoClose: '10000',
	type: 'error'
};

const OrderDetails = () => {
	const [clientId, setClientId] = useState(null);
	const { id: orderId } = useParams();
	const dispatch = useDispatch();
	const { order, loading } = useSelector(orderDetailsSelector);
	const { paySuccess } = useSelector(orderPaymentSelector);
	const { isDeliver, deliverSuccess } = useSelector(orderDeliverSelector);
	const { userInfo } = useSelector(userLoginSelector);
	const [{ isPending }] = usePayPalScriptReducer();

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

	const handleOrderCreation = (data, actions) => {
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						currency_code: 'USD',
						value: order.totalPrice
					}
				}
			]
		});
	};

	const handlePaymentSuccess = (data, actions) => {
		return actions.order.capture().then((details) => {
			const {
				id,
				status,
				update_time,
				payer: { email_address }
			} = details;

			dispatch(
				payOrder({
					orderId,
					paymentResult: { id, status, update_time, email_address }
				})
			);
		});
	};

	const handlePaymentFailed = (err) => {
		console.error(err);
		toast('Unable to process your payment with PayPal', tostOptions);
	};

	useEffect(() => {
		const fetchPaypalClientId = async () => {
			const { data: clientKey } = await axios.get('/api/config/paypal');
			setClientId(clientKey);
		};

		if (!clientId) {
			fetchPaypalClientId();
		}

		if (!order || paySuccess || deliverSuccess || order._id !== orderId) {
			dispatch(resetPayOrder());
			dispatch(resetDeliverOrder());
			dispatch(getOrderDetails(orderId));
		}
	}, [clientId, dispatch, order, orderId, paySuccess, deliverSuccess]);

	const handleMarkDelivered = () => {
		dispatch(deliverOrder(orderId));
	};

	return (
		<main className='container m-auto h-full my-6'>
			{loading ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader />
					<div className='text-lg text-gray-500 font-semibold'>Loading...</div>
				</div>
			) : (
				<>
					<MetaInfo title='Oritsy | Order Details' />
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
												header='Delivered on'
												body={dayjs(`${order.deliveredAt}`).format(
													'ddd, MMM D, YYYY h:mm A'
												)}
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
											<Alert
												type='success'
												header='Paid on'
												body={dayjs(`${order.paidAt}`).format(
													'ddd, MMM D, YYYY h:mm A'
												)}
											/>
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
								{!order.isPaid && (
									<div className='p-6 w-full border-t border-gray-300'>
										<PayPalScriptProvider options={{ 'client-id': clientId }}>
											{isPending ? (
												<div className='w-full flex items-center justify-center'>
													<svg
														className='animate-spin -ml-1 mr-3 h-8 w-8 text-gray-600'
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
													>
														<circle
															className='opacity-25'
															cx='12'
															cy='12'
															r='10'
															stroke='currentColor'
															strokeWidth='4'
														></circle>
														<path
															className='opacity-75'
															fill='currentColor'
															d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
														></path>
													</svg>
												</div>
											) : (
												<PayPalButtons
													createOrder={handleOrderCreation}
													onApprove={handlePaymentSuccess}
													onError={handlePaymentFailed}
												/>
											)}
										</PayPalScriptProvider>
									</div>
								)}
								{userInfo?.isAdmin && order?.isPaid && !order?.isDelivered && (
									<div className='p-6 w-full border-t border-gray-300 flex justify-center'>
										<button
											className='flex items-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white font-semibold px-8 py-2 shadow-md hover:shadow-lg transition duration-300 ease-in-out'
											onClick={handleMarkDelivered}
										>
											{isDeliver ? (
												<div className='flex justify-center items-center'>
													<svg
														className='animate-spin h-5 w-5 text-white mr-3'
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
													>
														<circle
															className='opacity-25'
															cx='12'
															cy='12'
															r='10'
															stroke='currentColor'
															strokeWidth='4'
														></circle>
														<path
															className='opacity-75'
															fill='currentColor'
															d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
														></path>
													</svg>
													<p>Marking Deliver</p>
												</div>
											) : (
												<span>Mark As Delivered</span>
											)}
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</main>
	);
};

export default OrderDetails;
