import React from 'react';
import PropTypes from 'prop-types';

const StepLink = ({ type, text, icon }) => {
	return (
		<>
			{type === 'active' ? (
				<div className='group flex items-center text-white relative'>
					<div className='rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 cursor-pointer bg-red-400 border-red-400'>
						{icon}
					</div>
					<div className='absolute top-0 -ml-10 text-center mt-16 w-32 text-sm font-medium uppercase group-hover:underline text-red-400'>
						{text}
					</div>
				</div>
			) : type === 'outline' ? (
				<div className='flex items-center relative group text-red-400'>
					<div className='rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border cursor-pointer border-red-400'>
						{icon}
					</div>
					<div className='absolute top-0 -ml-10 text-center mt-16 w-32 text-sm font-medium uppercase group-hover:underline text-red-400'>
						{text}
					</div>
				</div>
			) : (
				<div className='flex items-center text-gray-500 relative'>
					<div className='rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border cursor-not-allowed border-gray-300'>
						{icon}
					</div>
					<div className='absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500'>
						{text}
					</div>
				</div>
			)}
		</>
	);
};

StepLink.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string.isRequired,
	icon: PropTypes.node
};

export default StepLink;
