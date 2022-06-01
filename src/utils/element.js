/*
 * @Author: 培培
 * @Date: 2022-05-29 19:20:55
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-06-01 16:57:31
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
import MyDialog from "com/Dialog";
import MyForm from "com/Form";
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
  Tag,
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
    /**
     * @description:自定义组件
     * @Author: 培培
     * @return {*}
     */
    [myTable, MyForm, MyDialog].forEach((component) =>
      Vue.component(component.name, component)
    ),
      /**
       * @description: elementUI组件
       * @Author: 培培
       * @return {*}
       */
      [
        Tag,
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
