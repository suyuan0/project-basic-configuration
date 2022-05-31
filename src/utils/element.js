/*
 * @Author: 培培
 * @Date: 2022-05-29 19:20:55
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-31 16:20:04
 * @FilePath: \project-basic-configuration\src\utils\element.js
 * @Description: element组件引入
 *
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved.
 */
/**
 * @description: 引入table组件
 * @Author: 培培
 * @return {*}
 */
import myTable from "com/Table";

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
  Select,
  Option,
} from "element-ui";
export default {
  install(Vue) {
    Vue.prototype.$mb = MessageBox;
    Vue.prototype.$m = Message;
    Vue.prototype.$confirm = (msg, title = "提示") => {
      return new Promise((resolve, reject) => {
        MessageBox.confirm(msg, title, {
          beforeClose(action, instance) {
            if (action === "confirm") {
              return resolve(instance.close);
            }
            if (action === "cancel") {
              reject();
              instance.close();
            }
          },
        });
      });
    };
    [myTable].forEach((component) => Vue.component(component.name, component)),
      [
        Select,
        Option,
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
