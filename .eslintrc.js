module.exports = {
  extends: ['plugin:vue/recommended', 'plugin:prettier/recommended'],
  plugins: ['jest', 'prettier'],
  rules: {
    eqeqeq:: 0
    no-cond-assign: 0,
    quotes: [1, 'single']
  }
};
