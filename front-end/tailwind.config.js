module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				facebook: '#3b5998',
				twitter: '#1da1f2',
				linkedin: '#0a66c2',
				github: '#211F1F',
				pinterest: '#bd081c'
			}
		}
	},
	variants: {
		extend: {
			scale: ['group-hover'],
			opacity: ['disabled']
		}
	},
	plugins: []
};
