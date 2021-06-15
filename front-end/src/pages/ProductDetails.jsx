import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiMail, FiChevronDown } from 'react-icons/fi';
import { GiShoppingCart } from 'react-icons/gi';
import { FaStar, FaRegStar, FaCommentSlash } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import Rating from 'react-rating';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { userLoginSelector } from '../redux/slices/userLoginSlice';
import { fetchProductDetails } from '../redux/actions/productActions';
import { productDetailsSelector } from '../redux/slices/productDetailsSlice';
import {
	productReviewSelector,
	resetProductReview
} from '../redux/slices/productReviewSlice';
import { addToCart } from '../redux/actions/cartActions';
import { reviewProduct } from '../redux/actions/productActions';
import Loader from '../components/Loader/Loader';
import Alert from '../components/Alert';
import MetaInfo from '../components/MetaInfo';

dayjs.extend(relativeTime);

const ProductDetails = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { userInfo } = useSelector(userLoginSelector);
	const { product, loading, error } = useSelector(productDetailsSelector);
	const { loading: isReviewing, success } = useSelector(productReviewSelector);
	const [reviewInfo, setReviewInfo] = useState({
		rating: 0,
		comment: ''
	});
	const [quantity, setQuantity] = useState(1);
	const { id } = useParams();

	useEffect(() => {
		if (success) {
			setReviewInfo({
				rating: 0,
				comment: ''
			});
		}

		dispatch(fetchProductDetails(id));
		resetProductReview();
	}, [dispatch, id, success]);

	const handleAddToCart = () => {
		dispatch(addToCart({ id, quantity }));
		history.push('/cart');
	};

	const handleReviewSubmit = (e) => {
		e.preventDefault();
		dispatch(
			reviewProduct({
				productId: id,
				review: {
					rating: reviewInfo.rating,
					comment: reviewInfo.comment
				}
			})
		);
	};

	const handleRatingChange = (value) => {
		setReviewInfo({
			...reviewInfo,
			rating: value
		});
	};

	const handleCommentChange = (e) => {
		setReviewInfo({
			...reviewInfo,
			comment: e.target.value
		});
	};

	return (
		<React.Fragment>
			{loading ? (
				<div className='w-full h-full flex flex-col items-center justify-center'>
					<Loader />
					<div className='text-lg text-gray-500 font-semibold'>Loading...</div>
				</div>
			) : error ? (
				<div className='mx-32 h-full'>
					<div className='flex mt-8'>
						<Alert
							type='error'
							header='Error Occurred'
							body='Something went wrong'
							icon={<AiFillCloseCircle />}
						/>
					</div>
				</div>
			) : (
				<>
					<MetaInfo title={`Oritsy | ${product?.name}`} />
					<main className='mx-32 py-16'>
						<div className='flex'>
							<div className='flex relative h-96 w-1/2'>
								<img
									className='w-full max-h-96 object-contain'
									src={product?.image}
									alt='Product'
								/>
							</div>
							<div className='flex flex-col w-1/2 px-5'>
								<h2 className='text-md title-font text-gray-500 tracking-widest uppercase'>
									{product?.brand}
								</h2>
								<h1 className='text-gray-900 text-3xl title-font font-semibold my-1.5'>
									{product?.name}
								</h1>
								<div className='flex items-center divide-x-2 divide-gray-300'>
									<div className='flex items-center py-2 pr-5'>
										<Rating
											className='pt-1'
											readonly
											emptySymbol={
												<FaRegStar className='text-gray-300 text-2xl' />
											}
											fullSymbol={
												<FaStar className='text-yellow-500 text-2xl' />
											}
											initialRating={product?.rating}
										/>
										<span className='text-lg text-gray-500 ml-5'>{`${product?.numReviews} reviews`}</span>
									</div>
									<div className='flex items-center pl-5'>
										<h2 className='text-blue-400 mr-4'>Share</h2>
										<span className='text-2xl text-gray-400 cursor-pointer mr-2 transition duration-500 ease-in-out transform hover:scale-125'>
											<FiMail />
										</span>
										<span className='text-2xl text-facebook cursor-pointer mr-2 transition duration-500 ease-in-out transform hover:scale-125'>
											<FaFacebook />
										</span>
										<span className='text-2xl text-twitter cursor-pointer mr-2 transition duration-500 ease-in-out transform hover:scale-125'>
											<FaTwitter />
										</span>
										<span className='text-2xl text-pinterest cursor-pointer mr-2 transition duration-500 ease-in-out transform hover:scale-125'>
											<FaPinterest />
										</span>
									</div>
								</div>
								<p className='my-4 w-2/3'>{product?.description}</p>
								<div className='flex items-center my-3'>
									<h2
										className={`text-xl font-semibold mr-4 ${
											product?.countInStock > 0
												? 'text-green-600'
												: 'text-red-500'
										}`}
									>
										{product?.countInStock > 0 ? 'In Stock.' : 'Out Of Stock.'}
									</h2>
									<div
										className={`relative ${
											product?.countInStock === 0 ? 'hidden' : 'inline-flex'
										}`}
									>
										<span className='w-2 h-4 absolute top-0 right-0 my-3 mr-5 pointer-events-none'>
											<FiChevronDown />
										</span>
										<span className='absolute top-0 left-0 my-2 ml-4'>
											Qty:
										</span>
										<select
											className={`border border-gray-300 rounded-full text-gray-600 h-10 pl-14 pr-8 bg-white focus:outline-none appearance-none transition duration-500 ease-in-out ${
												product?.countInStock === 0
													? 'hover:text-gray-600 cursor-not-allowed'
													: 'hover:border-yellow-500 cursor-pointer'
											}`}
											value={quantity}
											onChange={(e) => setQuantity(e.target.value)}
										>
											{product?.countInStock > 0 ? (
												Array.from(
													{ length: product?.countInStock },
													(_, index) => index + 1
												).map((qty, idx) => (
													<option key={idx} value={qty}>
														{qty}
													</option>
												))
											) : (
												<option key='0'>0</option>
											)}
										</select>
									</div>
								</div>
								<hr className='w-2/3 my-3 bg-gradient-to-r from-white via-gray-300 to-white h-0.5 border-0' />
								<div className='flex justify-end w-2/3 my-3'>
									<button
										disabled={product.countInStock === 0}
										className={`flex items-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white font-semibold px-6 py-2 mr-5 shadow-md ${
											product.countInStock === 0
												? 'shadow-none cursor-not-allowed'
												: 'hover:shadow-lg'
										} transition duration-300 ease-in-out disabled:opacity-50`}
										onClick={handleAddToCart}
									>
										<span className='uppercase mr-2'>Add to cart</span>
										<span className='text-2xl'>
											<GiShoppingCart />
										</span>
									</button>
								</div>
							</div>
						</div>
						<div className='p-10'>
							<h1 className='text-2xl font-bold border-b pb-2'>Reviews</h1>
							<div className='flex mt-8'>
								<div className='w-1/2'>
									{userInfo ? (
										<form onSubmit={handleReviewSubmit}>
											<div className='flex flex-col mb-6'>
												<label
													className='font-semibold text-sm text-gray-600 mb-4'
													htmlFor='rating'
												>
													Rating
												</label>
												<Rating
													emptySymbol={
														<FaRegStar className='text-gray-300 text-3xl' />
													}
													fullSymbol={
														<FaStar className='text-yellow-500 text-3xl' />
													}
													initialRating={reviewInfo.rating}
													onChange={handleRatingChange}
												/>
											</div>
											<div className='flex flex-col mb-6'>
												<label
													className='font-semibold text-sm text-gray-600 mb-2'
													htmlFor='comment'
												>
													Comment
												</label>
												<textarea
													className='w-full px-3 py-2 border border-gray-300 placeholder-gray-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:border-yellow-500'
													name='comment'
													rows={3}
													placeholder='Enter your review comment here'
													value={reviewInfo.comment || ''}
													onChange={handleCommentChange}
												/>
											</div>
											<div className='mt-10 flex justify-end'>
												<button
													className='w-40 bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-400 text-white text-lg font-semibold px-6 py-1.5 shadow-md hover:shadow-lg transition duration-300 ease-in-out'
													type='submit'
												>
													{isReviewing ? (
														<div className='flex justify-center items-center'>
															<svg
																className='animate-spin h-5 w-5 text-white mr-3'
																xmlns='http://www.w3.org/2000/svg'
																fill='none'
																viewBox='0 0 24 24'
															>
																<circle
																	className='opacity-25'
																	cx='12'
																	cy='12'
																	r='10'
																	stroke='currentColor'
																	strokeWidth='4'
																></circle>
																<path
																	className='opacity-75'
																	fill='currentColor'
																	d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
																></path>
															</svg>
															<p>Submitting</p>
														</div>
													) : (
														<p>Submit</p>
													)}
												</button>
											</div>
										</form>
									) : (
										<div className='h-56 flex justify-center items-center text-lg'>
											<h1>
												Please&nbsp;
												<Link
													className='text-blue-400 font-semibold hover:underline'
													to='/signin'
												>
													sign in
												</Link>
												&nbsp;to write your review now.
											</h1>
										</div>
									)}
								</div>
								<div className='w-1/2 px-20'>
									{product.reviews.length === 0 && (
										<div className='h-56 flex flex-col justify-center items-center'>
											<FaCommentSlash className='text-6xl text-gray-200' />
											<h2 className='text-2xl font-semibold py-2'>
												No reviews yet for this product.
											</h2>
										</div>
									)}
									{product.reviews.map((review) => (
										<div
											key={review._id}
											className='flex flex-col border-b py-4'
										>
											<div className='flex'>
												<Rating
													readonly
													emptySymbol={
														<FaRegStar className='text-gray-300 text-xl' />
													}
													fullSymbol={
														<FaStar className='text-yellow-500 text-xl' />
													}
													initialRating={review.rating}
												/>
												<h1 className='px-4 text-gray-700'>
													by {review.name},
												</h1>
												<h1 className='text-sm pt-0.5 text-gray-400'>
													{dayjs().diff(dayjs(review.createdAt), 'd') >= 1
														? dayjs(review.createdAt).format(
																'MMMM D, YYYY h:mm a'
														  )
														: dayjs(review.createdAt).fromNow()}
												</h1>
											</div>
											<p className='mt-3'>{review.comment}</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</main>
				</>
			)}
		</React.Fragment>
	);
};

export default ProductDetails;
