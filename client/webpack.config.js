const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const path = require('path');

const { InjectManifest } = require('workbox-webpack-plugin');
// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    ///added plugins  for operation, html, minicss, webpackmanifest, 
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'TODOs List'
      }),
      new WorkboxPlugin.GenerateSW(),
///You can name whatever you want (file created name)
      new GenerateSW(),
      ///add igmanifest injects mani into scwrk
      new InjectManifest({
        swSrc:"./src-sw.js",
        swDest:"src-sw.js"
      }),
      new WebpackPwaManifest({
        name: 'DomoEditing',
        short_name: 'Domed',
        description: 'Just another text editor',
        background_color: '#654321',
        theme_color: '#ffffff',
////        What are these next 2 for P
        start_url: '/',
        publicPath:'/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          }
        ]
      }),      
    ],

    module: {
      ///add mini css and css loader
      rules: [
        ////sdd mini css
        {
          test: /\.css$/i,
          use: ["style-loader", 'css-loader'],
        },
        ////adds the babel loader
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
