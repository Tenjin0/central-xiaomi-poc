const path = require('path');
var webpack = require('webpack')

var HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
	mode: "none",
    entry: {
        app: [path.join(__dirname, './src/index.tsx'), 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router-dom', 'redux-thunk', 'react-router-redux']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
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
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
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
