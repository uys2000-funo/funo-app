const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // this line needed for run builded version on local
  publicPath: "",
  transpileDependencies: ["quasar"],

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },

  devServer: {},
});
