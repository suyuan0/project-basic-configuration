<template>
  <div>
    <search
      v-model="queryModel.query"
      :loading="searchLoading"
      @search="getOrders"
    ></search>
    <!-- 表格 -->
    <myTable
      :data="orderList"
      :loading="loading"
      :clos="clos"
      :total="total"
      v-model="queryModel"
      @change="getOrders"
    >
      <template v-slot:pay="{ row: { pay_status } }">
        <el-tag :type="pay_status === '0' ? 'danger' : 'success'"
          >{{ pay_status == "0" ? "未" : "已" }}付款</el-tag
        >
      </template>
      <template v-slot:time="{ row: { create_time } }">
        {{ new Date(create_time * 1000).format() }}
      </template>
      <template v-slot:action="{ row }">
        <el-button
          icon="el-icon-edit"
          type="primary"
          size="mini"
          @click="
            model = {};
            $refs.df.show();
          "
        ></el-button>
        <el-button
          icon="el-icon-location"
          type="success"
          size="mini"
          @click="getlogisticsList"
        ></el-button>
      </template>
    </myTable>
    <!-- 扁担 -->
    <DialogForm
      :value="model"
      :formOptions="options"
      ref="df"
      @confirm="$refs.df.hide()"
    ></DialogForm>
    <!-- 物流 -->
    <Dialog
      :closeModal="true"
      ref="kd"
      @cancel="$refs.kd.hide()"
      title="物流进度"
    >
      <div class="logistics" v-for="(item, i) in logistics" :key="i">
        <div class="context">{{ item.context }}</div>
        <div class="time">{{ item.time }}</div>
      </div>
      <div slot="footer"></div>
    </Dialog>
  </div>
</template>

<script>
import { getOrdersList, getLogistics } from "api/order";
import city from "utils/city";
/**表格列 */
const clos = [
  {
    title: "#",
    type: "index",
  },
  {
    title: "订单编号",
    name: "order_number",
  },
  {
    title: "订单价格",
    name: "order_price",
  },
  {
    title: "是否付款",
    slot: "pay",
  },
  {
    title: "是否发货",
    name: "is_send",
  },
  {
    title: "下单时间",
    slot: "time",
  },
  {
    title: "操作",
    align: "center",
    slot: "action",
  },
];
export default {
  name: "orders",
  data() {
    return {
      /**物流信息 */
      logistics: [],
      /**表单数据模型 */
      model: {},
      clos,
      /**数据模型 */
      queryModel: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      /**搜索loading */
      searchLoading: false,
      /**条数 */
      total: 0,
      /**表格数据 */
      orderList: [],
      /**表格loading */
      loading: false,
      //   表单配置项
      options: {
        city: {
          title: "省市区/县",
          tag: "cascader",
          required: true,
          value: city,
          width: "100%",
        },
        address: {
          title: "详细地址",
          required: true,
          max: 50,
        },
      },
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    /**
     * @description: 获取订单列表
     * @Author: 培培
     * @return {*}
     */
    async getOrders() {
      try {
        this.loading = true;
        const { total, goods } = await getOrdersList(this.queryModel);
        this.total = total;
        this.orderList = goods;
      } catch (error) {}
      this.loading = false;
    },
    /**
     * @description: 获取物流信息
     * @Author: 培培
     * @return {*}
     */
    async getlogisticsList() {
      try {
        this.loading = true;
        this.logistics = await getLogistics();
        this.$refs.kd.show();
      } catch (error) {}
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.logistics {
  border-left: 2px solid #e4e7ed;
  padding-left: 20px;
  margin-left: 50px;
  padding-bottom: 20px;
  position: relative;
  &:last-child {
    border: 0;
    &::before {
      left: -4px;
    }
  }
  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #e4e7ed;
    left: -6px;
    top: 0px;
  }
  .context {
      margin-bottom: 5px;
      font-size: 14px;
  }
  .time {
    color: #909399;
  }
}
</style>
