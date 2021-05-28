import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';
import Loader from '../components/Loader/Loader';
import { listUsers } from '../redux/actions/userActions';
import { userListSelector } from '../redux/slices/userListSlice';

const UserList = () => {
	const dispatch = useDispatch();
	const { loading, users } = useSelector(userListSelector);

	useEffect(() => {
		dispatch(listUsers());
	}, [dispatch]);

	return (
		<main className='container m-auto h-full my-6'>
			{loading ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader />
					<div className='text-lg text-gray-500 font-semibold'>Loading...</div>
				</div>
			) : (
				<div className='max-w-6xl mx-auto mt-10'>
					<h1 className='text-2xl font-semibold mb-6'>Users List</h1>
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
										Name
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left font-bold tracking-wider'
									>
										Email
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left font-bold tracking-wider'
									>
										Admin
									</th>
									<th scope='col' className='relative px-6 py-3'>
										<span className='sr-only'>Action</span>
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{users.map((user, idx) => (
									<tr
										key={user._id}
										className={`${(idx + 1) % 2 === 0 ? 'bg-gray-50' : ''}`}
									>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-900'>{user._id}</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-900'>{user.name}</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<a
												className='text-sm text-blue-400 hover:underline'
												href={`mailto:${user.email}`}
											>
												{user.email}
											</a>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											{user.isAdmin ? (
												<span className='px-3 inline-flex leading-5 text-sm font-semibold rounded-full bg-green-100 text-green-800'>
													Yes
												</span>
											) : (
												<span className='px-3 inline-flex leading-5 text-sm font-semibold rounded-full bg-red-100 text-red-800'>
													No
												</span>
											)}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-lg'>
											<div className='flex item-center justify-center'>
												<FiEdit className='mr-3 transform hover:text-yellow-600 transition-all duration-300 ease-in hover:scale-110 cursor-pointer' />
												<FaRegTrashAlt className='mr-3 transform hover:text-red-600 transition-all duration-300 ease-in hover:scale-110 cursor-pointer' />
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</main>
	);
};

export default UserList;
