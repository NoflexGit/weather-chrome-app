let path = require("path");
let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const sources = (location) => path.join(__dirname, location);

module.exports = {
    entry: [
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://0.0.0.0:3000",
        "webpack/hot/only-dev-server",
        "babel-polyfill",
        "whatwg-fetch",
        "./src/index"
    ],

    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, "dist"),
        port: 3000,
        host: "0.0.0.0",
        publicPath: "/",
        historyApiFallback: true,
        disableHostCheck: true
    },
    resolve: {
        extensions: [
            ".js",
            ".jsx",
            ".scss",
            ".svg",
            ".csv"
        ],
        alias: {
            'app': path.join(__dirname, 'src/app'),
            'assets' : path.join(__dirname, 'src/assets')
        }
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "app.[hash].js"
    },
    devtool: "eval",
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                include: [
                    sources('src'),
                    sources('core')
                ],
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ],
                    plugins: [
                        "babel-plugin-styled-components",
                        "@babel/plugin-transform-template-literals",
                        "@babel/transform-async-to-generator",
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose" : true }],

                    ]
                }
            },
            {
                test: /\.scss|css$/,
                use: [
                    "style-loader?sourceMap",
                    "css-loader?sourceMap",
                    "postcss-loader?sourceMap",
                    "resolve-url-loader",
                    "sass-loader?sourceMap",
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            query: {
                                name:'assets/[name].[ext]'
                            }
                        }
                    },
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
                    }]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'favicon'),
                to: path.resolve(__dirname, 'dist'),
            }]
        ),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ hash: false, template: "./index.html" }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/)
    ]
};
