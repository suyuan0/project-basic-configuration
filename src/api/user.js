/*
 * @Author: 培培
 * @Date: 2022-05-30 10:44:31
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-30 11:19:14
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
