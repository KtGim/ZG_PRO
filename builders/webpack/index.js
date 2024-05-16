const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const os = require('os');
const DEV = true;
const DEBUG = true;

const getIPAdress = () => {
    let interfaces = os.networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
};
const localIp = getIPAdress();

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
        port: 3000,
        host: localIp,
        // allowedHosts:'all',
        client: {
            progress: true
        },
        hot: true,
        open: true,
        compress: true,
    },
    mode: DEV ? 'development' : 'production',
    devtool: DEV && 'source-map',
    module: {
        rules: [
            // {
            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     loader: 'babel-loader',
            // },
            // {
            //     test: /\.tsx?$/,
            //     exclude: /node_modules/,
            //     loader: 'ts-loader',
            //     options: {
            //         transpileOnly: true // 只进行编译不会进行类型检查和声明文件的输出
            //     }
            // },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "swc-loader"
            },
            {
                test: /\.(less|css)$/,
                exclude: /\.module\.less$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
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
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: path.join(__dirname, '../../static/index.html'),
          filename: 'index.html',
          inject: 'body',
        }),
        // DEBUG && new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin({
            insert: "#css-insert-port"
        }),
        new ESLintPlugin(),
        // new ForkTsCheckerWebpackPlugin(),
    ],
      // new webpack.ProvidePlugin({
    //     _: 'lodash'
    //     // If there is no comment, you need to quote console like this.log(_.join(['hello', 'webpack'], ' '))
    //     join: ['lodash', 'join'],
    // })
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
          new CssMinimizerPlugin(),
        ],
        minimize: !DEV,
        splitChunks: {
            minSize: 500000,
            cacheGroups: {
                vendors: false,
            },
        },
    },
    resolve: {
        modules: ['node_modules'],
        extensions: [".json",".js",".jsx",".ts",".tsx",".less",".scss"],
        alias: {
            'site': path.resolve(__dirname, '../../site'),
            'utils': path.resolve(__dirname, '../../utils'),
            'components': path.resolve(__dirname, '../../components'),
            'hooks': path.resolve(__dirname, '../../hooks'),
            'assets': path.resolve(__dirname, '../../static'),
            'config': path.resolve(__dirname, '../../config'),
            'consts': path.resolve(__dirname, '../../consts')
        },
    },
}