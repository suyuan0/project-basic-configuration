<!--
 * @Author: 培培
 * @Date: 2022-05-30 12:07:26
 * @LastEditors: 培培 614963845@qq.com
 * @LastEditTime: 2022-06-06 17:20:12
 * @FilePath: \project-basic-configuration\src\views\other\404.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 培培 614963845@qq.com, All Rights Reserved. 
-->
<template>
  <a-result status="404" title="404" sub-title="哎呀,页面不见了呀">
    <template #extra>
      <a-button type="primary" @click="$router.replace({ name: 'HomeLayout' })">
        Back Home
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
