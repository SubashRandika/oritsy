import React from 'react';
import { FaOpencart } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { GiShoppingCart } from 'react-icons/gi';

const Header = () => {
	return (
		<header className='container mx-auto h-auto'>
			<div className='flex items-center h-20'>
				<div className='flex items-center flex-none'>
					<span className='text-6xl text-gray-500'>
						<FaOpencart />
					</span>
					<div className='bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-400 text-5xl font-black ml-1'>
						Oritsy
					</div>
				</div>
				<div className='flex-grow'></div>
				<div className='flex items-center flex-none'>
					<button className='flex items-center bg-red-400 rounded-full font-bold text-white px-6 py-2 focus:outline-none transition duration-300 ease-in-out hover:bg-red-500 mr-5'>
						<span className='mr-2'>Sign in</span>
						<span className='text-xl'>
							<FiLogIn />
						</span>
					</button>
					<span className='text-5xl text-gray-500'>
						<GiShoppingCart />
					</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
