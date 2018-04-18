<template>
  <div class="nav-tool-container">
    <ul class="nav-tool">
      <li><button @click="showNavTool" class="btn"><van-icon name="wrap-nav"/><van-icon name="wap-nav"/></button></li>
      <li :class="['nav-tool-item',{'show-nav-tool': show}]">
        <router-link to="/publish"><van-icon name="records"/></router-link>
        <router-link to="message"><van-icon name="pending-evaluate"/></router-link>
        <router-link to="/multConditions"><van-icon name="search"/></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavTool',
  data() {
    return {
      uId: '',
      show: false
    }
  },
  mounted () {
    this.uId = localStorage.getItem('id');
  },
  methods: {
    showNavTool() {
      this.show = !this.show;
    }
  }
}
</script>

<style scoped>
.nav-tool-container {
  position: fixed;
  top: 8rem;
  left: .1rem;
  z-index: 1000; 
  background-color:rgba(255, 255, 255, .8);
  border-radius: 10px;
  box-shadow: 0px 0px 1px 2px rgba(0,0,0,.4);
  animation: 2s linear 0s infinite alternate shadow-a;
}

@keyframes shadow-a {
  0% {
    box-shadow: 0px 0px 1px 2px rgba(0,0,0,.5);
  }
  100% {
    box-shadow: 0px 0px 2px 4px rgba(0,0,0,.3);
  }
}

.nav-tool {
  display: flex;
  flex-wrap: nowrap;
  font-size: 24px;
}

.nav-tool > li {
  margin: 0;
  padding: 8px 5px 0 5px;
}

.nav-tool-item {
  margin-left: .2rem;
  display: none; 
  opacity: 0;
  transition: all .5s ease; 
}

.nav-tool > li a {
  color: #000;
  padding: 0 .2rem;
}

.show-nav-tool {
  display: inline;
  opacity: 1;
}

.btn {
  -webkit-appearance : none; /*为解决Safari浏览器button圆角的问题, 取消默认的button样式*/
  margin: 0;
  padding: 1px;
  background: none;
  border: none;
}
</style>
