/*
 * @Author: 培培
 * @Date: 2022-06-01 21:44:49
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-06-06 17:19:58
 * @FilePath: \project-basic-configuration\src\main.js
 * @Description:
 *
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved.
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.scss";
import element from "./utils/element";
import antDesign from "./utils/antDesign";
import 'ant-design-vue/dist/antd.css';
Vue.use(antDesign);
Vue.use(element);
Vue.config.productionTip = false;

/**
 * @description: 时间格式化
 * @param {*} fmt
 * @Author: 培培
 * @return {*}
 */
Date.prototype.format = function (fmt = "yyyy-MM-dd HH:mm:ss") {
  const options = {
    "y+": this.getFullYear().toString(),
    "M+": (this.getMonth() + 1).toString(),
    "d+": this.getDate().toString(),
    "H+": this.getHours().toString(),
    "m+": this.getMinutes().toString(),
    "s+": this.getSeconds().toString(),
    "f+": this.getMilliseconds().toString(),
  };
  for (const item in options) {
    // 时间值
    const value = options[item];
    if (new RegExp(`(${item})`).test(fmt)) {
      // 如果匹配成功则可以获取到结果
      const result = RegExp.$1;
      fmt = fmt.replace(result, value.padStart(result.length, "0"));
    }
  }
  return fmt;
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
