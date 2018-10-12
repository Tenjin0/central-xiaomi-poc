const path = require('path');
var webpack = require('webpack')

var HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	mode: "none",
    entry: {
        app: [path.join(__dirname, './src/index.tsx'), 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router-dom', 'redux-thunk', 'react-router-redux', 'graphql', 'apollo-boost', 'graphql-tag', '@material-ui/core', '@material-ui/icons']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    devtool: 'source-map',
	resolve: {
		extensions: ['mjs', '.js', '.jsx', '.json', '.ts', '.tsx'], // .mjs must be before .js
		modules: [path.resolve(__dirname, "..", "node_modules", "client", "node_modules")]

	},
	resolveLoader: {
		modules: [path.resolve(__dirname, "..", "node_modules", "client", "node_modules")]
	},
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
			},
			{
				test: /\.mjs$/, // for graphql
				include: /node_modules/,
				type: "javascript/auto",
			},
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader",  exclude: [/node_modules/, /build/, /__test__/],}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'app', 'index.html') }),
        new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
	  namedModules: true,
	  splitChunks: {
		name: 'vendor',
		minChunks: 2
	  }
	}
}

module.exports = config
