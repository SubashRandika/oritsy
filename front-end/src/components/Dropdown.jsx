import React, { createRef, useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Dropdown = ({ name, email, logout }) => {
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
			className='dropdown relative inline-block text-left z-50'
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
				<div className='absolute right-2 w-56 mt-3.5 origin-top-right bg-white border border-gray-200 divide-y divide-gray-200 shadow-lg outline-none'>
					<div className='px-4 py-3'>
						<p className='text-md'>Signed in as :</p>
						<p className='text-md text-blue-400 pt-1'>{email}</p>
					</div>
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

export default Dropdown;
