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
    library: 'neoDapi',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  resolve: {
    fallback: {
      process: false,
      net: false,
      zlib: false,
      stream: false,
      tls: false,
      crypto: false,
      http: false,
      https: false,
      fs: false,
      path: false,
      os: false,
      url: false,
    },
  },
  optimization: {
    minimize: false,
  },
};
