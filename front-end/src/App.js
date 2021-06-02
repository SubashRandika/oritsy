import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from 'axios';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import PrivateRoute from './components/PrivateRoute';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import OrderDetails from './pages/OrderDetails';
import UserList from './pages/UserList';
import UserEdit from './pages/UserEdit';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';
import OrderList from './pages/OrderList';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	const [clientId, setClientId] = useState('');

	useEffect(() => {
		const fetchPaypalClientId = async () => {
			const { data: clientKey } = await axios.get('/api/config/paypal');
			setClientId(clientKey);
		};

		fetchPaypalClientId();
	}, []);

	return (
		<PayPalScriptProvider options={{ 'client-id': clientId }}>
			<Router>
				<div className='flex flex-col h-screen'>
					<ToastContainer />
					<Header />
					<Switch>
						<Route exact path='/signin'>
							<Login />
						</Route>
						<Route exact path='/register'>
							<Register />
						</Route>
						<PrivateRoute exact path='/profile'>
							<Profile />
						</PrivateRoute>
						<PrivateRoute exact path='/shipping'>
							<Shipping />
						</PrivateRoute>
						<PrivateRoute exact path='/payment'>
							<Payment />
						</PrivateRoute>
						<PrivateRoute exact path='/place-order'>
							<PlaceOrder />
						</PrivateRoute>
						<Route path='/product/:id'>
							<ProductDetails />
						</Route>
						<Route path='/cart/:id?'>
							<Cart />
						</Route>
						<PrivateRoute exact path='/order/:id'>
							<OrderDetails />
						</PrivateRoute>
						<PrivateRoute exact path='/admin/user-list'>
							<UserList />
						</PrivateRoute>
						<PrivateRoute exact path='/admin/user/:id/edit'>
							<UserEdit />
						</PrivateRoute>
						<PrivateRoute exact path='/admin/product-list'>
							<ProductList />
						</PrivateRoute>
						<PrivateRoute exact path='/admin/product/:id/edit'>
							<ProductEdit />
						</PrivateRoute>
						<PrivateRoute exact path='/admin/order-list'>
							<OrderList />
						</PrivateRoute>
						<Route exact path='/'>
							<Home />
						</Route>
					</Switch>
					<Footer />
				</div>
			</Router>
		</PayPalScriptProvider>
	);
};

export default App;
