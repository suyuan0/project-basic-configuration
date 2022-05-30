/*
 * @Author: 培培
 * @Date: 2022-05-29 18:54:17
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-30 11:02:14
 * @FilePath: \project-basic-configuration\src\api\requset.js
 * @Description: axios封装
 *
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved.
 */

import axios from "axios";
import { Message } from "element-ui";
import store from "../store";
// 基地址
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
// 超时时间
axios.defaults.timeout = process.env.VUE_APP_TIMEOUT;

/**
 * @description: 请求拦截器
 * @Author: 培培
 * @return {*}
 */
axios.interceptors.request.use(
  (config) => {
    //   请求头处理
    config.headers.Authorization = store.getters.getToken;
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * @description: 响应拦截器
 * @Author: 培培
 * @return {*}
 */
axios.interceptors.response.use(
  (response) => {
    //   响应的数据处理
    const {
      data,
      meta: { msg, status },
    } = response.data;
    if (status === 200 || status === 201) {
      return data;
    }
    Message.error(msg);
    return Promise.reject(msg);
  },
  (error) => {
    //   失败处理
    const msg = error.toString();
    if (msg.includes("Newwork Error")) {
      Message.error("网络错误");
      return Promise.reject(error);
    }
    if (msg.includes("Timeout")) {
      Message.error("网络超时");
      return Promise.reject(error);
    }
    const { status } = error.response;
    switch (status) {
      case 401:
        Message.error("登录超时");
        // 超时跳转，亲空token跳转到登录页
        store.dispatch("exit");
        break;
      case 500:
        Message.error("接口请求失败");
        break;
      case 404:
        Message.error("接口不存在");
        break;
    }
    return Promise.reject(error);
  }
);

export default axios;
