import React from 'react';

const Profile = () => {
	return (
		<div className='container m-auto h-full my-8'>
			<div className='grid grid-cols-4 gap-10'>
				<div>
					<h2 className='text-2xl font-semibold mb-12'>Update Profile</h2>
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
							placeholder='Your Name'
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
							placeholder='Your email'
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
							placeholder='Your password'
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
							placeholder='Confirm your password'
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
				<div className='col-span-3'>
					<h2 className='text-2xl font-semibold mb-6'>Your Orders</h2>
					<p>Orders List Goes Here</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
