<template>
  <div ref="reports" id="reports"></div>
</template>

<script>
import * as Echarts from "echarts";
import { getReportsList } from "api/reports";
export default {
  name: "reports",
  data() {
    return {
      /**图表数据 */
      options: {},
    };
  },
  created() {
    this.getReports();
  },
  methods: {
    /**
     * @description: 获取图标数据
     * @Author: 培培
     * @return {*}
     */
    async getReports() {
      try {
        this.options = await getReportsList();
        const echart = Echarts.init(this.$refs.reports);
        echart.setOption(this.options);
        // echarts.init("#echarts", options);
      } catch (error) {
          console.log(error)
      }
    },
  },
};
</script>

<style>
#reports {
  width: 750px;
  height: 400px;
}
</style>
