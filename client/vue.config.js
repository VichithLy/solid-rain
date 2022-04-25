module.exports = {
  devServer: {
    port: 8082,
  },
  configureWebpack: {
    plugins: [
      //TODO
    ],
  },
  publicPath: "/client",
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/sw.js",
    },
  },
};
