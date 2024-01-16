const CracoAliasPlugin = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        // You can configure aliases here if needed
      },
    },
  ],
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        stream: require.resolve('stream-browserify'),
      };
      return webpackConfig;
    },
  },
};
