/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	important: '.academy',
	content: ['./src/**/*.{ts,tsx}'],
	presets: [require('@betfinio/components/tailwind-config')],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Rounds', 'sans-serif'],
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
