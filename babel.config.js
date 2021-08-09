const pluginsValue = [];
if (process.env.NODE_ENV !== "test") {
  pluginsValue.push("babel-plugin-jsx-remove-data-test-id");
}
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: pluginsValue,
};
