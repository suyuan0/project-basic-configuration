<!--
 * @Author: 培培
 * @Date: 2022-05-30 11:26:23
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-05-30 16:01:49
 * @FilePath: \project-basic-configuration\src\layout\asideComponent.vue
 * @Description: 左侧菜单组件
 * 
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved. 
-->
<template>
  <aside :style="{ width: isCollapse ? '64px' : '200px' }">
    <p @click="isCollapse = !isCollapse">|||</p>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409eff"
      router
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <el-submenu
        v-for="item in $store.state.menus"
        :key="item.id"
        :index="item.id + ''"
      >
        <template slot="title">
          <i v-if="item.id === 125" class="el-icon-user-solid"></i>
          <i v-if="item.id === 103" class="el-icon-s-tools"></i>
          <i v-if="item.id === 101" class="el-icon-s-goods"></i>
          <i v-if="item.id === 102" class="el-icon-s-order"></i>
          <i v-if="item.id === 145" class="el-icon-s-order"></i>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="child in item.children"
            :key="child.id"
            :index="child.id + ''"
            :route="'/' + child.path"
          >
            <i class="el-icon-menu"></i>
            <span>{{ child.authName }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </aside>
</template>

<script>
export default {
  name: "asideComponent",
  data() {
    return {
      isCollapse: false,
    };
  },
};
</script>

<style lang="scss" scoped>
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
</style>
