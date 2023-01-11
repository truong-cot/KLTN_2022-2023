/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['res.cloudinary.com', 'futbolita.com'],
	},
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = nextConfig;
