const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { DEV, DEBUG } = process.env;
process.env.BABEL_ENV = DEV ? 'development' : 'production';
process.env.NODE_ENV = DEV ? 'development' : 'production';

module.exports = {
    entry: './site/app/index.tsx',
    // entry: {
    //      index: '../../site/app/index.tsx'
    //      dependOn: 'shared' // 用于指定依赖关系，如果 index 依赖于 lodash，那么 lodash 会被单独打包
    //      another: {
    //          import: './src/another-module.js',
    //          dependOn: 'shared',
    //      },
    //      shared: 'lodash',
    // }
    output: {
        path: path.join(__dirname, '../../dist'),
        filename: !DEV ? 'js/[name].[contenthash:8].js' : 'js/[name].[hash:8].js'
    },
    devServer: {
        port: 3000
    },
    mode: DEV ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            },
            {
                test: /\.(less|css)$/,
                exclude: /\.module\.less$/,
                use: [
                {
                    loader: 'css-loader',
                    options: {
                    importLoaders: 2,
                    sourceMap: !!DEV,
                    },
                },
                {
                    loader: 'less-loader',
                    options: {
                    sourceMap: !!DEV,
                    },
                },
                ],
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: !!DEV,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !!DEV,
                        },
                    },
                ],
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            //   {
            //     test: /\.(csv|tsv)$/i,
            //     use: ['csv-loader'],
            //   },
            //   {
            //     test: /\.xml$/i,
            //     use: ['xml-loader'],
            //   },
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        DEBUG && new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'../../static/index.html')
        }),
        // new webpack.ProvidePlugin({
        //     //_: 'lodash'
        //     // If there is no comment, you need to quote console like this.log(_.join(['hello', 'webpack'], ' '))
        //     join: ['lodash', 'join'],
        // })
    ],
    optimization: {
        minimizer: [
          new TerserPlugin({
            parallel: false,
            terserOptions: {
              output: {
                comments: false,
              },
            },
          }),
          new OptimizeCSSAssetsPlugin({}),
        ],
        minimize: !DEV,
        splitChunks: {
            minSize: 500000,
            cacheGroups: {
                vendors: false,
            },
        },
    },
}