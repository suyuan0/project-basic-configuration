<!--
 * @Author: 培培
 * @Date: 2022-06-01 08:14:47
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-06-01 19:21:08
 * @FilePath: \project-basic-configuration\src\views\rights\roleList.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved. 
-->
<template>
  <div>
    <el-button type="primary" @click="$refs.dialog.show()">添加角色</el-button>
    <!-- 表格--分页 -->
    <myTable :tree-props="{ children: 'a' }" :data="roleList" :clos="clos">
      <!-- 展开列 -->
      <template v-slot:expand="{ row }">
        <Tag
          @deleteTag="getRoleList"
          :roleId="row.id"
          :row="row.children"
        ></Tag>
      </template>
      <!-- 操作 -->
      <template v-slot:action="{ row }">
        <el-button size="mini" icon="el-icon-edit" type="primary"
          >编辑</el-button
        >
        <el-button size="mini" icon="el-icon-delete" type="danger"
          >删除</el-button
        >
        <el-button size="mini" icon="el-icon-s-tools" type="warning"
          >分配权限</el-button
        >
      </template>
    </myTable>
    <!-- 模态框（添加--修改） -->
    <Dialog
      title="添加角色"
      ref="dialog"
      @determine="$refs.dialog.openLoading()"
    >
      <Form :formOptions="formObj"></Form>
    </Dialog>
  </div>
</template>

<script>
import Tag from "./components/Tag.vue";
/**
 * @description: 表单数据
 * @Author: 培培
 * @return {*}
 */
const formObj = {
  roleName: {
    title: "角色名称",
    max: 18,
    type: "password",
    disabled: false,
    value: "",
    required: true,
    rules: [{ required: true }, { min: 2, max: 10 }],
  },
  roleDesc: {
    title: "角色描述",
    max: 100,
    disabled: false,
    required: true,
  },
};
/**
 * @description: 表格列
 * @Author: 培培
 * @return {*}
 */
const clos = [
  {
    type: "expand",
    slot: "expand",
  },
  {
    type: "index",
    title: "#",
  },
  {
    title: "角色名称",
    name: "roleName",
  },
  {
    title: "角色描述",
    name: "roleDesc",
  },
  {
    title: "操作",
    slot: "action",
  },
];
import { getRoles } from "api/role";
export default {
  name: "roleList",
  components: {
    Tag,
  },
  data() {
    return {
      /**
       * @description: 角色列表数据
       * @Author: 培培
       * @return {*}
       */
      roleList: [],
      /**
       * @description: 表格的列
       * @Author: 培培
       * @return {*}
       */
      clos,
      /**
       * @description: 表单配置项
       * @Author: 培培
       * @return {*}
       */
      formObj,
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    /**
     * @description: 请求角色列表
     * @Author: 培培
     * @return {*}
     */
    async getRoleList() {
      try {
        this.roleList = await getRoles();
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped></style>
