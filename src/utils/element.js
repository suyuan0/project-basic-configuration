/*
 * @Author: 培培
 * @Date: 2022-05-29 19:20:55
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-30 17:02:16
 * @FilePath: \project-basic-configuration\src\utils\element.js
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
  MessageBox,
  MenuItemGroup,
  MenuItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Switch,
  Pagination,
  Dialog,
} from "element-ui";

export default {
  install(Vue) {
    Vue.prototype.$mb = MessageBox;
    Vue.prototype.$m = Message;
    [
      Dialog,
      Pagination,
      Button,
      Input,
      Menu,
      Form,
      FormItem,
      Table,
      TableColumn,
      MenuItemGroup,
      MenuItem,
      Submenu,
      Breadcrumb,
      BreadcrumbItem,
      Switch,
    ].forEach((component) => {
      Vue.use(component);
    });
  },
};
