import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { FaOpencart, FaSearch } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { GiShoppingCart } from 'react-icons/gi';
import { cartSelector } from '../redux/slices/cartSlice';
import { userLoginSelector, logout } from '../redux/slices/userLoginSlice';
import Dropdown from './Dropdown';

const Header = () => {
	const dispatch = useDispatch();
	const { cartItems } = useSelector(cartSelector);
	const { userInfo } = useSelector(userLoginSelector);
	const history = useHistory();
	const [keyword, setKeyword] = useState('');

	const getCartItemsCount = () => {
		const totalCartItems = cartItems.reduce(
			(currentQuantity, currentItem) => currentQuantity + currentItem.quantity,
			0
		);

		return totalCartItems > 99 ? '99+' : totalCartItems;
	};

	const logoutHandler = () => {
		dispatch(logout(history));
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};

	useEffect(() => {
		const userInfo = localStorage.getItem('userInfo')
			? JSON.parse(localStorage.getItem('userInfo'))
			: null;

		if (userInfo) {
			const decoded = jwt_decode(userInfo.token);
			const currentTime = Date.now() / 1000;

			if (decoded.exp < currentTime) {
				dispatch(logout(history));
			}
		}
	}, [dispatch, history]);

	return (
		<header className='container mx-auto h-auto'>
			<div className='flex items-center h-20'>
				<Link className='flex items-center flex-none' to='/'>
					<span className='text-6xl text-gray-500'>
						<FaOpencart />
					</span>
					<div className='bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-400 text-5xl font-black ml-1'>
						Oritsy
					</div>
				</Link>
				<div className='flex-grow'>
					<form className='flex mx-48' onSubmit={handleSearch}>
						<input
							className='w-full px-3 py-2 border-l border-t border-b border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
							type='search'
							name='query'
							placeholder='Search Products...'
							onChange={(e) => setKeyword(e.target.value)}
						/>
						<button
							className='group w-12 flex justify-center items-center bg-yellow-400 hover:bg-yellow-500 border border-yellow-500 focus:outline-none focus:ring-0 transition-all duration-500 ease-in-out'
							type='submit'
						>
							<FaSearch className='text-xl text-white group-hover:text-2xl transition-all duration-500 ease-in-out' />
						</button>
					</form>
				</div>
				<div className='flex items-center flex-none'>
					{userInfo ? (
						<Dropdown
							name={userInfo?.name}
							email={userInfo?.email}
							isAdmin={userInfo?.isAdmin}
							logout={logoutHandler}
						/>
					) : (
						<Link
							className='flex items-center bg-gradient-to-r from-yellow-400 to-red-400 text-white font-semibold uppercase px-6 py-2 mr-5 shadow-md hover:shadow-lg transition duration-300 ease-in-out'
							to='/signin'
						>
							<span className='mr-2'>Sign in</span>
							<span className='text-xl'>
								<FiLogIn />
							</span>
						</Link>
					)}
					<Link className='text-4xl text-gray-500' to='/cart'>
						<span className='relative inline-block rounded-full p-2 hover:bg-gray-50 transition duration-500 ease-in-out'>
							<GiShoppingCart />
							<span
								className={`absolute top-3 right-1 items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-400 rounded-full transition duration-500 ease-in-out ${
									getCartItemsCount() === 0 ? 'hidden' : 'inline-flex'
								}`}
							>
								{getCartItemsCount()}
							</span>
						</span>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
