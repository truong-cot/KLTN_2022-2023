/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['res.cloudinary.com', 'd-themes.com', 'futbolita.com'],
	},
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = nextConfig;
