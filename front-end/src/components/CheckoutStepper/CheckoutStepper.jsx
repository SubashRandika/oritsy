import React from 'react';
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
			<StepLink type={stepStatus[0]} text='Sign In'>
				<GoSignIn className='w-full h-full' />
			</StepLink>
			<div
				className={`flex-auto border-t transition duration-500 ease-in-out ${
					stepStatus.length >= 2 ? 'border-red-400' : 'border-gray-300'
				}`}
			></div>
			<StepLink type={stepStatus[1]} text='Shipping'>
				<FaShippingFast className='w-full h-full' />
			</StepLink>
			<div
				className={`flex-auto border-t transition duration-500 ease-in-out ${
					stepStatus.length >= 3 ? 'border-red-400' : 'border-gray-300'
				}`}
			></div>
			<StepLink type={stepStatus[2]} text='Payment'>
				<FaRegCreditCard className='w-full h-full' />
			</StepLink>
			<div
				className={`flex-auto border-t transition duration-500 ease-in-out ${
					stepStatus.length >= 4 ? 'border-red-400' : 'border-gray-300'
				}`}
			></div>
			<StepLink type={stepStatus[3]} text='Place Order'>
				<FaCartArrowDown className='w-full h-full' />
			</StepLink>
		</div>
	);
};

export default CheckoutStepper;
