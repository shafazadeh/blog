/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}'],
	darkMode: 'class', // allows toggling dark mode manually
	theme: {
		extend: {
			fontFamily: {
				sans: ['Vazirmatn RD', ...fontFamily.sans],
			},
			transform: 'rotate(-15deg)',
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
