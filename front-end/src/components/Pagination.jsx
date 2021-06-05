import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ page, pages, keyword = '', isAdmin = false }) => {
	return (
		pages > 1 && (
			<nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px mt-6 self-center'>
				{[...Array(pages).keys()].map((x) => (
					<Link
						key={x + 1}
						className={`${
							x + 1 === page
								? 'z-10 bg-yellow-50 border-yellow-500 text-yellow-600'
								: 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
						}  relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
						to={
							!isAdmin
								? keyword
									? `/search/${keyword}/page/${x + 1}`
									: `/page/${x + 1}`
								: `/admin/product-list/${x + 1}`
						}
					>
						{x + 1}
					</Link>
				))}
			</nav>
		)
	);
};

export default Pagination;
