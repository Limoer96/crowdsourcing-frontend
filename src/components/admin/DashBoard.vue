<template>
  <div class="container">
    <van-nav-bar 
      title="Dashboard"
      right-text="登出"
    />
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" @change="changeTab">
      <van-tabbar-item icon="edit-data">数据总览</van-tabbar-item>
      <van-tabbar-item icon="pending-evaluate">任务审查</van-tabbar-item>
      <van-tabbar-item icon="points">任务仲裁</van-tabbar-item>      
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      active: 0
    }
  },
  methods: {
    changeTab(index) {
      this.$toast(index);
    }
  }
}
</script>

<style scoped>

</style>
