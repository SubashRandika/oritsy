import React from 'react';

const ConfirmModal = ({ title, body, icon, show, confirmAction, onCancel }) => {
	const handleConfirm = () => {
		confirmAction();
	};

	return (
		<div
			className={`fixed z-50 inset-0 overflow-y-auto ${
				show ? 'block' : 'hidden'
			}`}
			aria-labelledby='modal-title'
			role='dialog'
			aria-modal='true'
		>
			<div className='block min-h-screen pt-4 px-4 pb-20 text-center'>
				<div
					className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${
						show ? 'animate-backdrop-in' : ''
					}`}
					aria-hidden='true'
				></div>
				<span className='hidden' aria-hidden='true'>
					&#8203;
				</span>
				<div
					className={`inline-block bg-white text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full ${
						show ? 'animate-confirm-in' : ''
					}`}
				>
					<div className='bg-white p-6'>
						<div className='flex items-start'>
							{icon && (
								<div className='flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-100 pb-1'>
									{icon}
								</div>
							)}
							<div className='mt-3 ml-4 text-left'>
								<h3
									className='text-lg leading-6 font-semibold text-gray-900'
									id='modal-title'
								>
									{title}
								</h3>
								<div className='mt-2'>
									<p className='text-sm text-gray-500'>{body}</p>
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-row-reverse bg-gray-50 px-6 py-3 '>
						<button
							type='button'
							className='inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-red-500 font-semibold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-3 w-auto text-md'
							onClick={handleConfirm}
						>
							Confirm
						</button>
						<button
							type='button'
							className='mt-3 w-full inline-flex justify-center border border-gray-300 shadow-sm px-4 py-2 bg-white font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto text-md'
							onClick={onCancel}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
