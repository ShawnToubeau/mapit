/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		runtime: "experimental-edge",
		appDir: true,
	},
	/**
	 * this fixes an issue where the generated connect-web code imports protobuffer definitions
	 * with a .js extension even though they are .ts files.
	 * more context can be found here: https://github.com/bufbuild/connect-web/issues/236
	 * the fix is taken from here: https://github.com/bufbuild/connect-web-integration/blob/main/nextjs/next.config.js#L5L14
	 */
	webpack: (config) => {
		config.resolve = {
			...config.resolve,
			extensionAlias: {
				".js": [".ts", ".js"],
			},
		};

		return config;
	},
};

module.exports = nextConfig;
