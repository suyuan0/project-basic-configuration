<template>
  <div>
    <el-form ref="form" :model="model" :label-width="labelWidth">
      <el-form-item
        v-for="(item, key) in options"
        :key="key"
        :label="item.title"
        :prop="key"
        :rules="item.rules"
      >
        <el-input
          v-model="model[key]"
          v-if="item.tag === 'input'"
          :maxlength="item.max"
          :disabled="item.disabled"
          :type="item.type"
          :placeholder="item.pl"
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
       * @description: 数据模型
       * @Author: 培培
       * @return {*}
       */
      model: {},
    };
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        if (!val) return;
        this.$nextTick(() => {
          this.$refs.form.resetFields();
          this.model = { ...val };
        });
      },
    },
  },
  methods: {
    /**
     * @description: 判断是否为数字
     * @Author: 培培
     * @return {*}
     */
    isNumber(val) {
      return typeof val === "number";
    },
    /**
     * @description: 验证方法
     * @Author: 培培
     * @return {*}
     */
    async validate() {
      await this.$refs.form.validate();
      return { ...this.model };
    },
    /**
     * @description: 重置表单验证
     * @Author: 培培
     * @return {*}
     */
    resetFields() {
      this.$refs.form.resetFields();
    },
  },
  computed: {
    /**
     * @description: 表单配置项
     * @Author: 培培
     * @return {*}
     */
    options() {
      // 深拷贝
      const Person = JSON.parse(JSON.stringify(this.formOptions));
      for (const key in Person) {
        if (!Object.hasOwnProperty.call(Person, key)) continue;
        //   值
        const item = Person[key];
        item.disabled = item.disabled || false;
        item.tag = item.tag || "input";
        // 如果之前有验证规则，否则 []
        item.rules = item.rules || [];
        if (
          item.required === true &&
          !item.rules.some((v) => v.required === true)
        ) {
          item.rules.unshift({
            required: true,
          });
        }
        //   添加规则
        for (const rule of item.rules) {
          rule.trigger = rule.trigger || "blur";
          if (rule.message) continue;
          if (rule.required) {
            rule.message = `${item.title}不能为空`;
          } else if (this.isNumber(rule.min) && this.isNumber(rule.max)) {
            rule.message = `${item.title}必须为${rule.min}-${rule.max}位`;
            item.max = item.max || rule.max;
          } else if (this.isNumber(rule.min)) {
            rule.message = `${item.title}最小程度位${rule.min}`;
          } else if (this.isNumber(rule.max)) {
            rule.message = `${item.title}最大长度位${rule.max}`;
            item.max = item.max || rule.max;
          } else if (rule.type) {
            rule.message = `${item.title}格式不正确`;
          }
        }
      }
      return Person;
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
