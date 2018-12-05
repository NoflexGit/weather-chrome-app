const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = (env) => {
    return {
        entry: {
            vendor: ["react", "react-dom", "react-router"],
            app: ["babel-polyfill", "./src/index"]
        }
        ,
        output: {
            path: path.join(__dirname, "dist"),
            publicPath: "/",
            filename: "assets/[name].[hash].js",
            chunkFilename: "assets/[name].[chunkhash].js"
        }
        ,
        resolve: {
            extensions: [
                ".js",
                ".jsx",
                ".scss",
                ".csv"
            ],
            alias: {
                'app': path.join(__dirname, 'src/app'),
                'assets': path.resolve(__dirname, 'src/assets')
            }
        }
        ,
        devtool: "cheap-module-source-map",
        module: {
            rules: [
                {
                    test: /\.js|jsx$/,
                    include: path.join(__dirname, "src"),
                    loader: "babel-loader",
                    query: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        plugins: [
                            "babel-plugin-styled-components",
                            "@babel/plugin-transform-template-literals",
                            "@babel/plugin-transform-async-to-generator",
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],

                        ]
                    }
                },
                {
                    test: /\.scss|css$/i,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader?minimize",
                        use: [
                            {loader: 'resolve-url-loader', options: {sourceMap: false, minimize: true}},
                            {loader: 'css-loader', options: {sourceMap: false, minimize: true}},
                            {loader: 'postcss-loader', options: {sourceMap: false, minimize: true}},
                            {loader: 'sass-loader', options: {sourceMap: false, minimize: true}}
                        ]
                    })
                },
                {
                    test: /\.(jpe?g|png|gif)$/i,
                    use: [
                        "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                query: {
                                    mozjpeg: {
                                        progressive: true,
                                    },
                                    gifsicle: {
                                        interlaced: true,
                                    },
                                    optipng: {
                                        optimizationLevel: 7,
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: "url-loader?limit=10000&mimetype=application/font-woff"
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: "file-loader"
                },
                {
                    test: /\.csv/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/files/[name].[ext]'
                        }
                    }
                }
            ]
        }
        ,
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, "favicon"),
                    to: path.resolve(__dirname, "dist"),
                }]
            ),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production"),
                }
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(true),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                minChunks: Infinity
            }),
            new MinifyPlugin({}, {
                test: /\.js|jsx$/
            }),
            new ExtractTextPlugin("assets/styles.css"),
            new HtmlWebpackPlugin({
                hash: true,
                template: "./index.html"
            })
        ]
    };
};
