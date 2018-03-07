const devConfig = require('./webpack.dev.config.js'),
      prodConfig = require('./webpack.prod.config.js');

var config;

switch (process.env.npm_lifecycle_event) {
  case 'dev':
    config = devConfig;
    break;
  case 'build':
    config = prodConfig;
    break;
  default:
    config = devConfig;
    break;
}

module.exports = config;