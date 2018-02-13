const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');

// const reScript = /\.(js|jsx|mjs)$/;
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

let loggerLevel;
if (isVerbose) {
  loggerLevel = '"silly"';
} else if (isDebug) {
  loggerLevel = "'debug'";
} else {
  loggerLevel = "'info'";
}

const port =
  parseInt(
    isDebug ? process.env.DEV_APP_PORT : process.env.PROD_APP_PORT,
    10,
  ) || 3000;

const serverWebpackConfig = {
  target: 'node',
  entry: `${__dirname}/server/server.js`,
  output: {
    filename: 'server.js',
    path: `${__dirname}/build`,
  },
  externals: [
    fs.readdirSync('node_modules').reduce((acc, mod) => {
      if (mod === '.bin') {
        return acc;
      }

      acc[mod] = `commonjs ${mod}`;
      return acc;
    }, {}),
    nodeExternals({
      whitelist: [reStyle, reImage],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.LOGGER_LEVEL': loggerLevel,
      'process.env.PORT': port,
      __DEV__: isDebug,
    }),
  ],
  watch: isDebug,
};

module.exports = serverWebpackConfig;
