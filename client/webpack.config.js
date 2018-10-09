const path = require('path');
var webpack = require('webpack')

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "none",
    entry: {
        app: [path.join(__dirname, './src/app/App.tsx'), 'webpack-hot-middleware/client'],
        vendor: ['react/index.js', 'react-dom/index.js', 'redux/lib/redux.js']
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
    ]
}
