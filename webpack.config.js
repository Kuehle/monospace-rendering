module.exports = {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
    },
    output: {
        globalObject: 'this',
        libraryTarget: 'umd',
        library: 'MonospaceRendering',
    },
    resolve: { extensions: ['.ts', '.js', '.json'] },
}
