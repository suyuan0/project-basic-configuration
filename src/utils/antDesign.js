/*
 * @Author: 培培
 * @Date: 2022-06-06 17:18:55
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-06-06 17:19:02
 * @FilePath: \project-basic-configuration\src\utils\antDesign.js
 * @Description:
 *
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved.
 */
import { Button, Result } from "ant-design-vue";

export default {
  install(Vue) {
    [Button, Result].forEach((v) => Vue.use(v));
  },
};
