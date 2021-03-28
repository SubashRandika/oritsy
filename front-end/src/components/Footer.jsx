import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className='bg-gray-100'>
			<div className='container flex flex-row mx-auto py-4 px-5 '>
				<p className='text-gray-600 text-sm text-center sm:text-left'>
					© 2021 at Oritsy — by
					<a
						href='https://twitter.com/RodrigoSubash'
						rel='noopener noreferrer'
						className='text-blue-400 ml-1'
						target='_blank'
					>
						SubashRandika
					</a>
				</p>
				<span className='inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start'>
					<a
						className='text-gray-500 text-xl mr-2 hover:text-facebook transition duration-500 ease-in-out transform hover:scale-125'
						href='https://www.facebook.com/subash.rodrigo'
						rel='noopener noreferrer'
						target='_blank'
					>
						<FaFacebookF />
					</a>
					<a
						className='text-gray-500 text-xl mr-2 hover:text-twitter transition duration-500 ease-in-out transform hover:scale-125'
						href='https://twitter.com/RodrigoSubash'
						rel='noopener noreferrer'
						target='_blank'
					>
						<FaTwitter />
					</a>
					<a
						className='text-gray-500 text-xl mr-2 hover:text-linkedin transition duration-500 ease-in-out transform hover:scale-125'
						href='https://www.linkedin.com/in/subash-rodrigo-23467762/'
						rel='noopener noreferrer'
						target='_blank'
					>
						<FaLinkedinIn />
					</a>
					<a
						className='text-gray-500 text-xl hover:text-github transition duration-500 ease-in-out transform hover:scale-125'
						href='https://github.com/SubashRandika'
						rel='noopener noreferrer'
						target='_blank'
					>
						<FaGithub />
					</a>
				</span>
			</div>
		</footer>
	);
};

export default Footer;
