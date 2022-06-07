<!--
 * @Author: 培培
 * @Date: 2022-06-01 21:44:49
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-06-07 12:44:29
 * @FilePath: \project-basic-configuration\src\components\Dialog.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved. 
-->
<template>
  <el-dialog
    :close-on-click-modal="closeModal"
    :title="title"
    :visible.sync="diaLogShow"
    ><slot></slot>
    <div slot="footer">
      <slot name="footer">
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button :loading="loading" @click="$emit('determine')" type="primary"
          >确定</el-button
        >
      </slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "Dialog",
  data() {
    return {
      /**
       * @description: 模态框显示隐藏
       * @Author: 培培
       * @return {*}
       */
      diaLogShow: false,
      /**
       * @description: loading
       * @Author: 培培
       * @return {*}
       */
      loading: false,
    };
  },
  methods: {
    /**
     * @description: 显示
     * @Author: 培培
     * @return {*}
     */
    show() {
      this.diaLogShow = true;
    },
    /**
     * @description: 隐藏
     * @Author: 培培
     * @return {*}
     */
    hide() {
      this.diaLogShow = false;
    },
    /**
     * @description: 开始loading
     * @Author: 培培
     * @return {*}
     */
    openLoading() {
      this.loading = true;
    },
    /**
     * @description: 结束loading
     * @Author: 培培
     * @return {*}
     */
    endLoading() {
      this.loading = false;
    },
  },
  props: {
    /**
     * @description: 标题
     * @Author: 培培
     * @return {*}
     */
    title: String,
    closeModal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
