/*
 * @Author: 培培
 * @Date: 2022-05-30 10:44:31
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-30 19:34:08
 * @FilePath: \project-basic-configuration\src\api\user.js
 * @Description:  用户登录模块
 *
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved.
 */
import request from "./requset";

/**
 * @description: 用户登录模块
 * @param {*} model
 * @Author: 培培
 * @return {*}
 */
export const login = (model) => request.post("/login", model);

/**
 * @description: 搜索模块
 * @param {Object} model
 * @Author: 培培
 * @return {*}
 */
export const search = (model) =>
  request.get("users", {
    params: model,
  });

/**
 * @description: 修改用户状态
 * @param {*} id
 * @param {*} state
 * @Author: 培培
 * @return {*}
 */
export const switchState = (id, state) =>
  request.put(`/users/${id}/state/${state}`);

/**
 * @description: 添加用户
 * @param {*} model
 * @Author: 培培
 * @return {*}
 */  
export const addUser = (model) => request.post("/users", model);
