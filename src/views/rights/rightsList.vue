<template>
  <div>
    <myTable :data="rightsList" :clos="clos">
      <template v-slot:level="{ row }">
        <el-tag :type="color[row.levels]">{{ level[row.levels] }}级</el-tag>
      </template>
    </myTable>
  </div>
</template>

<script>
import { getRights } from "api/role";
import { levels, colors } from "utils/common";
/**表格列*/
const clos = [
  {
    title: "#",
    type: "index",
  },
  {
    title: "权限名称",
    name: "authName",
  },
  {
    title: "路径",
    name: "path",
  },
  {
    slot: "level",
    title: "权限等级",
  },
];
export default {
  name: "rightsList",
  data() {
    return {
      levels,
      colors,
      /**权限列表数据*/
      rightsList: [],
      /**表格列 */
      clos,
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    /**
     * @description: 获取权限列表
     * @Author: 培培
     * @return {*}
     */
    async getRightsList() {
      try {
        this.rightsList = await getRights();
      } catch (error) {}
    },
  },
};
</script>

<style></style>
