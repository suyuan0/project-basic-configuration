<template>
  <div>
    <component
      :is="isChild ? 'div' : 'el-tag'"
      :class="{ box: isChild }"
      v-for="item in row"
      :key="item.id"
    >
      <template v-if="isChild">
        <div class="left">
          <el-tag>
            {{ item.authName }}
          </el-tag>
        </div>
        <div class="right">
          <Tag :row="item.children" />
        </div>
      </template>
      <template v-else>
        {{ item.authName }}
      </template>
    </component>
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: {
    row: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isChild() {
      return this.row[0] && !!this.row[0].children;
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
