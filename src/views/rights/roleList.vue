<!--
 * @Author: 培培
 * @Date: 2022-06-01 08:14:47
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-06-04 17:26:21
 * @FilePath: \project-basic-configuration\src\views\rights\roleList.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved. 
-->
<template>
  <div>
    <search
      btnText="添加角色"
      @add="
        $refs.dialog.show();
        model = {};
      "
    />
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
        <el-button
          size="mini"
          icon="el-icon-edit"
          type="primary"
          @click="
            model = { ...row };
            $refs.dialog.show();
          "
          >编辑</el-button
        >
        <el-button
          size="mini"
          icon="el-icon-delete"
          type="danger"
          @click="delRole(row)"
          >删除</el-button
        >
        <el-button
          size="mini"
          icon="el-icon-s-tools"
          type="warning"
          @click="getRights(row)"
          :loading="treeLoading"
          >分配权限</el-button
        >
      </template>
    </myTable>
    <!-- 模态框（添加--修改） -->
    <DialogForm
      :title="title"
      ref="dialog"
      @confirm="addRole"
      :value="model"
      :formOptions="formObj"
    />
    <!-- 分配权限 -->
    <Dialog
      @determine="editRights"
      ref="roleDialog"
      title="分配权限"
      @cancel="$refs.roleDialog.hide()"
    >
      <el-tree
        ref="tree"
        :default-checked-keys="defaultChecked"
        default-expand-all
        :data="rightsList"
        show-checkbox
        node-key="id"
        :props="{
          children: 'children',
          label: 'authName',
        }"
      ></el-tree
    ></Dialog>
  </div>
</template>

<script>
import Tag from "./components/Tag.vue";
/**
 * @description: 表单配置项
 * @Author: 培培
 * @return {*}
 */
const formObj = {
  roleName: {
    title: "角色名称",
    value: "",
    required: true,
    pl: "请输入角色名称",
    rules: [{ min: 2, max: 10 }],
  },
  roleDesc: {
    title: "角色描述",
    pl: "请输入角色描述",
    max: 100,
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
    align: "center",
  },
];
import {
  getRoles,
  addRoles,
  updateRoles,
  deleteRoles,
  getRightList,
  updateRights,
} from "api/role";
export default {
  name: "roleList",
  components: {
    Tag,
  },
  data() {
    return {
      //默认选中项
      defaultChecked: [],
      /**
       * @description: loading
       * @Author: 培培
       * @return {*}
       */
      treeLoading: false,
      /**
       * @description: 权限列表
       * @Author: 培培
       * @return {*}
       */
      rightsList: [],
      /**
       * @description: 表单数据模型
       * @Author: 培培
       * @return {*}
       */
      model: {
        roleName: "",
        roleDesc: "",
      },
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
  computed: {
    title() {
      return this.model.id ? "编辑角色" : "添加角色";
    },
  },
  methods: {
    // 更新角色权限
    async editRights() {
      const d = this.$refs.roleDialog;
      try {
        const tree = this.$refs.tree;
        const keys = [...tree.getCheckedKeys(), ...tree.getHalfCheckedKeys()];
        d.openLoading();
        await updateRights(this.model.id, keys.toString());
        this.$m.success("更新权限成功");
        this.getRoleList();
        d.hide();
      } catch (error) {}
      d.endLoading();
    },
    /**
     * @description: 获取权限列表
     * @Author: 培培
     * @return {*}
     */
    async getRights(row) {
      try {
        this.model = row;
        this.defaultChecked = [];
        const deep = (children) => {
          for (const item of children) {
            if (!item.children) {
              this.defaultChecked.push(item.id);
              continue;
            }
            if (item.children && item.children.length) {
              deep(item.children);
            }
          }
        };
        deep(row.children);
        this.treeLoading = true;
        this.rightsList = await getRightList();
        this.$refs.roleDialog.show();
      } catch (error) {}
      this.treeLoading = false;
    },
    /**
     * @description: 添加
     * @Author: 培培
     * @return {*}
     */
    async addRole(data) {
      const d = this.$refs.dialog;
      try {
        d.openLoading();
        await (data.id ? updateRoles : addRoles)(data);
        this.$m.success(`${data.id ? "编辑" : "添加"}成功`);
        this.getRoleList();
        d.hide();
      } catch (error) {}
      d.endLoading();
    },
    /**
     * @description: 请求角色列表
     * @Author: 培培
     * @return {*}
     */
    async getRoleList() {
      try {
        this.roleList = await getRoles();
      } catch (error) {
        console.log(error.toString());
      }
    },
    /**
     * @description: 删除角色信息
     * @param {*} row
     * @Author: 培培
     * @return {*}
     */
    async delRole(row) {
      let close;
      try {
        close = await this.$confirm(`您要删除[${row.roleName}]嘛？`);
        await deleteRoles(row.id);
        this.getRoleList();
        this.$m.success("删除成功");
      } catch (error) {}
      close && close();
    },
  },
};
</script>

<style lang="scss" scoped></style>
