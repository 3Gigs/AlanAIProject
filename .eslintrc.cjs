module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:react/recommended",
    "standard"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "react",
    "@typescript-eslint"
  ],
  ignorePatterns: ["./node_modules/", "**/assets", "**/*.css"],
  rules: {
    "react/react-in-jsx-scope": 0,
    "react/jsx-uses-react": 0,
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-undef": "off"
  }
};
