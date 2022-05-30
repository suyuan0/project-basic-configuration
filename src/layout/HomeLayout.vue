<!--
 * @Author: 培培
 * @Date: 2022-05-29 20:25:41
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-30 12:02:57
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
        <div class="content">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import asideComponent from "./asideComponent.vue";
export default {
  components: { asideComponent },
  name: "HomeLayout",
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
    }
    main {
      background: #eaedf1;
      height: 100%;
      flex: 1;
      overflow: hidden;
      .content {
        overflow: auto;
        max-height: 100%;
      }
    }
  }
}
</style>
