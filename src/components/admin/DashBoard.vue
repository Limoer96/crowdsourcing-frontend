<template>
  <div class="container">
    <van-nav-bar 
      title="Dashboard"
      right-text="登出"
      @click-right="logout"
      fixed
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
      switch (index) {
        case 0:
          this.active = 0;
          this.$router.replace('/admin/dashboard/data');
          break;
        case 1:
          this.active = 1;
          this.$router.replace('/admin/dashboard/task');
          break;
        case 2: 
          this.active = 2;
          this.$router.replace('/admin/dashboard/arbitration');
          break;  
        default:
          break;
      }
    },
    logout() {
      localStorage.removeItem('a_token');
      this.$router.goBack();
    }
  },
  mounted() {
    // 获取当前路径
    let fullPath = this.$route.fullPath;
    console.log(fullPath);
    let path = /\/admin\/dashboard\/(\w+)/.exec(fullPath)[1];
    console.log(path);
    switch (path) {
      case 'data':
        this.active = 0;
        break;
      case 'task':
        this.active = 1;
        break;
      case 'arbitration': 
        this.active = 2;
        break;    
      default:
        break;
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  margin-top: 46px;
}
</style>
