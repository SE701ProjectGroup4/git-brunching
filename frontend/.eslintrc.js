module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "quotes": [2,"double", { "allowTemplateLiterals": true}],
    "linebreak-style": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "react/prop-types": 0,
    "react/button-has-type": 0,
    "jsx-a11y/label-has-associated-control": 0
  },
};
