const path = require('path');
var webpack = require('webpack')
const pathToNodeModules = process.env.FROM_PARENT_FOLDER ? path.resolve(__dirname, "..", "node_modules", "client", "node_modules") : path.resolve(__dirname, "node_modules")
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV ? process.env.NODE_ENV === "development" : true

const config = {
	mode: "development",
	entry: {
		app: [path.join(__dirname, './src/index.tsx'), 'webpack-hot-middleware/client'],
		vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router-dom', 'redux-thunk',
			'react-router-redux', 'graphql', 'apollo-boost', 'graphql-tag', '@material-ui/core',
			'@material-ui/icons', '@devexpress/dx-react-core', '@devexpress/dx-react-grid',
			'@devexpress/dx-react-grid-material-ui', 'socket.io-client'
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: "/",
		filename: 'js/[name].bundle.js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['mjs', '.js', '.jsx', '.json', '.ts', '.tsx'], // .mjs must be before .js
		modules: [pathToNodeModules] // this need to be remove in a docker container

	},
	resolveLoader: { // this need to be remove in a docker container
		modules: [pathToNodeModules] 
	},
	module: {
		rules: [{
				test: /\.(ts|tsx)$/,
				loader: 'ts-loader'
			},
			{
				test: /\.mjs$/, // for graphql
				include: /node_modules/,
				type: "javascript/auto",
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader",
				exclude: [/node_modules/, /build/, /__test__/],
			},
			{
				test: /\.(scss|sass|css)$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				  ],
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'app', 'index.html'),
			baseUrl: "/"
		}),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
	  	}),
		new webpack.HotModuleReplacementPlugin()
	],
	// optimization: {
	// 	namedModules: true,
	// 	splitChunks: {
	// 		name: 'vendor',
	// 		minChunks: 2
	// 	}
	// }
}

module.exports = config
