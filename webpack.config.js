const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    module: {
        rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
    },
    output: {
        libraryTarget: 'umd',
        library: 'MonospaceRendering',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.js'],
    },
    devtool: 'source-map',
}
