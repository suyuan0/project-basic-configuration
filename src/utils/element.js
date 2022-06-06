/*
 * @Author: 培培
 * @Date: 2022-05-29 19:20:55
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-06-06 11:11:35
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
import DialogForm from "com/DialogForm";
import Search from "com/Search";
import {
  Upload,
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
  Tree,
  Alert,
  Cascader,
  Tabs,
  TabPane,
  Loading,
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
    [myTable, MyForm, MyDialog, DialogForm, Search].forEach((component) =>
      Vue.component(component.name, component)
    ),
      /**
       * @description: elementUI组件
       * @Author: 培培
       * @return {*}
       */
      [
        Loading,
        Tabs,
        TabPane,
        Cascader,
        Alert,
        Upload,
        Tree,
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
