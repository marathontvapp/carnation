module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["nativewind/babel", { mode: "compileOnly" }],
      "react-native-reanimated/plugin",
      "@babel/plugin-proposal-export-namespace-from",
    ],
  };
};
