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
		},
		boxShadow: {
			sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
			DEFAULT:
				'0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
			md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
			lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
			xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
			radio: '0px 0px 0px 2px rgba(255, 255, 255, 1) inset',
			inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
			none: 'none'
		}
	},
	variants: {
		extend: {
			scale: ['group-hover'],
			opacity: ['disabled'],
			backgroundColor: ['checked'],
			boxShadow: ['checked']
		}
	},
	plugins: []
};
