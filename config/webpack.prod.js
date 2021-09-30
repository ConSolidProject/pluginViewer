const {merge} = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJSON = require('../package.json')
const deps = packageJSON.dependencies
const prodConfig = {
    mode: 'production',
    output: {
        filename: "[name].[contenthash].js",
        publicPath: packageJSON.domain
    },
    plugins: [
        new ModuleFederationPlugin({
            name: packageJSON.name,
            filename: 'remoteEntry.js',
            exposes: {
                "./index": "./src/bootstrap"
            },
            shared: {
                ...packageJSON.dependencies,
                react: {
                  singleton: true,
                  requiredVersion: deps.react,
                },
                "react-dom": {
                  singleton: true,
                  requiredVersion: deps["react-dom"],
                },
                "@material-ui/core": {
                  singleton: true,
                  requiredVersion: deps["@material-ui/core"],
                },
                "@material-ui/icons": {
                  singleton: true,
                  requiredVersion: deps["@material-ui/icons"],
                },
                events: {eager: true, requiredVersion: deps.events}}        })
    ]
}

module.exports = merge(commonConfig, prodConfig)