<template>
  <div>
    <el-alert
      title="注意：只允许第三季分类设置相关参数!"
      type="warning"
      show-icon
    >
    </el-alert>
    <header>
      <span class="demonstration">选择商品分类：</span>
      <el-cascader
        @change="getAttributes"
        v-model="value"
        :options="list"
        :props="{
          label: 'cat_name',
          value: 'cat_id',
          expandTrigger: 'hover',
        }"
      >
      </el-cascader>
    </header>
    <main>
      <el-tabs v-model="activeName" @tab-click="getAttributes">
        <el-tab-pane
          :label="`${item.type}${item.title}`"
          :name="key"
          v-for="(item, key) in type"
          :key="key"
        >
          <el-button
            size="mini"
            type="primary"
            @click="
              model = {};
              $refs.df.show();
            "
            :disabled="!catId"
            >添加{{ item.title }}</el-button
          ></el-tab-pane
        >
        <myTable
          :loading="loading"
          :data="attributeList"
          :clos="clos"
          Rkey="attr_id"
        >
          <template v-slot:expand="{ row }">
            <el-tag
              class="tags"
              v-for="(item, i) in row.tags"
              :key="i"
              closable
              @close="delTag(row, i)"
            >
              {{ item }}</el-tag
            >
            <el-input
              class="input-new-tag"
              v-if="row.inputVisible"
              v-model="row.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            >
            </el-input>
            <el-button
              v-else
              size="mini"
              @click="
                row.inputVisible = true;
                $nextTick(() => {
                  $refs.saveTagInput.focus();
                });
              "
            >
              + New Tag
            </el-button>
          </template>
          <!-- 按钮 -->
          <template v-slot:action="{ row }">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="
                model = { ...row };
                $refs.df.show();
              "
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(row)"
              >删除</el-button
            >
          </template>
        </myTable>
      </el-tabs>
      <DialogForm
        :title="(model.attr_id ? '修改' : '添加') + title"
        ref="df"
        :value="model"
        :formOptions="ops"
        @confirm="addCate"
      ></DialogForm>
    </main>
  </div>
</template>

<script>
import {
  getCategories,
  getAttributes,
  upAttr,
  add,
  delCate,
  editCate,
} from "api/goods";

export default {
  name: "params",
  data() {
    return {
      /**选中值*/
      value: [],
      /**数据列表 */
      list: [],
      /**激活名称 */
      activeName: "many",
      /**类型 */
      type: {
        many: {
          title: "参数",
          type: "动态",
        },
        only: {
          type: "静态",
          title: "属性",
        },
      },
      /**属性列表 */
      attributeList: [],
      /**loading */
      loading: false,
      /**数据 */
      model: {},
    };
  },
  created() {
    this.getCategoryList();
  },
  computed: {
    /**标题 */
    title() {
      const item = this.type[this.activeName];
      return item.type + item.title;
    },
    /**分类ID */
    catId() {
      return this.value.length > 2 && this.value[2];
    },
    /**表格列 */
    clos() {
      return [
        {
          type: "expand",
          title: "",
          slot: "expand",
        },
        {
          title: "#",
          type: "index",
        },
        {
          title: this.type[this.activeName]?.title + "名称",
          name: "attr_name",
        },
        {
          title: "操作",
          align: "center",
          width: 200,
          slot: "action",
        },
      ];
    } /**表单配置 */,
    ops() {
      return {
        attr_name: {
          title: this.title,
          required: true,
          max: 20,
        },
      };
    },
  },
  methods: {
    /**
     * @description: 删除分类
     * @param {*} row
     * @Author: 培培
     * @return {*}
     */
    async del({ attr_id, attr_name }) {
      let close;
      try {
        close = await this.$confirm(`确定删除【${attr_name}】`);
        await delCate(this.catId, attr_id);
        this.$m.success("删除成功");
        this.getAttributes();
      } catch (error) {
        console.log(error);
      }
      close && close();
    },
    /**
     * @description: 删除标签
     * @param {*} row
     * @Author: 培培
     * @return {*}
     */
    async delTag(row, i) {
      try {
        const { attr_id, attr_sel, attr_name } = row;
        row.tags.splice(i, 1);
        const attr_vals = row.tags.join(" ");
        await upAttr(this.catId, attr_id, {
          attr_vals,
          attr_name,
          attr_sel,
        });
        this.$m.success("删除成功");
        this.getAttributes();
      } catch (error) {}
    },
    /**
     * @description: 添加
     * @Author: 培培
     * @return {*}
     */
    async addCate(model) {
      const m = {
        ...model,
        attr_sel: this.activeName,
      };
      const df = this.$refs.df;
      try {
        console.log(model);
        df.openLoading();
        await (model.attr_id ? editCate : add)(this.catId, m);
        this.$m.success(`${model.attr_id ? "修改" : "添加"}参数成功`);
        df.hide();
        this.getAttributes();
      } catch (error) {}
      df.endLoading();
    },
    /**
     * @description: 获取分类列表
     * @Author: 培培
     * @return {*}
     */
    async getCategoryList() {
      try {
        this.list = await getCategories();
      } catch (error) {}
    },
    async getAttributes() {
      try {
        if (!this.catId) return;
        this.loading = true;
        this.attributeList = await getAttributes(this.catId, this.activeName);
        this.attributeList.forEach((item) => {
          this.$set(item, "inputVisible", false);
          this.$set(item, "inputValue", "");
          item.tags = item.attr_vals?.split(" ")?.filter((v) => v) || [];
        });
      } catch (error) {}
      this.loading = false;
    },
    /**
     * @description: 添加标签
     * @Author: 培培
     * @return {*}
     */
    async handleInputConfirm(row) {
      const value = row.inputValue?.trim();
      const { attr_name, attr_sel } = row;
      try {
        this.loading = true;
        if (!value) return;
        row.inputValue = "";
        const attr_vals = [...row.tags, value].join(" ");
        await upAttr(this.catId, row.attr_id, {
          attr_vals,
          attr_name,
          attr_sel,
        });
        row.tags.push(value);
        this.$m.success("修改成功");
        this.getAttributes();
      } catch (error) {
      } finally {
        row.inputVisible = false;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  margin: 20px 0;
}
.tags {
  margin-right: 10px;
  &:nth-of-type(1) {
    margin-left: 10px;
  }
}
.input-new-tag {
  width: 100px;
}
</style>
