/*
 * @Author: 培培
 * @Date: 2022-05-29 18:37:01
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-29 19:36:07
 * @FilePath: \money\src\store\index.js
 * @Description:
 *
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved.
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
/**
 * @description: VUEX数据持久化插件
 * @param {*} store
 * @Author: 培培
 * @return {*}
 */
const storePersist = (store) => {
  // 存储数据键名
  const key = "VUEX_STORAGE";
  // 存储方式
  const storage = window.sessionStorage;
  // 取
  const data = storage.getItem(key)
  data && store.replaceState(JSON.parse(data))
  store.subscribe((mutations, state) => {
    // 存
    storage.setItem(key, JSON.stringify(state));
  });
};

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [storePersist],
});
