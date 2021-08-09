const presetsValue = [
  ["@babel/preset-env", { targets: { node: "current" } }],
  "@babel/preset-typescript",
  "@babel/preset-react",
  "babel-plugin-jsx-remove-data-test-id"
];
if(process.env.NODE_ENV === 'test') {
  presetsValue.pop();
}
console.log(process.env.NODE_ENV)
module.exports = {
  presets: presetsValue,
};
