module.exports = {
  presets: ['@vue/app'],
  // has babel auto-detect ES5 vs ESM sources based on import usage
  sourceType: 'unambiguous',
  plugins: ['@babel/plugin-proposal-optional-chaining'],
};
