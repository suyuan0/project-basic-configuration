<template>
  <div class="wrapper">
    <div class="login">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <div class="form">
        <el-form :model="model" :rules="rules" ref="ruleForm">
          <el-form-item prop="username">
            <el-input
              maxlength="10"
              v-model="model.username"
              prefix-icon="el-icon-user-solid"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              maxlength="15"
              type="password"
              v-model="model.password"
              prefix-icon="el-icon-s-goods"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button
              type="primary"
              @click="userLogin('ruleForm')"
              :loading="loading"
              >登录</el-button
            >
            <el-button type="info" @click="reset('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { login } from "api/user";
import { getMenus } from "api/menu";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      /**
       * @description: 数据
       * @Author: 培培
       * @return {*}
       */
      model: {
        username: "admin",
        password: "123456",
      },
      /**
       * @description: 验证
       * @Author: 培培
       * @return {*}
       */
      rules: {
        username: [
          {
            required: true,
            message: "请输入登录名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在3到10个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "长度在6到15个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(["setUser", "setMenus"]),
    /**
     * @description: 用户登录
     * @param {*} formName
     * @Author: 培培
     * @return {*}
     */
    async userLogin(formName) {
      try {
        await this.$refs.ruleForm.validate();
        this.loading = true;
        const data = await login(this.model);
        this.setUser(data);
        const menu = await getMenus();
        this.setMenus(menu);
        this.$router.push({ name: "HomeLayout" });
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    /**
     * @description: 重置
     * @param {*} fornName
     * @Author: 培培
     * @return {*}
     */
    reset(fornName) {
      this.model = {
        username: "",
        password: "",
      };
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  background: #2b4b6b;
  position: relative;
  .login {
    width: 450px;
    height: 300px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // display: flex;
    .logo {
      box-sizing: border-box;
      width: 152px;
      height: 152px;
      background: #fff;
      position: absolute;
      top: -50%;
      left: 50%;
      margin-left: -76px;
      margin-top: 76px;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #eeeeee;
      }
    }
    .form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      .el-form {
        .btns {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
