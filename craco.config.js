module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ignore source map warnings for MediaPipe
      webpackConfig.ignoreWarnings = [
        /Failed to parse source map/,
        /ENOENT: no such file or directory/,
      ];
      
      return webpackConfig;
    },
  },
}; 