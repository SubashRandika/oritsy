import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { orderListSelector } from '../redux/slices/orderListSlice';
import { userLoginSelector } from '../redux/slices/userLoginSlice';
import { listOrders } from '../redux/actions/orderActions';
import Loader from '../components/Loader/Loader';
import MetaInfo from '../components/MetaInfo';

const OrderList = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { userInfo } = useSelector(userLoginSelector);
	const { loading, orders } = useSelector(orderListSelector);

	useEffect(() => {
		if (userInfo?.isAdmin) {
			dispatch(listOrders());
		} else {
			history.push('/');
		}
	}, [dispatch, history, userInfo?.isAdmin]);

	return (
		<main className='container m-auto h-full my-6'>
			{loading ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader />
					<div className='text-lg text-gray-500 font-semibold'>Loading...</div>
				</div>
			) : (
				<>
					<MetaInfo title='Oritsy | Admin | Orders' />
					<div className='max-w-6xl mx-auto mt-10'>
						<h1 className='text-2xl font-semibold mb-6'>Orders List</h1>
						<div className='shadow overflow-hidden border-b border-gray-200'>
							<table className='min-w-full divide-y divide-gray-200'>
								<thead>
									<tr className='bg-gray-100 text-gray-600 uppercase text-sm'>
										<th
											scope='col'
											className='px-6 py-3 text-left font-bold tracking-wider'
										>
											Id
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left font-bold tracking-wider'
										>
											User
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left font-bold tracking-wider'
										>
											Created At
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left font-bold tracking-wider'
										>
											Total
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left font-bold tracking-wider'
										>
											Paid
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left font-bold tracking-wider'
										>
											Delivered
										</th>
										<th scope='col' className='relative px-6 py-3'>
											<span className='sr-only'>Details</span>
										</th>
									</tr>
								</thead>
								<tbody className='bg-white divide-y divide-gray-200'>
									{orders.map((order, idx) => (
										<tr
											key={order._id}
											className={`${(idx + 1) % 2 === 0 ? 'bg-gray-50' : ''}`}
										>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>{order._id}</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>
													{order?.user?.name}
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>
													{dayjs(order.createdAt).format('YYYY-MM-DD')}
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-900'>
													{`$ ${order.totalPrice}`}
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm'>
												{order.isPaid ? (
													dayjs(order.paidAt).format('YYYY-MM-DD')
												) : (
													<span className='px-3 inline-flex leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
														No
													</span>
												)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm'>
												{order.isDelivered ? (
													dayjs(order.deliveredAt).format('YYYY-MM-DD')
												) : (
													<span className='px-3 inline-flex leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
														No
													</span>
												)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
												<Link to={`/order/${order._id}`}>
													<button className='bg-transparent hover:bg-yellow-500 text-yellow-600 font-semibold hover:font-bold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent transition-all duration-300 ease-in-out'>
														Details
													</button>
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</>
			)}
		</main>
	);
};

export default OrderList;
