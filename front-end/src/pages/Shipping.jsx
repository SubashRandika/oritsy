import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	cartSelector,
	storeShippingAddressDetails
} from '../redux/slices/cartSlice';
import CheckoutStepper from '../components/CheckoutStepper/CheckoutStepper';

const tostOptions = {
	position: 'top-center',
	autoClose: '10000',
	type: 'error'
};

const Shipping = () => {
	const { shippingAddress } = useSelector(cartSelector);
	const [shippingInfo, setShippingInfo] = useState({
		address: shippingAddress.address,
		city: shippingAddress.city,
		postalCode: shippingAddress.postalCode,
		country: shippingAddress.country
	});
	const dispatch = useDispatch();
	const history = useHistory();

	const handleShippingAddressSave = (e) => {
		e.preventDefault();

		if (!shippingInfo?.address) {
			toast('Address field is required', tostOptions);
			return;
		}

		if (!shippingInfo?.city) {
			toast('City field is required', tostOptions);
			return;
		}

		if (!shippingInfo?.postalCode) {
			toast('Postal Code field is required', tostOptions);
			return;
		}

		if (!shippingInfo?.country) {
			toast('Country field is required', tostOptions);
			return;
		}

		dispatch(storeShippingAddressDetails({ ...shippingInfo }));
		history.push('/payment');
	};

	const handleOnChange = (e) => {
		setShippingInfo({
			...shippingInfo,
			[e.target.name]: e.target.value
		});
	};

	return (
		<main className='container m-auto h-full my-6'>
			<div className='max-w-4xl mx-auto'>
				<CheckoutStepper stepStatus={['outline', 'active']} />
			</div>
			<div className='max-w-md mx-auto mt-16'>
				<h1 className='text-2xl font-semibold mb-6 text-center'>Shipping</h1>
				<form onSubmit={handleShippingAddressSave}>
					<div className='flex flex-col mb-6'>
						<label
							className='font-semibold text-sm text-gray-600 mb-2'
							htmlFor='address'
						>
							Address
						</label>
						<input
							className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
							type='text'
							name='address'
							value={shippingInfo.address || ''}
							placeholder='Enter address'
							onChange={handleOnChange}
						/>
					</div>
					<div className='flex flex-col mb-6'>
						<label
							className='font-semibold text-sm text-gray-600 mb-2'
							htmlFor='city'
						>
							City
						</label>
						<input
							className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
							type='text'
							name='city'
							value={shippingInfo.city || ''}
							placeholder='Enter city'
							onChange={handleOnChange}
						/>
					</div>
					<div className='flex flex-col mb-6'>
						<label
							className='font-semibold text-sm text-gray-600 mb-2'
							htmlFor='postalCode'
						>
							Postal Code
						</label>
						<input
							className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
							type='text'
							name='postalCode'
							value={shippingInfo.postalCode || ''}
							placeholder='Enter postal code'
							onChange={handleOnChange}
						/>
					</div>
					<div className='flex flex-col mb-6'>
						<label
							className='font-semibold text-sm text-gray-600 mb-2'
							htmlFor='country'
						>
							Country
						</label>
						<input
							className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
							type='text'
							name='country'
							value={shippingInfo.country || ''}
							placeholder='Enter country'
							onChange={handleOnChange}
						/>
					</div>
					<div className='my-6 w-48'>
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
	);
};

export default Shipping;
