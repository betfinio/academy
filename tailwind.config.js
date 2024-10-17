/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	important: '.academy',
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				quiz: {
					background: '#161A25',
					purple: '#201C40',
				},
			},
			fontFamily: {
				sans: ['Rounds', 'sans-serif'],
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
