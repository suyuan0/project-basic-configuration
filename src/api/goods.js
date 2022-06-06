/*
 * @Author: 培培
 * @Date: 2022-06-04 17:42:14
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-06-06 12:11:00
 * @FilePath: \project-basic-configuration\src\api\goods.js
 * @Description: 商品接口
 *
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved.
 */

import request from "./requset";

/**
 * @description: 获取商品列表
 * @param {*} model
 * @Author: 培培
 * @return {*}
 */
export const getGoods = (model) => request.get("/goods", { params: model });

/**
 * @description: 添加商品
 * @param {*} model
 * @Author: 培培
 * @return {*}
 */
export const addGoods = (model) => request.post("/goods", model);

/**
 * @description: 修改商品
 * @param {*} model
 * @Author: 培培
 * @return {*}
 */
export const updateGoods = (model) =>
  request.put(`/goods/${model.goods_id}`, model);

/**
 * @description: 删除商品
 * @param {*} goods_id
 * @Author: 培培
 * @return {*}
 */
export const deleteGoods = (goods_id) => request.delete(`/goods/${goods_id}`);

/**
 * @description: 获取分类参数
 * @Author: 培培
 * @return {*}
 */
export const getCategories = () => request.get("categories");

/**
 * @description 获取属性
 * @param {Number} id
 * @param {String} type
 * @returns
 */
export const getAttributes = (id, type) =>
  request.get(`categories/${id}/attributes?sel=${type}`);

/**
 * @description: 添加标签
 * @param {*} id
 * @param {*} attrId
 * @param {*} model
 * @Author: 培培
 * @return {*}
 */
export const upAttr = (id, attrId, model) =>
  request.put(`categories/${id}/attributes/${attrId}`, model);

/**
 * @description: 添加属性，参数
 * @param {*} cateId
 * @param {*} model
 * @Author: 培培
 * @return {*}
 */
export const add = (cateId, model) =>
  request.post(`/categories/${cateId}/attributes`, model);
