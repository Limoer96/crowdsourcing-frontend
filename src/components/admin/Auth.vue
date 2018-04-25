<template>
  <div class="container">
    <div>
      <div class="header">
        <p class="title">管理员登录</p>
        <p class="desc">平台数据、任务审核、仲裁管理</p>
      </div>
      <van-cell-group>
        <van-field v-model="name" placeholder="管理员id"/>
        <van-field type="password" v-model="password" placeholder="管理员密码" />
      </van-cell-group>
      <van-row>
        <van-col span="22" offset="1">
          <van-button 
            style="background-color: rgb(0,132,255); color: #fff; margin-top: .4rem;" 
            size="large"
            @click="auth"
          >登录</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import admin from '../../api/admin';
export default {
  name: 'AdminAuth',
  data() {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    auth() {
      if(this.name && this.password) {
        // 简单的验证
        // api
        admin
          .auth({ name: this.name, password: this.password })
          .then((json => {
            if(json.status === 1) {
              this.$toast('验证失败，请检查用户名、密码')
            }else {
              this.$toast('验证成功');
              localStorage.setItem('a_token', json.data.token);
              this.$router.push('/admin/dashboard');
            }
          }))
      }
    }
  }
}
</script>

<style scoped>
.header {
  background-color: rgb(0, 132, 255);
  color: #fff;
  text-align: center;
}
.header > p {
  margin: 0;
}
.title {
  font-size: 30px;
  font-weight: 500;
  padding: 16px 0 6px 0;
}
.desc {
  font-size: 18px;
  padding: 6px 0;
}
</style>
