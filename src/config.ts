import type { LicenseConfig, NavBarConfig, ProfileConfig, SiteConfig } from './types/config';
import { LinkPreset } from './types/config';

export const siteConfig: SiteConfig = {
	title: '',
	subtitle: 'Demo Site',
	lang: 'fa', // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: './assets/images/banner.png', // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: 'center', // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: '', // Credit text to be displayed
			url: '', // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		// {
		// 	name: "GitHub",
		// 	url: "https://github.com/saicaca/fuwari", // Internal links should not include the base path, as it is automatically added
		// 	external: true, // Show an external link icon and will open in a new tab
		// },
	],
};

export const profileConfig: ProfileConfig = {
	avatar: 'assets/images/demo-avatar.png', // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: 'نرگس شفازاده',
	bio: ' از حل مسئله لذت می‌ برم ودوست دارم این مهارت رو در جهت خلق کردن که برای من ارزش محسوب میشه استفاده کنم در حال حاضر وقتم رو روی یادگیری و ساختن نرم افزار ها و  راهکارهای نرم افزاری اختصاص میدم  .',
	links: [
		{
			name: 'Steam',
			icon: 'fa6-brands:linkedin',
			url: 'https://www.linkedin.com/in/narges-shafazadeh/',
		},
		{
			name: 'GitHub',
			icon: 'fa6-brands:github',
			url: 'https://github.com/shafazadeh',
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: false,
	name: '',
	url: '',
};
