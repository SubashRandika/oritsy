import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { userLoginSelector } from '../redux/slices/userLoginSlice';

const PrivateRoute = ({ children, ...rest }) => {
	const { userInfo } = useSelector(userLoginSelector);

	return (
		<Route
			{...rest}
			render={({ location }) => {
				return userInfo ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/signin',
							state: {
								from: location
							}
						}}
					/>
				);
			}}
		/>
	);
};

PrivateRoute.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
	rest: PropTypes.object
};

export default PrivateRoute;
