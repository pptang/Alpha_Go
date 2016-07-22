module.exports = {
    entry: [
        './js/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', "stage-1"]
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
