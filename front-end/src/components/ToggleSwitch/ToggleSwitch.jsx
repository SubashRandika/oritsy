import React from 'react';
import './ToggleSwitch.styles.css';

const ToggleSwitch = ({ isAdmin, handleOnChange }) => {
	return (
		<label htmlFor='isAdmin' className='flex items-center cursor-pointer'>
			<div className='pr-4 select-none'>Is Admin</div>
			<div className='relative'>
				<input
					id='isAdmin'
					name='isAdmin'
					type='checkbox'
					className='hidden'
					checked={isAdmin}
					onChange={handleOnChange}
				/>
				<div className='toggle-path bg-gray-200 w-11 h-6 rounded-full shadow-inner'></div>
				<div className='toggle-circle absolute w-5 h-5 bg-white rounded-full shadow'></div>
			</div>
		</label>
	);
};

export default ToggleSwitch;
