import request from "./requset";

/**
 * @description: 获取图标数据
 * @Author: 培培
 * @return {*}
 */
export const getReportsList = () => request.get("reports/type/1");
