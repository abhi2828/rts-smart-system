// next.config.js
require('dotenv-flow').config({
  node_env: process.env.APP_ENV,
});

const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@mui/system',
  '@mui/icons-material', // If @mui/icons-material is being used
]);

const { i18n } = require('./next-i18next.config');

const mappedVariables = {
  APP_ENV: process.env.APP_ENV,
};

module.exports = withTM({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: undefined,
  i18n,
  productionBrowserSourceMaps: mappedVariables.SOURCE_MAP === 'true',

  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: false,
  env: mappedVariables,

  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine-sc',
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true,
      },
    ];
  },
});
