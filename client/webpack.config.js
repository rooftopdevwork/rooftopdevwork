require('dotenv').config({
	path: '../'
});
const path = require('path');
const webpack = require('webpack');

console.log(process.env.DEV_PORT);

module.exports = (proc) => {
	console.log(proc);
	return (
		{
			mode: 'development',
			entry: path.resolve(__dirname, 'src/entry.js'),

			output: {
				// filename: '[name].[chunkhash].js',
				filename: 'bundle.js',
				path: path.resolve(__dirname, 'public'),
			},

			// plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin()],

			module: {
				rules: [
					{
						test: /\.js$/,
						// include: [
						// path.resolve(__dirname, '/client/src')],
						exclude: /node_modules/,
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: ["@babel/plugin-proposal-class-properties"]
						}
					},

					//first thing is sass,
				]
			},
			plugins: [
				new webpack.ProgressPlugin()
			],
			// optimization: {
			// 	splitChunks: {
			// 		cacheGroups: {
			// 			vendors: {
			// 				priority: -10,
			// 				test: /[\\/]node_modules[\\/]/
			// 			}
			// 		},

			// 		chunks: 'async',
			// 		minChunks: 1,
			// 		minSize: 30000,
			// 		name: true
			// 	}
			// },

			devServer: {

				open: true,
				contentBase: path.join(__dirname, 'public'),
				port: 9002,
				proxy: { '**': `http://localhost:4000` }
			}
		}
	)
}
