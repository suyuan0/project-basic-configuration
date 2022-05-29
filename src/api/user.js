import request from "./requset";

/**
 * @description: 用户登录模块
 * @param {*} model
 * @Author: 培培
 * @return {*}
 */
export const login = (model) => {
  return request.post("/login", model);
};
