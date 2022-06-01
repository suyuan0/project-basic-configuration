<template>
  <div>
    <el-form ref="form" :label-width="labelWidth">
      <el-form-item
        v-for="(item, key) in options"
        :key="key"
        :label="item.title"
        :prop="key"
        :rules="item.rules"
      >
        <el-input
          v-if="item.tag === 'input'"
          :maxlength="item.max"
          :disabled="item.disabled"
          :type="item.type"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      /**
       * @description: 配置表单的对象
       * @Author: 培培
       * @return {*}
       */
      options: {},
      /**
       * @description: 数据模型
       * @Author: 培培
       * @return {*}
       */
      model: {},
    };
  },
  watch: {
    /**
     * @description: 监听formOptions是否有变化，重新
     * @Author: 培培
     * @return {*}
     */
    formOptions: {
      deep: true,
      immediate: true,
      handler(nval) {
        if (!nval) return;
        // 深拷贝
        const Person = JSON.parse(JSON.stringify(nval));
        for (const key in Person) {
          if (!Object.hasOwnProperty.call(Person, key)) continue;
          //   值
          const item = Person[key];
          item.tag = item.tag || "input";
          // 如果之前有验证规则，否则 []
          item.rules = item.rules || [];
          if (
            item.required === true &&
            !item.rules.some((v) => v.required === true)
          ) {
            item.rules.unshift({
              required: true,
              message: `${item.title}不能为空`,
            });
          }
          //   添加规则
          for (const rule of item.rules) {
            if (rule.message) continue;
            if (rule.required) {
              rule.message = `${item.title}不能为空`;
            } else if (rule.min && rule.max) {
              rule.message = `${item.title}必须为${rule.min}-${rule.max}位`;
            }
          }
        }
        this.options = Person;
      },
    },
  },
  props: {
    /**
     * @description: 表单的宽
     * @Author: 培培
     * @return {*}
     */
    labelWidth: {
      type: String,
      default: "90px",
    },
    /**
     * @description: form表单数据
     * @Author: 培培
     * @return {*}
     */
    value: Object,
    /**
     * @description: 表单配置项
     * @Author: 培培
     * @return {*}
     */
    formOptions: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style></style>
