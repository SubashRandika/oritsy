import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { HiChevronDown } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Dropdown = ({ name, email, isAdmin, logout }) => {
	const [isOpen, setOpen] = useState(false);
	const dropdown = createRef();

	const handleMenuOpen = () => {
		setOpen(!isOpen);
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (isOpen && dropdown.current && !dropdown.current.contains(e.target)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdown, isOpen]);

	return (
		<div
			className='dropdown relative inline-block text-left z-20'
			ref={dropdown}
		>
			<div onClick={handleMenuOpen}>
				<button
					className='mx-2 flex justify-center items-center border border-gray-300 px-4 py-2 text-md text-gray-700 hover:text-gray-500 focus:outline-none focus:border-yellow-500 focus:shadow-outline-blue'
					type='button'
				>
					{name}
					<HiChevronDown className='text-2xl ml-2 text-gray-600' />
				</button>
			</div>
			<div
				className={`dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95 ${
					!isOpen ? 'opacity-0 invisible' : 'opacity-1 visible'
				}`}
				role='menu'
				aria-orientation='vertical'
				aria-labelledby='menu-button'
				tabIndex='-1'
			>
				<div className='absolute right-2 w-60 mt-3.5 origin-top-right bg-white border border-gray-200 divide-y divide-gray-200 shadow-lg outline-none'>
					<div className='px-4 py-3'>
						<p className='text-md'>Signed in as :</p>
						<p className='text-md text-blue-400 pt-1'>{email}</p>
					</div>
					{isAdmin ? (
						<div className='py-1'>
							<Link
								className='text-gray-700 hover:text-gray-800 flex justify-between w-full px-4 py-2 text-md leading-5 text-left hover:bg-gray-100'
								to='/admin/user-list'
								role='menuitem'
							>
								Users
							</Link>
							<Link
								className='text-gray-700 hover:text-gray-800 flex justify-between w-full px-4 py-2 text-md leading-5 text-left hover:bg-gray-100'
								to='/admin/product-list'
								role='menuitem'
							>
								Products
							</Link>
							<Link
								className='text-gray-700 hover:text-gray-800 flex justify-between w-full px-4 py-2 text-md leading-5 text-left hover:bg-gray-100'
								to='/admin/order-list'
								role='menuitem'
							>
								Orders
							</Link>
						</div>
					) : null}
					<div className='py-1'>
						<Link
							className='text-gray-700 hover:text-gray-800 flex justify-between w-full px-4 py-2 text-md leading-5 text-left hover:bg-gray-100'
							to='/profile'
							role='menuitem'
						>
							Go to profile
						</Link>
						<div
							className='text-gray-700 hover:text-gray-800 flex justify-between w-full px-4 py-2 text-md leading-5 text-left hover:bg-gray-100 cursor-pointer'
							role='menuitem'
							onClick={logout}
						>
							Sign out
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Dropdown.propTypes = {
	name: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	isAdmin: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired
};

export default Dropdown;
