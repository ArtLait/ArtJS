let path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let pathToSrc = __dirname.slice(0, __dirname.length - 3) + '\\src';
let folderName = 'js';
module.exports = {
    entry: './art.js',
    output: {
        path: path.resolve(pathToSrc, folderName),
        filename: 'art.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}