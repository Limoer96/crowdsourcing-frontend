<template>
  <div class="error-container">
    <p class="alert">加载出错了...</p>
    <img src="../../assets/error.png" width="100%" height="243px" alt="加载错误">
  </div>
</template>

<script>
export default {
  name: 'Erro'
}
</script>

<style scoped>
.error-container {
  position: absolute;
  top: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.1);
  z-index: -10;
}
.alert {
  margin: 0;
  margin-top: 4rem;
  font-weight: bold;
  color: #fff;
}
</style>
