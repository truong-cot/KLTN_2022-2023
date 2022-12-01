/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains:['sbapi.net88.bet']
	},
	reactStrictMode: true,
	i18n: {
		locales: ['vi', 'en'],
		defaultLocale: 'vi',
	},
};

module.exports = nextConfig;
