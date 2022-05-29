/*
 * @Author: 培培
 * @Date: 2022-05-29 18:37:01
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-29 19:19:16
 * @FilePath: \money\babel.config.js
 * @Description:
 *
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved.
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset", ["@babel/preset-env", { modules: false }]],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};
