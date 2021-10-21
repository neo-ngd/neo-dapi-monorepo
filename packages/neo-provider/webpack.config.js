const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, 'dist', 'cjs', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'umd'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'neoProvider',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
      os: false,
      zlib: false,
      stream: false,
      net: false,
      tls: false,
      crypto: false,
      http: false,
      https: false,
      url: false,
    },
  },
  optimization: {
    minimize: false,
  },
  devtool: 'nosources-source-map',
};
