/*
 * @Author: 培培
 * @Date: 2022-05-29 18:37:01
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-30 11:20:46
 * @FilePath: \project-basic-configuration\src\store\index.js
 * @Description:
 *
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved.
 */
import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
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
  const data = storage.getItem(key);
  data && store.replaceState(JSON.parse(data));
  store.subscribe((mutations, state) => {
    // 存
    storage.setItem(key, JSON.stringify(state));
  });
};

export default new Vuex.Store({
  state: {
    /**
     * @description: 用户信息
     * @Author: 培培
     * @return {*}
     */
    user: {},
    /**
     * @description: 菜单列表
     * @Author: 培培
     * @return {*}
     */
    menus: {},
  },
  mutations: {
    /**
     * @description: 存储用户信息
     * @param {*} state
     * @param {*} data
     * @Author: 培培
     * @return {*}
     */
    setUser(state, data) {
      state.user = data;
    },
    /**
     * @description: 设置菜单列表
     * @param {*} state
     * @param {*} data
     * @Author: 培培
     * @return {*}
     */
    setMenus(state, data) {
      state.menus = data;
    },
  },
  actions: {
    // 公共的方法，但是又涉及到操作state的数据
    exit({ commit }) {
      commit("setUser", {});
      router.push({ name: "login" });
    },
  },
  modules: {},
  getters: {
    /**
     * @description: 获取token
     * @param {*} state
     * @Author: 培培
     * @return {*}
     */
    getToken(state) {
      return state.user.token;
    },
  },
  plugins: [storePersist],
});
