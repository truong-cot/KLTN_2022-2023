/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['res.cloudinary.com', 'futbolita.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	reactStrictMode: true,
	swcMinify: true,
	devIndicators: {
		buildActivity: false,
	},
};

module.exports = nextConfig;
