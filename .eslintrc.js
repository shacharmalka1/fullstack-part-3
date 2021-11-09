module.exports = {
  env: {
    commonjs: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
  },
  ignorePatterns: ['/build', '/front'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': 0, //Changed to windows instead of unix
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
  },
}
