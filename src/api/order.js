/*
 * @Author: 培培
 * @Date: 2022-06-07 11:26:28
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-06-07 12:29:43
 * @FilePath: \project-basic-configuration\src\api\order.js
 * @Description: 订单接口
 *
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved.
 */

import request from "./requset";

/**
 * @description: 获取订单列表
 * @param {*} model
 * @Author: 培培
 * @return {*}
 */
export const getOrdersList = (model) =>
  request.get("/orders", { params: model });

  /**
   * @description: 获取物流信息
   * @Author: 培培
   * @return {*}
   */  
  export const getLogistics = ()=>request.get(`/kuaidi/804909574412544580`)