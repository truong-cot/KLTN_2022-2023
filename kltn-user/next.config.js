/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['api.qrserver.com', 'vfdc.com.vn', 'd-themes.com', 'fakestoreapi.com'],
	},
};

module.exports = nextConfig;
