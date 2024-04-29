module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true
  },
  extends: ['plugin:cypress/recommended', 'prettier'],
  plugins: ['cypress', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'cypress/no-async-tests': 'error',
    'cypress/no-unnecessary-waiting': 0,
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': ['error', { allow: ['state'] }],
    'no-param-reassign': ['error', { props: false }],
    'linebreak-style': 0,
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none'
      }
    ],
    'arrow-parens': 0,
    camelcase: 0
  }
}
