<template>
  <div>
    <Dialog :title="title" ref="dialog" @determine="confirm" @cancel="cancel">
      <Form ref="form" v-bind="$attrs"></Form>
    </Dialog>
  </div>
</template>

<script>
export default {
  name: "DialogForm",
  props: {
    title: String,
  },
  methods: {
    /**
     * @description: 开启loading
     * @Author: 培培
     * @return {*}
     */
    openLoading() {
      this.$refs.dialog.openLoading();
    },
    /**
     * @description: 结束loading
     * @Author: 培培
     * @return {*}
     */
    endLoading() {
      this.$refs.dialog.endLoading();
    },
    /**
     * @description: 模态框隐藏
     * @Author: 培培
     * @return {*}
     */
    hide() {
      this.$refs.dialog.hide();
    },
    /**
     * @description: 模态框显示
     * @Author: 培培
     * @return {*}
     */
    show() {
      this.$refs.dialog.show();
    },
    /**
     * @description: 提交
     * @Author: 培培
     * @return {*}
     */
    async confirm() {
      try {
        const data = await this.$refs.form.validate();
        this.$emit("confirm", data);
      } catch (error) {}
    },
    /**
     * @description: 取消
     * @Author: 培培
     * @return {*}
     */
    cancel() {
      this.$refs.dialog.hide();
      this.$refs.form.resetFields();
      this.$emit("cancel");
    },
  },
};
</script>

<style></style>
