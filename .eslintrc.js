module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  plugins: [
      'react'
  ],
  parser: "babel-eslint",
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // semi: ['error', 'always'],
    // 'space-before-function-paren': ['error', 'never'],
    'no-useless-escape': 0,
    'no-extra-boolean-cast': 0,
    'no-new': 0,
    'react/jsx-uses-vars': 2,
    'react/jsx-uses-react': 2,
  },
  globals: {

  }
}