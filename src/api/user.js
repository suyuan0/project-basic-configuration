/*
 * @Author: 培培
 * @Date: 2022-05-30 10:44:31
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-31 12:08:51
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

/**
 * @description: 编辑用户
 * @param {*} id
 * @Author: 培培
 * @return {*}
 */
export const editUser = (id, model) => request.put(`/users/${id}`, model);

/**
 * @description: 删除用户
 * @Author: 培培
 * @return {*}
 */
export const deleteUser = (id) => request.delete(`/users/${id}`);

/**
 * @description: 修改角色
 * @Author: 培培
 * @return {*}
 * @param {Number} rid
 * @param {Number} userId
 */
export const assingRole = (rid, userId) =>
  request.put(`/users/${userId}/role/${rid}`);
