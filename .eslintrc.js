module.exports = {
  'plugins': [
    'promise',
    'react',
  ],
  'globals': {
    'io': true,
    'moment': true,
    'Mustache': true,
    'Promise': true
  },
  'env': {
    'node': true,
    'mocha': true,
    'browser': true,
    'jquery': true,
  },
  'extends': ["eslint:recommended", "google", "plugin:react/recommended"],
  'parserOptions': {
    'ecmaVersion': 7,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'parser': 'babel-eslint',
  'rules': {
    'space-before-function-paren': 0,
    'jsx-quotes': 0,
    'max-len': 0,
    'object-curly-spacing': 0,
    'no-console': 0,
    'require-jsdoc': 0,
    'arrow-parens': 0,
    'no-invalid-this': 0,
    'new-cap': 0,
    'guard-for-in': 0,
    'comma-dangle': 0
  }
}
