import React from 'react';
import PropTypes from 'prop-types';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, ratingStyle, textStyle }) => {
	return (
		<>
			<div className='flex'>
				<span className={ratingStyle}>
					{value >= 1 ? (
						<FaStar />
					) : value >= 0.5 ? (
						<FaStarHalfAlt />
					) : (
						<FaRegStar />
					)}
				</span>
				<span className={ratingStyle}>
					{value >= 2 ? (
						<FaStar />
					) : value >= 1.5 ? (
						<FaStarHalfAlt />
					) : (
						<FaRegStar />
					)}
				</span>
				<span className={ratingStyle}>
					{value >= 3 ? (
						<FaStar />
					) : value >= 2.5 ? (
						<FaStarHalfAlt />
					) : (
						<FaRegStar />
					)}
				</span>
				<span className={ratingStyle}>
					{value >= 4 ? (
						<FaStar />
					) : value >= 3.5 ? (
						<FaStarHalfAlt />
					) : (
						<FaRegStar />
					)}
				</span>
				<span className={ratingStyle}>
					{value >= 5 ? (
						<FaStar />
					) : value >= 4.5 ? (
						<FaStarHalfAlt />
					) : (
						<FaRegStar />
					)}
				</span>
			</div>
			<div className={textStyle}>{text}</div>
		</>
	);
};

Rating.defaultProps = {
	ratingStyle: 'text-yellow-500 text-lg',
	textStyle: 'text-gray-500 my-2'
};

Rating.propTypes = {
	value: PropTypes.number,
	text: PropTypes.string.isRequired,
	ratingStyle: PropTypes.string,
	textStyle: PropTypes.string
};

export default Rating;
