import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';

const TopProductsCarousel = ({ products }) => {
	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 1
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1
		}
	};

	return (
		<Carousel
			className='bg-gradient-to-t from-yellow-50 via-yellow-200 to-yellow-400 p-12'
			responsive={responsive}
			infinite
			autoPlay
			showDots
			autoPlaySpeed={4000}
		>
			{products.map((product) => (
				<Link
					className='flex justify-center items-center'
					key={product._id}
					to={`/product/${product._id}`}
				>
					<img
						className='object-contain h-60 px-4'
						src={product.image}
						alt={product.name}
					/>
					<div className='flex flex-col'>
						<h1 className='text-4xl px-6 font-bold text-gray-700 w-96'>
							{product.name}
						</h1>
						<h1 className='text-3xl px-6 py-4 font-extrabold text-yellow-700 w-96'>
							$ {product.price}
						</h1>
					</div>
				</Link>
			))}
		</Carousel>
	);
};

TopProductsCarousel.propTypes = {
	products: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TopProductsCarousel;
