import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<Router>
			<div className='flex flex-col h-screen'>
				<ToastContainer />
				<Header />
				<Switch>
					<Route exact path='/signin'>
						<Login />
					</Route>
					<Route path='/product/:id'>
						<ProductDetails />
					</Route>
					<Route path='/cart/:id?'>
						<Cart />
					</Route>
					<Route exact path='/'>
						<Home />
					</Route>
				</Switch>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
