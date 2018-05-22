//******************************************************************************
//* serve.js
//*
//* Defines a custom gulp task for serving up content from the server-root 
//* local folder, setup file/folder watchers so that changes are reflected
//* on file save, and open the default browser to the default html page. 
//******************************************************************************

var gulp = require("gulp"),
    tsc = require("gulp-typescript"),
    PluginError = require('plugin-error'),
    webpack = require('webpack'),
    server = require("webpack-dev-server"),
    config = require("../webpack-serve.config.js"),
    log = require("fancy-log"),
    colors = require("ansi-colors");

gulp.task("serve", (done) => {

    let serverSettings = {
        publicPath: config.output.publicPath,
        stats: {
            colors: true
        },
        https: true
    };

    // Start a webpack-dev-server
    new server(webpack(config), serverSettings).listen(8080, "localhost", (err) => {

        if (err) {
            throw new PluginError("serve", err);
        }

        log("File will be served from:", colors.bgblue(colors.white("https://localhost:8080/assets/lmscore.js")));
    });
});
