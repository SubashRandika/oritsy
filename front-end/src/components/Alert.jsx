import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ type, header, body, icon }) => {
	const alertStyles = {
		success: 'bg-green-100 border-green-500 text-green-900',
		warn: 'bg-yellow-100 border-yellow-500 text-yellow-900',
		error: 'bg-red-100 border-red-500 text-red-900',
		info: 'bg-blue-100 border-blue-500 text-blue-900'
	};

	return (
		<div
			className={`w-1/2 border-l-4 px-4 py-3 shadow-md ${alertStyles[type]}`}
			role='alert'
		>
			<div className='flex'>
				{icon && <div className='text-2xl px-2 py-1 text-red-500'>{icon}</div>}
				<div>
					<p className='font-bold'>{header}</p>
					<p className='text-sm'>{body}</p>
				</div>
			</div>
		</div>
	);
};

Alert.propType = {
	type: PropTypes.string.isRequired,
	header: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	icon: PropTypes.node.isRequired
};

export default Alert;
