<template>
  <div class="loading-container">
    <p>加载中...</p>
    <van-loading style="margin-left: 40%;" type="circle" color="black" size="60px"/>
  </div>
</template>
<script>
export default {
  name: 'Loading'
}
</script>

<style scoped>
.loading-container {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .2);
  z-index: 10;
}
.loading-container > p {
  margin: 0;
  padding: 0;
  width: 100%;
  margin-top: 5rem;
  text-align: center;
  color: rgba(0, 0, 0, .4);
  font-weight: bold;
}
</style>
