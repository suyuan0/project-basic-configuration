const path = require("path");
module.exports = {
  devServer: {
    open: true,
    // 代理
    proxy: {
      "/9yue": {
        target: "http://heima.9yuecloud.com:9988/api/private/v1",
        pathRewrite: { "^/9yue": "" },
      },
      "/shi": {
        target: "http://shiyansong.cn:8888/api/private/v1",
        pathRewrite: { "^/shi": "" },
      },
    },
  },
  configureWebpack: {
    resolve: {
      // 别名
      alias: {
        api: path.resolve(__dirname, "./src/api"),
        lay: path.resolve(__dirname, "./src/layout"),
        view: path.resolve(__dirname, "./src/views"),
        store: path.resolve(__dirname, "./src/store"),
        utils: path.resolve(__dirname, "./src/utils"),
        router: path.resolve(__dirname, "./src/router"),
        com: path.resolve(__dirname, "./src/components"),
      },
    },
  },
};
