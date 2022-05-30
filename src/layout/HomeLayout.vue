<!--
 * @Author: 培培
 * @Date: 2022-05-29 20:25:41
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-30 19:26:53
 * @FilePath: \project-basic-configuration\src\layout\HomeLayout.vue
 * @Description: 布局页
 * 
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved. 
-->
<template>
  <div class="wrapper">
    <header>
      <div class="logo">
        <img src="http://shiyansong.cn/img/heima.b5a855ee.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="exit">退出</el-button>
    </header>
    <div class="main">
      <aside-component></aside-component>
      <main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'HomeLayout' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{ parentName }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ childName }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import asideComponent from "./asideComponent.vue";
import AsideComponent from "./asideComponent.vue";
export default {
  components: { asideComponent, AsideComponent },
  name: "HomeLayout",
  data() {
    return {
      parentName: "",
      childName: "",
    };
  },
  computed: {
    ...mapState(["menus"]),
  },
  mounted() {
    this.findMenu();
  },
  updated() {
    this.findMenu();
  },
  methods: {
    /**
     * @description: 退出
     * @Author: 培培
     * @return {*}
     */
    async exit() {
      try {
        await this.$mb.confirm("您确定要退出嘛");
        this.$store.dispatch("exit");
      } catch (error) {}
    },
    /**
     * @description: 查找菜单
     * @Author: 培培
     * @return {*}
     */
    findMenu() {
      // 当前路径
      const path = this.$route.path.replace("/", "");
      // 遍历第一级菜单
      for (const parent of this.menus) {
        // 遍历第二级菜单
        for (const child of parent.children) {
          // 如果第二级菜单的路径跟当前页面的路径一致
          if (child.path === path) {
            this.parentName = parent.authName;
            this.childName = child.authName;
            return;
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  header {
    height: 60px;
    background: #373d41;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    .logo {
      display: flex;
      align-items: center;
      color: white;
      font-size: 20px;
      span {
        margin-left: 20px;
      }
    }
  }
  .main {
    flex: 1;
    display: flex;
    overflow: hidden;
    aside {
      height: 100%;
      background: #333744;
      width: 200px;
      p {
        margin: 0;
        color: #fff;
        height: 24px;
        background: #4a5064;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        cursor: pointer;
      }
    }
    main {
      background: #eaedf1;
      height: 100%;
      flex: 1;
      overflow: hidden;
      padding: 20px;
      display: flex;
      flex-direction: column;
      .content {
        overflow: auto;
        max-height: 100%;
        margin-top: 20px;
        border-radius: 3px;
        padding: 20px;
        background: white;
        border: 1px solid #ebeef5;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
        padding-bottom: 20px;
      }
    }
  }
}
</style>
