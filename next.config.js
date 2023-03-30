// const webpack = require('webpack');

// module.exports = {
//   reactStrictMode: true,

//   webpack: config => {
//     // Optional: Enables reading mapbox token from environment variable
//     config.plugins.push(new webpack.EnvironmentPlugin({REACT_APP_MAP_BOX_TOKEN: ''}));
//     return config;
//   }
//   env: {
//     REACT_APP_MAP_BOX_TOKEN: process.env.REACT_APP_MAP_BOX_TOKEN,
//   }
// };

module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_MAP_BOX_TOKEN: process.env.REACT_APP_MAP_BOX_TOKEN,
  }
}
