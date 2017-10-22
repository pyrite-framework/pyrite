const path = require('path')

module.exports = {
	entry: path.resolve(__dirname, './src/index'),
	output: {
		path: path.resolve(__dirname, './public'),
		filename: 'js/app.js'
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loaders: ['ts-loader']
			}
		]
	}
}