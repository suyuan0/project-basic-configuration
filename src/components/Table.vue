<!--
 * @Author: 培培
 * @Date: 2022-05-31 16:17:39
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-06-06 18:52:00
 * @FilePath: \project-basic-configuration\src\components\Table.vue
 * @Description: 封装table，分页组件
 * 
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved. 
-->

<template>
  <div>
    <el-table
      v-loading="loading"
      :tree-props="treeProps"
      border
      stripe
      :row-key="Rkey"
      :data="data"
    >
      <el-table-column
        v-for="(item, index) in clos"
        :key="index"
        :width="item.width"
        :label="item.title"
        :prop="item.name"
        :type="item.type"
        :align="item.align"
      >
        <template v-slot="{ row, $index, cloumn }" v-if="item.slot">
          <slot
            :name="item.slot"
            :row="row"
            :index="$index"
            :cloumn="cloumn"
          ></slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="page.pagesize"
      @size-change="(size) => change('pagesize', size)"
      @current-change="(num) => change('pagenum', num)"
      :current-page="page.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "myTable",
  methods: {
    /**
     * @description: 分页或者每页显示条数改变时触发
     * @param {*} type
     * @param {*} value
     * @Author: 培培
     * @return {*}
     */
    change(type, value) {
      const obj = { ...this.value, [type]: value };
      this.$emit("input", obj);
      this.$emit("change", obj);
    },
  },
  computed: {
    /**
     * @description: 分页
     * @Author: 培培
     * @return {*}
     */
    page() {
      return this.value || {};
    },
  },
  props: {
    /**
     * @description: table的key
     * @Author: 培培
     * @return {*}
     */
    Rkey: {
      type: String,
      default: "id",
    },
    /**
     * @description: 数据
     * @Author: 培培
     * @return {*}
     */
    data: {
      required: true,
      type: Array,
      default: () => [],
    },
    /**
     * @description: 列
     * @Author: 培培
     * @return {*}
     */
    clos: {
      required: true,
      type: Array,
      default: () => [],
    },
    /**
     * @description: 分页，如果要支持v-model，那么接受的值必须是value
     * @Author: 培培
     * @return {*}
     */
    value: {
      type: Object,
      default: () => {},
    },
    /**
     * @description: 总条数
     * @Author: 培培
     * @return {*}
     */
    total: Number,
    /**
     * @description: 树形数据
     * @Author: 培培
     * @return {*}
     */
    treeProps: {
      type: Object,
      default: () => ({
        children: "a",
      }),
    },
    /**loading */
    loading: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.el-table {
  margin: 20px 0;
}
</style>
