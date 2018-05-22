var path = require("path"),
    webpack = require('webpack'),
    config = require('./gulptasks/@configuration.js');

module.exports = [{
    // core file + sourcemap -> dist
    cache: true,
    entry: './lib/lmscore.js',
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/assets/",
        filename: "lmscore.js",
        libraryTarget: "umd",
        library: "$lmscore"
    },
    devtool: "source-map",
    resolve: {
        enforceExtension: false,
        extensions: ['.js'],
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/\.\.\/net\/nodefetchclient/, "../net/nodefetchclientbrowser"),
        new webpack.BannerPlugin({ banner: config.header, entryOnly: true, raw: true }),
    ]
},
{
    // minified core file + sourcemap -> dist
    cache: true,
    entry: './lib/lmscore.js',
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/assets/",
        filename: "lmscore.min.js",
        libraryTarget: "umd",
        library: "$lmscore"
    },
    devtool: "source-map",
    resolve: {
        enforceExtension: false,
        extensions: ['.js']
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/\.\.\/net\/nodefetchclient/, "../net/nodefetchclientbrowser"),
        new webpack.BannerPlugin({ banner: config.header, entryOnly: true, raw: true }),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        })
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true
        // })
    ]
}];
