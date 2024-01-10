const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, 'dist/cjs/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/umd'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'jsonRpc',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  optimization: {
    minimize: false,
  },
  devtool: 'nosources-source-map',
};
