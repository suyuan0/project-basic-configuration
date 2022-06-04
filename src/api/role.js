/*
 * @Author: 培培
 * @Date: 2022-05-31 11:54:27
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-06-04 16:21:04
 * @FilePath: \project-basic-configuration\src\api\role.js
 * @Description: 获取角色模块
 *
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved.
 */

import requset from "./requset";

/**
 * @description: 获取角色
 * @Author: 培培
 * @return {*}
 */
export const getRoles = () => requset.get("/roles");

/**
 * @description: 删除标签
 * @param {Number} roleId
 * @param {Number} tagId
 * @Author: 培培
 * @return {*}
 */
export const deleteTag = (roleId, tagId) =>
  requset.delete(`/roles/${roleId}/rights/${tagId}`);

/**
 * @description: 添加角色
 * @param {*} model
 * @Author: 培培
 * @return {*}
 */
export const addRoles = (model) => requset.post("/roles", model);

/**
 * @description: 修改角色
 * @param {*} model
 * @Author: 培培
 * @return {*}
 */
export const updateRoles = (model) => requset.put(`/roles/${model.id}`, model);

/**
 * @description: 删除角色
 * @param {*} id
 * @Author: 培培
 * @return {*}
 */
export const deleteRoles = (id) => requset.delete(`/roles/${id}`);

/**
 * @description: 获取权限列表
 * @Author: 培培
 * @return {*}
 */
export const getRightList = () => requset.get("rights/tree");

/**
 * @description: 设置角色权限
 * @param {*} roleId
 * @param {*} rids
 * @Author: 培培
 * @return {*}
 */
export const updateRights = (roleId, rids) =>
  requset.post(`roles/${roleId}/rights`, { rids });
