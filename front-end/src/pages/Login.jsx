import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	const handleSignIn = () => {
		console.log('Sign In');
	};

	return (
		<div className='container m-auto h-full'>
			<div className='max-w-sm mx-auto mt-28 mb-10'>
				<div className='text-center'>
					<h1 className='my-3 text-4xl font-bold text-gray-700'>Sign in</h1>
					<div className='relative mt-6 h-px bg-gray-300'>
						<div className='absolute left-0 top-0 flex justify-center w-full -mt-2'>
							<span className='bg-white px-4 text-xs text-gray-500 uppercase'>
								with your email
							</span>
						</div>
					</div>
					<p className='text-red-500 text-sm italic mt-6'>
						Please provide your email and password correctly.
					</p>
				</div>
				<div className='my-6'>
					<form onSubmit={handleSignIn}>
						<div className='flex flex-col mb-6'>
							<label
								className='font-semibold text-sm text-gray-600 mb-2'
								htmlFor='email'
							>
								Email
							</label>
							<input
								type='email'
								name='email'
								placeholder='name@company.com'
								className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
							/>
						</div>
						<div className='flex flex-col mb-6'>
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
						<div className='mb-6'>
							<button
								className='w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white text-lg font-semibold px-6 py-2 mr-5 shadow-md hover:shadow-lg transition duration-300 ease-in-out'
								type='submit'
							>
								Sign in
							</button>
						</div>
						<p className='text-sm text-center text-gray-400'>
							{`Don't you have an account yet? `}
							<Link
								className='text-md font-semibold text-blue-500 focus:outline-none hover:underline'
								to='/register'
							>
								Sign Up
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
