<template>
  <div>
    <!-- 搜索 -->
    <search
      btnText="添加用户"
      v-model="queryModel.query"
      @search="userSearch"
      :loading="loading"
    />
    <!-- 表格---分页  -->
    <!-- 双星绑定page，change包含 pagesize和pagenum的改变 -->
    <myTable
      :total="total"
      v-model="queryModel"
      @change="userSearch"
      :data="list"
      :clos="clos"
    >
      <template v-slot:status="{ row }">
        <el-switch
          @change="(value) => changeState(row, value)"
          v-model="row.mg_state"
        ></el-switch>
      </template>
      <template v-slot:actions="{ row }">
        <!-- 编辑 -->
        <el-button
          @click="
            dialogShow = true;
            addModel = { ...row };
          "
          type="primary"
          size="mini"
          icon="el-icon-edit"
        ></el-button>
        <!-- 删除 -->
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          @click="delUser(row)"
        ></el-button>
        <!-- 设置 -->
        <el-button
          type="warning"
          size="mini"
          icon="el-icon-s-tools"
          :loading="roleLoading"
          @click="
            addModel = { ...row };
            getRoleList();
          "
        ></el-button>
      </template>
    </myTable>
    <!-- 添加模态框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogShow"
      :title="(isAdd ? '添加' : '编辑') + '用户'"
    >
      <span>
        <el-form
          ref="addForm"
          label-width="70px"
          :rules="rules"
          :model="addModel"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              :disabled="!isAdd"
              maxlength="10"
              v-model="addModel.username"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="isAdd" label="密码" prop="password">
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
        <el-button type="primary" @click="addUsers" :loading="addLoading"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <!-- 分配角色模态框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="roleDialogShow"
      title="分配角色"
    >
      <p>当前用户：{{ addModel.username }}</p>
      <p>当前的角色：{{ addModel.role_name }}</p>
      <p>
        分配新角色
        <el-select v-model="addModel.role_name" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.role_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </p>
      <div slot="footer">
        <el-button @click="roleDialogShow = false">取消</el-button>
        <el-button type="primary" @click="assingUserRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
 * @description: 列
 * @Author: 培培
 * @return {*}
 */
const clos = [
  {
    type: "index",
    title: "#",
  },
  {
    title: "姓名",
    name: "username",
  },
  {
    title: "邮箱",
    name: "email",
  },
  {
    title: "电话",
    name: "mobile",
  },
  {
    title: "角色",
    name: "role_name",
  },
  {
    title: "状态",
    width: "80",
    slot: "status",
  },
  {
    title: "操作",
    align: "center",
    slot: "actions",
  },
];
import { getRoles } from "api/role";
import {
  search,
  switchState,
  addUser,
  editUser,
  deleteUser,
  assingRole,
} from "api/user";
/**
 * @description: 列
 * @Author: 培培
 * @return {*}
 */
const cols = [
  {
    title: "#",
    type: "index",
  },
  {
    title: "姓名",
  },
];
export default {
  name: "userList",
  data() {
    return {
      clos,
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
       * @description: 角色列表
       * @Author: 培培
       * @return {*}
       */
      roleList: [],
      /**
       * @description: 模态框的显示隐藏
       * @Author: 培培
       * @return {*}
       */
      dialogShow: false,
      /**
       * @description: 分配角色模态框
       * @Author: 培培
       * @return {*}
       */
      roleDialogShow: false,
      /**
       * @description: 搜索动画
       * @Author: 培培
       * @return {*}
       */
      loading: false,
      /**
       * @description: 添加loading
       * @Author: 培培
       * @return {*}
       */
      addLoading: false,
      /**
       * @description: 分配角色loading
       * @Author: 培培
       * @return {*}
       */
      roleLoading: false,
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
  updated() {},
  computed: {
    /**
     * @description: 判断添加或编辑
     * @Author: 培培
     * @return {*}
     */
    isAdd() {
      return this.addModel.id ? false : true;
    },
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
    async addUsers() {
      try {
        await this.$refs.addForm.validate();
        this.addLoading = true;
        (await this.isAdd)
          ? addUser(this.addModel)
          : editUser(this.addModel.id, this.addModel);
        this.userSearch();
        this.$m.success(`${this.isAdd ? "添加" : "修改"}成功`);
        this.dialogShow = false;
      } catch (error) {
        console.log(error);
      }
      this.addLoading = false;
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
    /**
     * @description: 删除用户
     * @Author: 培培
     * @param {row}
     * @return {*}
     */
    async delUser(row) {
      let close;
      try {
        close = await this.$confirm(`确定删除${row.username}吗？`);
        await deleteUser(row.id);
        this.$m.success("删除成功");
        this.userSearch();
      } catch (error) {}
      close && close();
    },
    /**
     * @description: 获取角色列表
     * @Author: 培培
     * @return {*}
     */
    async getRoleList() {
      try {
        this.roleLoading = true;
        this.roleList = await getRoles();
        this.roleDialogShow = true;
      } catch (error) {}
      this.roleLoading = false;
    },
    /**
     * @description: 分配用户角色
     * @Author: 培培
     * @return {*}
     */
    async assingUserRole() {
      try {
        this.addLoading = true;
        await assingRole(this.addModel.id, this.addModel.role_name);
        this.$m.success("角色分配成功");
        this.roleDialogShow = false;
        this.userSearch();
      } catch (error) {}
      this.addLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
