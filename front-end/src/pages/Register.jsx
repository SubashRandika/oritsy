import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../redux/actions/userActions';
import { userRegisterSelector } from '../redux/slices/userRegisterSlice';

const Register = () => {
	const [signUp, setSignUp] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();
	const history = useHistory();
	const { loading, error, userInfo } = useSelector(userRegisterSelector);

	const handleSignUp = (e) => {
		e.preventDefault();

		if (signUp.password !== signUp.confirmPassword) {
			setMessage('Password does not match with confirm password');
		} else {
			dispatch(
				register({
					name: signUp.name,
					email: signUp.email,
					password: signUp.password
				})
			);
		}
	};

	const handleOnChange = (e) => {
		setSignUp({
			...signUp,
			[e.target.name]: e.target.value
		});
	};

	useEffect(() => {
		if (userInfo) {
			history.push('/');
		}
	}, [history, userInfo]);

	return (
		<div className='container m-auto h-full'>
			<div className='max-w-sm mx-auto mt-28 mb-10'>
				<div className='text-center'>
					<h1 className='my-3 text-4xl font-bold text-gray-700'>Sign Up</h1>
					<div className='relative mt-6 h-px bg-gray-300'>
						<div className='absolute left-0 top-0 flex justify-center w-full -mt-2'>
							<span className='bg-white px-4 text-xs text-gray-500 uppercase'>
								with your name & email
							</span>
						</div>
					</div>
					<p
						className={`text-red-500 text-md font-semibold italic mt-6 ${
							!error ? 'hidden' : ''
						}`}
					>
						{error}
					</p>
				</div>
				<div className='my-6'>
					<form onSubmit={handleSignUp}>
						<div className='flex flex-col mb-6'>
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
								value={signUp.name}
								placeholder='John Doe'
								onChange={handleOnChange}
							/>
						</div>
						<div className='flex flex-col mb-6'>
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
								value={signUp.email}
								placeholder='name@company.com'
								onChange={handleOnChange}
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
								value={signUp.password}
								placeholder='Your password'
								onChange={handleOnChange}
							/>
						</div>
						<div className='flex flex-col mb-1'>
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
								value={signUp.confirmPassword}
								placeholder='Password Again'
								onChange={handleOnChange}
							/>
						</div>
						{message && (
							<p className='text-red-500 text-sm font-semibold mb-6'>
								{message}
							</p>
						)}
						<div className='my-6'>
							<button
								className='w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white text-lg font-semibold px-6 py-2 mr-5 shadow-md hover:shadow-lg transition duration-300 ease-in-out'
								type='submit'
							>
								{loading ? (
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
										<p>Signing Up</p>
									</div>
								) : (
									<p>Sign Up</p>
								)}
							</button>
						</div>
						<p className='text-sm text-center text-gray-400'>
							{`Already have an account with you? `}
							<Link
								className='text-md font-semibold text-blue-500 focus:outline-none hover:underline'
								to='/signin'
							>
								Sign In
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
