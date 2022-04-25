// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), //../api/public
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new ESLintPlugin({
            extensions:['js']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new webpack.ProvidePlugin({ 
            L: 'leaflet', 
            'window.L': 'leaflet', 
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\\.(js|jsx)$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.html', '.js', '.json', '.scss', '.css'],
        alias: {
            leaflet_css: __dirname + "/node_modules/leaflet/dist/leaflet.css",
            leaflet_marker: __dirname +
                "/node_modules/leaflet/dist/images/marker-icon.png",
            leaflet_marker_2x: __dirname +
                "/node_modules/leaflet/dist/images/marker-icon-2x.png",
            leaflet_marker_shadow: __dirname +
                "/node_modules/leaflet/dist/images/marker-shadow.png"
        }
    },
};
