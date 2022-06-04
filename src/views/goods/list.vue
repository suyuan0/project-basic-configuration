<template>
  <div>
    <!-- 搜索框 -->
    <search
      btnText="添加商品"
      v-model="qModel.query"
      :loading="listLoading"
      @search="getGoodsList"
      @add="
        model = {};
        $refs.dialog.show();
      "
    >
    </search>
    <!-- 表格 -->
    <myTable
      :data="list"
      :clos="clos"
      v-model="qModel"
      @change="getGoodsList"
      :total="total"
    >
      <!-- 时间 -->
      <template v-slot:time="{ row: { add_time } }">
        {{ new Date(add_time * 100).format() }}
      </template>
      <!-- 操作 -->
      <template v-slot:action="{ row }">
        <!-- 编辑 -->
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="
            model = { ...row };
            $refs.dialog.show();
          "
        ></el-button>
        <!-- 删除 -->
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="delGoods(row)"
        ></el-button>
      </template>
    </myTable>
    <!-- 模态框 -->
    <DialogForm
      ref="dialog"
      :title="title + `商品`"
      :value="model"
      :formOptions="options"
      @confirm="confirm"
    ></DialogForm>
  </div>
</template>

<script>
import { getGoods, addGoods, updateGoods, deleteGoods } from "api/goods";
/**表格列*/
const clos = [
  {
    title: "#",
    type: "index",
  },
  {
    title: "商品名称",
    name: "goods_name",
  },
  {
    title: "商品价格(元)",
    name: "goods_price",
    width: 130,
  },
  {
    title: "商品重量",
    name: "goods_weight",
    width: 100,
  },
  {
    title: "创建时间",
    slot: "time",
    width: 200,
  },
  {
    title: "操作",
    slot: "action",
    align: "center",
    width: 150,
  },
];
export default {
  name: "goodsList",
  data() {
    return {
      clos,
      /**搜索loading */
      listLoading: false,
      /**商品列表*/
      list: [],
      /**数据模型(查询)*/
      qModel: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      /***/
      //   条数
      total: 0,
      /**数据模型(添加/修改)*/
      model: {
        goods_name: "",
        goods_number: "",
        goods_price: "",
        goods_weight: "",
        pics: [],
      },
    };
  },
  created() {
    this.getGoodsList();
  },
  computed: {
    title() {
      return this.model.goods_id ? "编辑" : "添加";
    },
    /**表单配置项*/
    options() {
      return {
        goods_name: {
          title: "商品名称",
          required: true,
          max: 100,
        },
        goods_number: {
          title: "商品数量",
          required: true,
          type: "number",
        },
        goods_price: {
          title: "商品价格",
          required: true,
          type: "number",
        },
        goods_weight: {
          title: "商品重量",
          required: true,
          type: "number",
        },
        ...(this.model.goods_id
          ? {}
          : {
              pics: {
                title: "上传的图片",
                tag: "upload",
                value: [],
                action: "/shi/upload",
                headers: {
                  Authorization: this.$store.getters.getToken,
                },
              },
            }),
      };
    },
  },
  methods: {
    /**
     * @description: 删除商品
     * @Author: 培培
     * @return {*}
     */
    async delGoods(row) {
      let close;
      try {
        close = await this.$confirm(`要删除【${row.goods_name}】吗?`);
        await deleteGoods(row.goods_id);
        this.$m.success("删除成功");
        this.getGoodsList();
      } catch (error) {
        console.log(error);
      }
      close && close();
    },
    /**
     * @description: 添加修改
     * @param {*} model
     * @Author: 培培
     * @return {*}
     */
    async confirm(model) {
      const df = this.$refs.dialog;
      try {
        df.openLoading();
        if (model.pics) {
          model.pics = model.pics.map((v) => ({
            pic: v.response.data.tmp_path,
          }));
        }
        await (this.model.goods_id ? updateGoods : addGoods)(model);
        this.$m.success(`${this.model.goods_id ? "编辑" : "添加"}成功`);
        this.getGoodsList();
        df.hide();
      } catch (error) {}
      df.endLoading();
    },
    /**
     * @description: 获取商品列表
     * @Author: 培培
     * @return {*}
     */
    async getGoodsList() {
      try {
        this.listLoading = true;
        const { goods, total } = await getGoods(this.qModel);
        this.list = goods;
        this.total = total;
      } catch (error) {}
      this.listLoading = false;
    },
  },
};
</script>

<style></style>
