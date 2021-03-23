import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
	return (
		<>
			<Header />
			<div className='h-1/2'>
				<h1>Welcome to Oritsy Shop</h1>
			</div>
			<Footer />
		</>
	);
};

export default App;
