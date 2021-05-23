import React from 'react';
import PropTypes from 'prop-types';
import {
	FaCartArrowDown,
	FaShippingFast,
	FaRegCreditCard
} from 'react-icons/fa';
import { GoSignIn } from 'react-icons/go';
import StepLink from './StepLink';

const CheckoutStepper = ({ stepStatus }) => {
	return (
		<div className='flex items-center'>
			<StepLink
				type={stepStatus[0]}
				text='Sign In'
				icon={<GoSignIn className='w-full h-full' />}
			/>
			<div
				className={`flex-auto border-t transition duration-500 ease-in-out ${
					stepStatus.length >= 2 ? 'border-red-400' : 'border-gray-300'
				}`}
			></div>
			<StepLink
				type={stepStatus[1]}
				text='Shipping'
				icon={<FaShippingFast className='w-full h-full' />}
			/>
			<div
				className={`flex-auto border-t transition duration-500 ease-in-out ${
					stepStatus.length >= 3 ? 'border-red-400' : 'border-gray-300'
				}`}
			></div>
			<StepLink
				type={stepStatus[2]}
				text='Payment'
				icon={<FaRegCreditCard className='w-full h-full' />}
			/>
			<div
				className={`flex-auto border-t transition duration-500 ease-in-out ${
					stepStatus.length >= 4 ? 'border-red-400' : 'border-gray-300'
				}`}
			></div>
			<StepLink
				type={stepStatus[3]}
				text='Place Order'
				icon={<FaCartArrowDown className='w-full h-full' />}
			/>
		</div>
	);
};

CheckoutStepper.propTypes = {
	stepStatus: PropTypes.arrayOf(PropTypes.string)
};

export default CheckoutStepper;
