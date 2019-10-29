module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-useless-escape': 'off',
    'no-callback-literal': 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'no-undef': 'off',
    'camelcase': 'off',
    '"no-unused-expressions"': 'off',
    'eqeqeq': 'off',
    'no-empty':'off',
    'semi': 'off',
    'comma-dangle': 'off',
    'indent': "off"
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
