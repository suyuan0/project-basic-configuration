<template>
  <div>
    <search
      btnText="添加分类"
      @add="
        model = {};
        gCateList();
      "
    ></search>
    <myTable
      Rkey="cat_id"
      :loading="loading"
      :data="data"
      :clos="clos"
      :total="total"
      v-model="queryModel"
      @change="getCateList"
      :treeProps="{ children: 'children' }"
    >
      <template v-slot:icon="{ row: { cat_deleted } }">
        <i
          :style="{ color: !cat_deleted ? '#90ee90' : '#f00' }"
          :class="!cat_deleted ? 'el-icon-success' : 'el-icon-error'"
        ></i>
      </template>
      <template v-slot:sort="{ row: { cat_level } }">
        <el-tag :type="colors[cat_level]">{{ levels[cat_level] }}级</el-tag>
      </template>
      <template v-slot:action="{ row }">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="
            model = { ...row };
            gCateList();
          "
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="delCate(row)"
          >删除</el-button
        >
      </template>
    </myTable>
    <!-- 模态框 -->
    <DialogForm
      :title="title + '分类'"
      ref="df"
      :formOptions="opts"
      :value="model"
      @confirm="confirm"
    />
  </div>
</template>

<script>
import { getCategories, delCates, editCates, addCates } from "api/goods";
import { levels, colors } from "utils/common";
/**表格列 */
const clos = [
  {
    title: "#",
    type: "index",
  },
  {
    title: "分类名称",
    name: "cat_name",
  },
  {
    title: "是否有效",
    slot: "icon",
  },
  {
    title: "排序",
    slot: "sort",
  },
  {
    title: "操作",
    align: "center",
    slot: "action",
  },
];
export default {
  name: "categories",
  data() {
    return {
      levels,
      colors,
      clos,
      /**条数 */
      total: 0,
      /**查询模型*/
      queryModel: {
        type: 3,
        pagenum: 1,
        pagesize: 10,
      },
      /**数据列表 */
      data: [],
      /**loading */
      loading: false,
      /**表单数据模型 */
      model: {},
      /**分类列表 */
      cateList: [],
    };
  },
  created() {
    this.getCateList();
  },
  computed: {
    /**标题 */
    title() {
      return this.model.cat_id ? "修改" : "添加";
    },
    /**表单配置 */
    opts() {
      return {
        cat_name: {
          title: "分类名称",
          required: true,
          max: 20,
        },
        ...(this.model.cat_id
          ? {}
          : {
              cat_pid: {
                title: "父级分类",
                tag: "cascader",
                value: [...this.cateList],
                props: {
                  label: "cat_name",
                  value: "cat_id",
                  checkStrictly: true,
                },
              },
            }),
      };
    },
  },
  methods: {
    /**
     * @description: 获取分类列表
     * @Author: 培培
     * @return {*}
     */
    async gCateList() {
      try {
        this.cateList = await getCategories({ type: 2 });
        this.$refs.df.show();
      } catch (error) {}
    },
    /**
     * @description: 获取表格数据
     * @Author: 培培
     * @return {*}
     */
    async getCateList() {
      try {
        this.loading = true;
        const { total, result } = await getCategories(this.queryModel);
        this.total = total;
        this.data = result;
      } catch (error) {}
      this.loading = false;
    },
    /**
     * @description: true
     * @param {*} 删除分类
     * @Author: 培培
     * @return {*}
     */
    async delCate({ cat_id, cat_name }) {
      let close;
      try {
        close = await this.$confirm(`确定删除【${cat_name}】吗`);
        await delCates(cat_id);
        this.$m.success("删除成功");
        this.getCateList();
      } catch (error) {}
      close && close();
    },
    /**
     * @description: 添加 编辑
     * @param {*} model
     * @Author: 培培
     * @return {*}
     */
    async confirm(model) {
      console.log(model);
      let df = this.$refs.df;
      const data = { ...model };
      let p = data.cat_pid;
      data.cat_pid = p ? p[p.length - 1] : 0;
      data.cat_level = p?.length || 0;
      try {
        df.openLoading();
        await (data.cat_id ? editCates : addCates)(data);
        this.$m.success(`${data.cat_id ? "修改" : "添加"}成功`);
        this.getCateList();
        df.hide();
      } catch (error) {}
      df.endLoading();
    },
  },
};
</script>

<style></style>
