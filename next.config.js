const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
const withTM = require('next-transpile-modules')([])

const nextConfig = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		// config.optimization = {
		// 	minimizer: [
		// 		new UglifyJSPlugin({
		// 			uglifyOptions: {
		// 				compress: {
		// 					drop_console: isProd,
		// 				},
		// 			},
		// 		}),
		// 	],
		// };
		return config
	},
}

module.exports = withTM(nextConfig)
