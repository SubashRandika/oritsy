import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const MetaInfo = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords} />
		</Helmet>
	);
};

MetaInfo.defaultProps = {
	title: 'Welcome to Oritsy | Home',
	description:
		'One stop shop for buy or sell any kind products for the cheapest prices',
	keywords:
		'fashion, home, beauty, electronics, Alexa Devices, sporting goods, toys, automotive, pets, baby, books, video games, musical instruments, office supplies'
};

MetaInfo.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	keywords: PropTypes.string
};

export default MetaInfo;
