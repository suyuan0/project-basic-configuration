<!--
 * @Author: 培培
 * @Date: 2022-05-29 20:25:41
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-29 20:39:05
 * @FilePath: \money\src\layout\HomeLayout.vue
 * @Description: 布局页
 * 
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved. 
-->
<template>
  <div class="wrapper">
    <header></header>
    <div class="main">
      <aside></aside>
      <main></main>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeLayout",
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
  }
  .main {
    flex: 1;
    display: flex;
    aside {
      height: 100%;
      background: #333744;
      width: 200px;
    }
    main {
      background: #eaedf1;
      height: 100%;
      flex: 1;
    }
  }
}
</style>
