import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckoutStepper from '../components/CheckoutStepper/CheckoutStepper';
import MetaInfo from '../components/MetaInfo';
import { cartSelector, storePaymentMethod } from '../redux/slices/cartSlice';

const Payment = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { paymentMethod } = useSelector(cartSelector);
	const [payMethod, setPayMethod] = useState(paymentMethod);

	const handlePaymentMethodSave = (e) => {
		e.preventDefault();
		dispatch(storePaymentMethod(payMethod));
		history.push('/place-order');
	};

	const handleOnChange = (e) => {
		setPayMethod(e.target.value);
	};

	return (
		<>
			<MetaInfo title='Oritsy | Payments' />
			<main className='mx-32 h-full my-6'>
				<div className='max-w-4xl mx-auto'>
					<CheckoutStepper stepStatus={['outline', 'outline', 'active']} />
				</div>
				<div className='max-w-md mx-auto mt-16'>
					<h1 className='text-2xl font-semibold mb-10 text-center'>
						Payment Method
					</h1>
					<form onSubmit={handlePaymentMethodSave}>
						<p className='text-lg text-gray-600 mb-6 font-semibold'>
							Select your payment method
						</p>
						<div className='group flex items-center ml-6 mb-2'>
							<input
								id='paypal'
								className='w-4 h-4 flex items-center justify-center rounded-full border border-yellow-600 transition-transform duration-200 ease-in transform group-hover:scale-110 appearance-none checked:bg-yellow-500 checked:shadow-radio cursor-pointer'
								type='radio'
								name='paymentMethod'
								value='PayPal'
								onChange={handleOnChange}
								checked={payMethod === 'PayPal' ? true : false}
							/>
							<label
								className='ml-2 cursor-pointer text-gray-700'
								htmlFor='paypal'
							>
								PayPal or Credit Card
							</label>
						</div>
						<div className='group flex items-center ml-6 mb-4'>
							<input
								id='stripe'
								className='w-4 h-4 flex items-center justify-center rounded-full border border-yellow-600 transition-transform duration-200 ease-in transform group-hover:scale-110 appearance-none checked:bg-yellow-500 checked:shadow-radio cursor-pointer'
								type='radio'
								name='paymentMethod'
								value='Stripe'
								onChange={handleOnChange}
								checked={payMethod === 'Stripe' ? true : false}
							/>
							<label
								className='ml-2 cursor-pointer text-gray-700'
								htmlFor='stripe'
							>
								Stripe
							</label>
						</div>
						<p className='text-sm text-gray-500'>
							<span className='text-lg text-red-600 font-semibold'>*</span>{' '}
							Currently we support only PayPal. Stripe support will be available
							soon.
						</p>
						<div className='my-12 w-48'>
							<button
								className='w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white text-lg font-semibold px-6 py-2 mr-5 shadow-md hover:shadow-lg transition duration-300 ease-in-out'
								type='submit'
							>
								Continue
							</button>
						</div>
					</form>
				</div>
			</main>
		</>
	);
};

export default Payment;
