/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index']
      }
    ]
    // 'vue/no-setup-props-destructure': ['off']

    // 'no-undef': false,

    // 解决ESLint和Prettier的switch/case缩进冲突
    // indent: ["error", 2, { SwitchCase: 1 }],

    // "no-unused-vars": "off",

    // vite打包时自动去除console和debugger,所以这里直接关掉检查
    // "no-console": "off",
    // "no-debugger": "off"
  }
}
