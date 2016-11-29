module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
        "jsx": true,
        "modules": true,
        "experimentalObjectRestSpread": true
      },
      "env": {
        "es6": true,
        "browser": true
      }
  },
  'env': {
      'browser': true,
      'es6': true,
      'node': true
  },
  'extends': [
      'eslint:recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': 1,
    'no-var': 1,
    'semi': 0,
    'no-trailing-spaces': 0,
    'eol-last': 0,
    'no-underscore-dangle': 0,
    'no-alert': 0,
    'no-lone-blocks': 0,
    'linebreak-style': [
        'error',
        'unix'
    ],
    'quotes': [
        'warn',
        'single'
    ]
  }
}
