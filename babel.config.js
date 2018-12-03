module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['@babel/env', '@babel/react'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      ['transform-react-remove-prop-types', { removeImport: true }],
    ],
  };
};
