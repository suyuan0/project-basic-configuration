<template>
  <div>
    <el-button type="primary">添加角色</el-button>
    <myTable :tree-props="{ children: 'a' }" :data="roleList" :clos="clos">
      <!-- 展开列 -->
      <template v-slot:expand="{ row }">
        {{ row }}
      </template>
      <!-- 操作 -->
      <template v-slot:action="{ row }"> </template>
    </myTable>
  </div>
</template>

<script>
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
