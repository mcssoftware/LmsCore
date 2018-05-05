var path = require("path"),
    pkg = require("./package.json"),
    webpack = require('webpack');

module.exports = {
    // serve config
    cache: true,
    entry: './src/LmsCore.ts',
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
        extensions: ['.ts']
    },
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/\.\.\/net\/nodefetchclient/, "../net/nodefetchclientbrowser"),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: "ts-loader"
                },
                {
                    loader: "string-replace-loader",
                    options: {
                        search: "$$Version$$",
                        replace: pkg.version
                    }
                }]
            },
        ]
    }
};
