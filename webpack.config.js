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
                test: /\.(c|sc)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: ['/node_modules'],
            },
            {
                test: /\.(otf|ttf|woff|woff2|svg)$/,
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
        host: '0.0.0.0',
        port: 3000,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://[::1]:8080',
            },
        },
    },
    plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
};
