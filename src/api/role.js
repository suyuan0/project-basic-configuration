/*
 * @Author: 培培
 * @Date: 2022-05-31 11:54:27
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-06-01 15:53:33
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
