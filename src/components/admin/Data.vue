<template>
  <div class="container">
    <p>这是数据总览页面</p>
  </div>
</template>
<script>
import admin from '../../api/admin';
export default {
  name: 'Data',
  mounted () {
    // api
    admin.getDataDetail({ token: localStorage.getItem('a_token')}).then(res => {
      this.$toast('获取数据成功');
    }).catch(err => {
      this.$toast('获取失败');
    })
  }
}
</script>
