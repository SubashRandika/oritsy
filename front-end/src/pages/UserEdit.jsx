import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch';
import { getUserDetails } from '../redux/actions/userActions';
import { userDetailsSelector } from '../redux/slices/userDetailsSlice';
import { logout } from '../redux/slices/userLoginSlice';

const UserEdit = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id: userId } = useParams();
	const { loading, error, user } = useSelector(userDetailsSelector);
	const [userInfo, setUserInfo] = useState({
		name: '',
		email: '',
		isAdmin: false
	});

	const handleOnChange = (e) => {
		setUserInfo({
			...userInfo,
			[e.target.name]: e.target.value
		});
	};

	const handleCheckedChange = (e) => {
		setUserInfo({
			...userInfo,
			[e.target.name]: e.target.checked
		});
	};

	useEffect(() => {
		if (error === 'Not authorized, Token verification failed') {
			dispatch(logout(history));
			return;
		}

		if (!user?.name || user?._id !== userId) {
			dispatch(getUserDetails(userId));
		}

		setUserInfo({
			name: user?.name,
			email: user?.email,
			isAdmin: user?.isAdmin
		});
	}, [
		dispatch,
		error,
		history,
		user?._id,
		user?.email,
		user?.isAdmin,
		user?.name,
		userId
	]);

	return (
		<main className='container m-auto h-full'>
			{loading ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader />
					<div className='text-lg text-gray-500 font-semibold'>Loading...</div>
				</div>
			) : (
				<div className='max-w-sm mx-auto mt-24 mb-10'>
					<h1 className='my-12 text-3xl text-center font-bold text-gray-700'>
						Edit User
					</h1>
					<div className='my-6'>
						<form>
							<div className='flex flex-col mb-8'>
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
									placeholder='Name'
									value={userInfo.name || ''}
									onChange={handleOnChange}
								/>
							</div>
							<div className='flex flex-col mb-8'>
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
									placeholder='Email Address'
									value={userInfo.email || ''}
									onChange={handleOnChange}
								/>
							</div>
							<div className='flex flex-col mb-8'>
								<ToggleSwitch
									isAdmin={userInfo.isAdmin || false}
									handleOnChange={handleCheckedChange}
								/>
							</div>
							<div className='my-10 flex justify-center'>
								<button
									className='w-60 bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white text-lg font-semibold px-6 py-2 shadow-md hover:shadow-lg transition duration-300 ease-in-out'
									type='submit'
								>
									Update
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</main>
	);
};

export default UserEdit;
