module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "LF",
      },
    ],
    "linebreak-style": ["error", "unix"],
  },
};
