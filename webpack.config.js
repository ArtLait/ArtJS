let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: ['.\\src\\js\\art.js', '.\\src\\main.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
              test: /\.css$/,
              use: [
                { loader: 'style-loader/url',
                  options: {
                    sourceMap: true
                  }
                },
                {
                  loader: 'file-loader',
                  options: {
                    sourceMap: true
                  }
                }
              ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
              test: /\.html$/,
              loader: 'html-loader',
              exclude: path.resolve(__dirname, 'src\\index.html')
            }
          ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: '.\\src\\index.html',
          filename: 'index.html',
          inject: true
        }),
        new CleanWebpackPlugin(['dist'])
    ]
}