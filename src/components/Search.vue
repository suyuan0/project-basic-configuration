<template>
  <div class="search">
    <el-input
      @keypress.enter.native="$emit('search')"
      v-if="showInput"
      placeholder="请输入内容"
      v-model="search"
      class="search-input"
    >
      <el-button
        :loading="loading"
        slot="append"
        @click="$emit('search')"
        icon="el-icon-search"
      ></el-button>
    </el-input>
    <el-button v-if="btnText" type="primary" @click="$emit('add')"
      >添加用户</el-button
    >
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      /**
       * 搜索
       */
      search: "",
    };
  },
  computed: {
    /**
     * @description: 是否显示input
     * @Author: 培培
     * @return {*}
     */
    showInput() {
      return typeof this.value !== "undefined";
    },
  },
  watch: {
    /**监听搜索内容 */
    search(val) {
      this.$emit("input", val);
    },
  },
  props: {
    /**搜索loading*/
    loading: Boolean,
    /**
     * 值
     */
    value: String,
    /**
     * 按钮内容
     */
    btnText: String,
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  width: 400px;
  margin-right: 20px;
}
</style>
