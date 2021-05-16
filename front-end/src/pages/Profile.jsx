import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserDetails } from '../redux/actions/userActions';
import { userDetailsSelector } from '../redux/slices/userProfileSlice';
import { userLoginSelector } from '../redux/slices/userLoginSlice';
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
	const { loading, error, user } = useSelector(userDetailsSelector);
	const { userInfo } = useSelector(userLoginSelector);

	const handleOnChange = (e) => {
		setProfile({
			...profile,
			[e.target.name]: e.target.value
		});
	};

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user) {
				dispatch(getUserDetails({ id: 'profile' }));
			} else {
				setProfile({
					name: user.name,
					email: user.email
				});
			}
		}
	}, [dispatch, history, userInfo, user]);

	return (
		<div className='container m-auto h-full my-10'>
			<div className='grid grid-cols-4 gap-10 h-full'>
				{loading ? (
					<div className='w-full flex flex-col items-center justify-center'>
						<Loader />
						<div className='text-lg text-gray-500 font-semibold'>
							Loading...
						</div>
					</div>
				) : (
					<div>
						<h2 className='text-2xl font-semibold mb-6'>Update Profile</h2>
						<p
							className={`text-red-500 text-md font-semibold mb-4 ${
								!error ? 'hidden' : ''
							}`}
						>
							{error}
						</p>
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
						<div className='flex flex-col mb-8'>
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
						<div className='flex justify-center'>
							<button
								className='w-64 bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white text-lg font-semibold px-6 py-2 shadow-md hover:shadow-lg transition duration-300 ease-in-out'
								type='submit'
							>
								Update
							</button>
						</div>
					</div>
				)}

				<div className='col-span-3'>
					<h2 className='text-2xl font-semibold mb-6'>Your Orders</h2>
					<p>Orders List Goes Here</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
