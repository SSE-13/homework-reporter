/**
 * Created by wander on 15/10/12.
 */
var path = require('path');
var webpack = require('webpack');
var node_modules = path.resolve(__dirname,'node_modules');

var config = {
    entry: {
        app: path.resolve(__dirname,'src/main.tsx'),
        vendors: ['react']
    },
     resolve: {
        extensions: ['', '.js', '.ts', '.tsx']
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js')
    ]
};

module.exports = config;