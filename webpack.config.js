const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');

/* eslint func-names: 0 */
module.exports = function(env) {
  let isDebug = true;
  let buildonly = false;
  let loggerLevel = "'info'";
  let port = 3000;

  if (env) {
    if (env.release) isDebug = false;
    if (env.buildonly) buildonly = true;
    if (isDebug) loggerLevel = '"debug"';
    if (env.verbose) loggerLevel = "'silly'";
    if (env.port) port = env.port;
  }

  // const reScript = /\.(js|jsx|mjs)$/;
  const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
  const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

  const config = {
    target: 'node',
    devtool: isDebug ? 'eval' : false,
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
          exclude: /(node_modules)/,
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
    watch: isDebug && !buildonly,
  };

  if (isDebug && !buildonly)
    config.plugins.push(
      new NodemonPlugin({
        verbose: true,
        ignore: ['/native/*'],
      }),
    );

  return config;
};
