const postcssPresetEnv = require('postcss-preset-env');
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-url'),
    require('postcss-flexbugs-fixes'),
    require('postcss-aspect-ratio-mini'),
    require('postcss-write-svg')({ utf8: false }),
    postcssPresetEnv({}),
    require('postcss-px-to-viewport')({
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 6,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false,
    }),
    require('cssnano')({
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false,
    }),
  ],
};
