import React from 'react';
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
			className='bg-gradient-to-t from-yellow-50 via-yellow-200 to-yellow-400 p-10'
			responsive={responsive}
			infinite
			autoPlay
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
					<h1 className='text-4xl px-6 font-bold text-gray-700 w-96'>
						{product.name}
					</h1>
				</Link>
			))}
		</Carousel>
	);
};

export default TopProductsCarousel;
