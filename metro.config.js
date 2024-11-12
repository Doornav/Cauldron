const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  const { assetExts, sourceExts } = defaultConfig.resolver;

  const config = {
    transformer: {
      // Use the SVG transformer for handling SVG files
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      // Exclude .svg files from the asset extensions
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      // Include .svg files in the source extensions
      sourceExts: [...sourceExts, 'svg'],
    },
  };

  return mergeConfig(defaultConfig, config);
})();
