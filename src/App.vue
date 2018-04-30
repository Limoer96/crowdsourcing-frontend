<template>
  <div id="app">
    <nav-tool v-if="!isAdminSys"/>
    <transition :name="transitionName">
      <router-view class="router"/>
    </transition>
  </div>
</template>

<script>
import NavTool from './components/sections/NavTool';
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-right'
    }
  },
  computed: {
    isAdminSys() {
      // 如果是管理员界面，就不用悬浮导航栏了
      let path = this.$route.fullPath;
      return /\/admin\/*/.test(path); 
    }
  },
  watch: {
    '$route'(to ,from){
      let isBack = this.$router.isBack;
      if(isBack) {
        this.transitionName = 'slide-right';
      }else {
        this.transitionName = 'slide-left';
      }
      this.$router.isBack = false;
    }
  },
  components: {
    NavTool
  }
}
</script>

<style>

html, body{
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
  width: 100%;
  height: 100%;
}

.router {
  position: absolute;
  width: 100%;
  transition: all .6s ease;
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-right-enter, .slide-left-leave-active {
  opacity: 0;
  transform: translate(-100%, 0);
}




</style>
