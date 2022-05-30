/*
 * @Author: 培培
 * @Date: 2022-05-30 11:18:28
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-30 11:19:37
 * @FilePath: \project-basic-configuration\src\api\menu.js
 * @Description: 菜单模块接口
 *
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved.
 */

import request from "./requset";

export const getMenus = () => request.get("/menus");
