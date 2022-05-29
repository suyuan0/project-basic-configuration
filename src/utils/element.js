/*
 * @Author: 培培
 * @Date: 2022-05-29 19:20:55
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-29 19:22:04
 * @FilePath: \money\src\utils\element.js
 * @Description: element组件引入
 *
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved.
 */

import {
  Button,
  Input,
  Menu,
  Form,
  FormItem,
  Table,
  TableColumn,
  Message,
} from "element-ui";

export default {
  install(Vue) {
    [Button, Input, Menu, Form, FormItem, Table, TableColumn, Message].forEach(
      (component) => {
        Vue.use(component);
      }
    );
  },
};
