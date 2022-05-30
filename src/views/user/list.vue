<template>
  <div>
    <!-- 搜索 -->
    <div class="search">
      <el-input
        placeholder="请输入内容"
        v-model="queryModel.query"
        class="search-input"
      >
        <el-button
          :loading="loading"
          slot="append"
          @click="
            queryModel.pagenum = 1;
            userSearch();
          "
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button type="primary" @click="dialogShow = true">添加用户</el-button>
    </div>
    <!-- 表格 -->
    <el-table border stripe :data="list">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="username" label="姓名"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="role_name" label="角色"> </el-table-column>
      <el-table-column label="状态" width="80">
        <template v-slot="{ row }">
          <el-switch
            @change="(value) => changeState(row, value)"
            v-model="row.mg_state"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column>
        <template v-slot="{ row }">
          <!-- 编辑 -->
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <!-- 删除 -->
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
          <!-- 设置 -->
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-s-tools"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="
        (size) => {
          queryModel.pagesize = size;
          userSearch();
        }
      "
      @current-change="
        (page) => {
          queryModel.pagenum = page;
          userSearch();
        }
      "
      :current-page="queryModel.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queryModel.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加模态框 -->
    <el-dialog :visible.sync="dialogShow" title="添加用户">
      <span>
        <el-form
          ref="addForm"
          label-width="70px"
          :rules="rules"
          :model="addModel"
        >
          <el-form-item label="用户名" prop="username">
            <el-input maxlength="10" v-model="addModel.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input maxlength="15" v-model="addModel.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addModel.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addModel.mobile"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="diaglog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="addUser" :loading="loading" >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { search, switchState, addUser } from "api/user";
export default {
  name: "userList",
  data() {
    return {
      /**
       * @description: 数据模型
       * @Author: 培培
       * @return {*}
       */
      queryModel: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      /**
       * @description: 总条数
       * @Author: 培培
       * @return {*}
       */
      total: 0,
      /**
       * @description: 表格数据
       * @Author: 培培
       * @return {*}
       */
      list: [],
      /**
       * @description: 模态框的显示隐藏
       * @Author: 培培
       * @return {*}
       */
      dialogShow: false,
      /**
       * @description: 搜索动画
       * @Author: 培培
       * @return {*}
       */
      loading: false,
      /**
       * @description: 添加数据模型
       * @Author: 培培
       * @return {*}
       */
      addModel: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      /**
       * @description: 表单验证
       * @Author: 培培
       * @return {*}
       */
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            message: "用户名的长度再3~10个字符之间",
            min: 3,
            max: 10,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            message: "密码的长度再6~15个字符之间",
            min: 6,
            max: 15,
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator(rule, value, callback) {
              if (/^[\w-+\.]+@[\w-+\.]+\.[a-z0-9]$/i.test(value)) {
                return callback();
              }
              callback(new Error("邮箱格式错误"));
            },
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator(rule, value, callback) {
              if (/^1[3-9]\d{9}$/.test(value)) {
                return callback();
              }
              callback(new Error("手机号格式错误"));
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.userSearch();
  },
  methods: {
    /**
     * @description: 用户搜索
     * @Author: 培培
     * @return {*}
     */
    async userSearch() {
      try {
        this.loading = true;
        const { total, users } = await search(this.queryModel);
        this.list = users;
        this.total = total;
      } catch (error) {}
      this.loading = false;
    },
    /**
     * @description: 修改用户状态
     * @param {*} row
     * @param {*} state
     * @Author: 培培
     * @return {*}
     */
    async changeState(row, state) {
      try {
        await switchState(row.id, state);
        this.$m.success("修改状态成功");
        this.userSearch();
      } catch (error) {}
    },
    /**
     * @description: 添加用户
     * @Author: 培培
     * @return {*}
     */
    async addUser() {
      try {
        await this.$refs.addForm.validate();
        this.loading = true;
        await addUser(this.addModel);
        this.$m.success("添加成功");
        this.userSearch();
        this.dialogShow = false;
      } catch (error) {}
      this.loading = false;
    },
    /**
     * @description: 取消添加
     * @Author: 培培
     * @return {*}
     */
    cancel() {
      this.dialogShow = false;
      this.$refs.addForm.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  width: 400px;
  margin-right: 20px;
}
.el-table {
  margin: 20px 0;
}
</style>
