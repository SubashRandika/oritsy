import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import dayjs from 'dayjs';
import {
	getUserDetails,
	updateUserProfile
} from '../redux/actions/userActions';
import { getAuthUserOrders } from '../redux/actions/orderActions';
import { userDetailsSelector } from '../redux/slices/userProfileSlice';
import { userLoginSelector, logout } from '../redux/slices/userLoginSlice';
import { userProfileUpdateSelector } from '../redux/slices/userProfileUpdateSlice';
import { selfOrdersSelector } from '../redux/slices/selfOrdersListSlice';
import Loader from '../components/Loader/Loader';

const Profile = () => {
	const [profile, setProfile] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const dispatch = useDispatch();
	const history = useHistory();
	const [message, setMessage] = useState(null);
	const { loading, error, user } = useSelector(userDetailsSelector);
	const { userInfo } = useSelector(userLoginSelector);
	const { loading: isUpdating } = useSelector(userProfileUpdateSelector);
	const { loading: loadingOrders, orders } = useSelector(selfOrdersSelector);

	const handleOnChange = (e) => {
		setProfile({
			...profile,
			[e.target.name]: e.target.value
		});
	};

	useEffect(() => {
		if (error === 'Not authorized, Token verification failed') {
			dispatch(logout(history));
			return;
		}

		if (!userInfo) {
			history.push('/signin');
		} else {
			if (!user) {
				dispatch(getUserDetails({ id: 'profile' }));
				dispatch(getAuthUserOrders());
			} else {
				setProfile({
					name: user.name,
					email: user.email
				});
			}
		}
	}, [dispatch, history, userInfo, user, error]);

	const handleUpdateProfile = (e) => {
		e.preventDefault();

		if (profile.password !== profile.confirmPassword) {
			setMessage('Password does not match with confirm password');
		} else {
			dispatch(
				updateUserProfile({
					id: user._id,
					name: profile.name,
					email: profile.email,
					password: profile.password
				})
			);

			setMessage(null);
		}
	};

	return (
		<main className='container m-auto h-full my-10'>
			{loading || loadingOrders ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader />
					<div className='text-lg text-gray-500 font-semibold'>Loading...</div>
				</div>
			) : (
				<div className='grid grid-cols-4 gap-10 h-full'>
					<div>
						<h2 className='text-2xl font-semibold mb-6'>Update Profile</h2>
						<p
							className={`text-red-500 text-md font-semibold mb-4 ${
								!error ? 'hidden' : ''
							}`}
						>
							{error}
						</p>
						<form onSubmit={handleUpdateProfile}>
							<div className='flex flex-col mb-4'>
								<label
									className='font-semibold text-sm text-gray-600 mb-2'
									htmlFor='name'
								>
									Name
								</label>
								<input
									className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
									type='text'
									name='name'
									value={profile.name || ''}
									placeholder='Your Name'
									onChange={handleOnChange}
								/>
							</div>
							<div className='flex flex-col mb-4'>
								<label
									className='font-semibold text-sm text-gray-600 mb-2'
									htmlFor='email'
								>
									Email
								</label>
								<input
									className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
									type='email'
									name='email'
									value={profile.email || ''}
									placeholder='Your email'
									onChange={handleOnChange}
								/>
							</div>
							<div className='flex flex-col mb-4'>
								<label
									className='font-semibold text-sm text-gray-600 mb-2'
									htmlFor='password'
								>
									Password
								</label>
								<input
									className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
									type='password'
									name='password'
									value={profile.password || ''}
									placeholder='Your password'
									onChange={handleOnChange}
								/>
							</div>
							<div className='flex flex-col mb-6'>
								<label
									className='font-semibold text-sm text-gray-600 mb-2'
									htmlFor='password'
								>
									Confirm Password
								</label>
								<input
									className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
									type='password'
									name='confirmPassword'
									value={profile.confirmPassword || ''}
									placeholder='Confirm your password'
									onChange={handleOnChange}
								/>
							</div>
							{message && (
								<p className='text-red-500 text-sm font-semibold mb-6'>
									{message}
								</p>
							)}
							<div className='flex justify-center'>
								<button
									className='w-64 bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white text-lg font-semibold px-6 py-2 shadow-md hover:shadow-lg transition duration-300 ease-in-out'
									type='submit'
								>
									{isUpdating ? (
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
											<p>Updating</p>
										</div>
									) : (
										<p>Update</p>
									)}
								</button>
							</div>
						</form>
					</div>
					<div className='col-span-3'>
						<h2 className='text-2xl font-semibold mb-6'>Your Orders</h2>
						{orders?.length === 0 ? (
							<div className='h-56 flex flex-col justify-center items-center'>
								<FiShoppingBag className='text-6xl text-gray-200' />
								<h2 className='text-3xl font-semibold py-2'>
									No orders placed yet
								</h2>
								<p className='text-gray-500'>
									Please place some orders by checkout some of our products
								</p>
							</div>
						) : (
							<div className='shadow overflow-hidden border-b border-gray-200'>
								<table className='min-w-full divide-y divide-gray-200'>
									<thead className='bg-gray-50'>
										<tr>
											<th
												scope='col'
												className='px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider'
											>
												Id
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider'
											>
												Created At
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider'
											>
												Total
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider'
											>
												Paid
											</th>
											<th
												scope='col'
												className='px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider'
											>
												Delivered
											</th>
											<th scope='col' className='relative px-6 py-3'>
												<span className='sr-only'>Details</span>
											</th>
										</tr>
									</thead>
									<tbody className='bg-white divide-y divide-gray-200'>
										{orders.map((order) => (
											<tr key={order._id}>
												<td className='px-6 py-4 whitespace-nowrap'>
													<div className='text-sm text-gray-900'>
														{order._id}
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
															Not
														</span>
													)}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm'>
													{order.isDelivered ? (
														dayjs(order.deliveredAt).format('YYYY-MM-DD')
													) : (
														<span className='px-3 inline-flex leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
															Not
														</span>
													)}
												</td>
												<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
													<Link
														to={`/order/${order._id}`}
														className='text-blue-500 font-semibold hover:underline'
													>
														Details
													</Link>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			)}
		</main>
	);
};

export default Profile;
