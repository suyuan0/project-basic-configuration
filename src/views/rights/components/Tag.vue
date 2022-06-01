<!--
 * @Author: 培培
 * @Date: 2022-06-01 10:16:41
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-06-01 16:15:36
 * @FilePath: \project-basic-configuration\src\views\rights\components\Tag.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved. 
-->
<template>
  <div>
    <component
      :is="isChild ? 'div' : 'el-tag'"
      :class="{ box: isChild }"
      v-for="item in row"
      type="warning"
      :key="item.id"
      @close="deleteRoleTag(item)"
      closable
    >
      <template v-if="isChild">
        <div class="left">
          <el-tag
            :type="
              item.id !== 101 &&
              item.id !== 102 &&
              item.id !== 103 &&
              item.id !== 125 &&
              item.id !== 145
                ? 'success'
                : ''
            "
            @close="deleteRoleTag(item)"
            closable
          >
            {{ item.authName }}
          </el-tag>
        </div>
        <div class="right">
          <Tag
            v-on="$listeners"
            v-if="item.children"
            :row="item.children"
            :roleId="roleId"
          />
        </div>
      </template>
      <template v-else>
        {{ item.authName }}
      </template>
    </component>
  </div>
</template>

<script>
import { deleteTag } from "api/role";
export default {
  name: "Tag",
  props: {
    /**
     * @description: 角色id
     * @Author: 培培
     * @return {*}
     */
    roleId: {
      required: true,
      type: Number,
    },
    /**
     * @description: 标签数据
     * @Author: 培培
     * @return {*}
     */
    row: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    /**
     * @description: 结束标记
     * @Author: 培培
     * @return {*}
     */
    isChild() {
      return this.row[0] && !!this.row[0].children;
    },
  },
  methods: {
    /**
     * @description: 删除标签
     * @param {*} row
     * @Author: 培培
     * @return {*}
     */
    async deleteRoleTag(row) {
      let res;
      try {
        res = await this.$confirm(`您确定要删除[${row.authName}]吗？`);
        await deleteTag(this.roleId, row.id);
        this.$m.success("删除成功");
        this.$emit("deleteTag");
      } catch (error) {}
      res && res();
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  border: 1px solid #efefef;
  .left {
    padding: 20px;
  }
  .right {
    flex: 1;
    .el-tag {
      margin-left: 10px;
    }
  }
}
</style>
