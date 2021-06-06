import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch';
import { getUserDetails, updateUser } from '../redux/actions/userActions';
import { userDetailsSelector } from '../redux/slices/userDetailsSlice';
import {
	resetUserUpdate,
	userUpdateSelector
} from '../redux/slices/userUpdateSlice';
import { logout } from '../redux/slices/userLoginSlice';
import MetaInfo from '../components/MetaInfo';

const UserEdit = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id: userId } = useParams();
	const { loading, error, user } = useSelector(userDetailsSelector);
	const [userInfo, setUserInfo] = useState({
		name: '',
		email: '',
		isAdmin: ''
	});

	const { loading: isUpdating, success: updateSuccess } =
		useSelector(userUpdateSelector);

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

		if (updateSuccess) {
			dispatch(resetUserUpdate());
			history.push('/admin/user-list');
		} else {
			dispatch(getUserDetails(userId));

			setUserInfo({
				name: user?.name,
				email: user?.email,
				isAdmin: user?.isAdmin
			});
		}
	}, [
		dispatch,
		error,
		history,
		user?.email,
		user?.isAdmin,
		user?.name,
		userId,
		updateSuccess
	]);

	const handleUpdateUser = (e) => {
		e.preventDefault();

		dispatch(
			updateUser({
				_id: userId,
				name: userInfo?.name,
				email: userInfo?.email,
				isAdmin: userInfo?.isAdmin
			})
		);
	};

	return (
		<main className='container m-auto h-full'>
			{loading ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader />
					<div className='text-lg text-gray-500 font-semibold'>Loading...</div>
				</div>
			) : (
				<>
					<MetaInfo title='Oritsy | Admin | Update User' />
					<div className='max-w-sm mx-auto mt-24 mb-10'>
						<h1 className='my-12 text-3xl text-center font-bold text-gray-700'>
							Update User
						</h1>
						<div className='my-6'>
							<form onSubmit={handleUpdateUser}>
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
					</div>
				</>
			)}
		</main>
	);
};

export default UserEdit;
