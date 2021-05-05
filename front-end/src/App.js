import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

const App = () => {
	return (
		<Router>
			<div className='flex flex-col h-screen'>
				<Header />
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/product/:id'>
						<ProductDetails />
					</Route>
					<Route path='/cart/:id?'>
						<Cart />
					</Route>
				</Switch>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
