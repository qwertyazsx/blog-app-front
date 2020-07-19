const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                use: ['babel-loader'],
                exclude: ['/node_modules'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: ['/node_modules'],
            },
            {
                test: /\.(otf|ttf|woff|woff2)$/,
                use: ['file-loader'],
                exclude: ['/node_modules'],
            },
        ],
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname + '/build'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname + '/build'),
        publicPath: '/',
        inline: true,
        hot: true,
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
    },
    plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
};
