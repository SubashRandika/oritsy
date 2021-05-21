import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
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

export default PrivateRoute;
