module.exports = {
  extends: [
    //"eslint:recommended",
    //"plugin:prettier/recommended",
    "plugin:vue/recommended"
  ],
  plugins: [
   //"prettier".
  "jest"
  ],
  rules: {
    eqeqeq: "off",
    "no-cond-assign": "off"
  }
}

// fix the warnings and then uncomment more options above if you want
