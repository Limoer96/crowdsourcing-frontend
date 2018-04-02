<template>
  <div class="wrapper">
    <div class="header">
      <p>重置密码</p>
      <p>为你的账户设置新的密码</p>
    </div>
    <div>
      <van-cell-group>
        <van-field type="password" v-model="password" placeholder="请输入密码"/>
        <van-field type="password" v-model="passwordAgain" placeholder="再次确认密码"/>        
      </van-cell-group>
      <div class="span"></div>
      <van-row>
        <van-col span="22" offset="1">
          <van-button size="large" @click="resetPassword" type="primary">修改</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      passwordAgain: '',
      alertMsg: ''
    }
  },
  methods: {
    resetPassword() {
      const token = this.$route.query.t;
      if(this.password === this.passwordAgain && this.password.length > 8) {
        this.$store.dispatch('resetPassword', { 
          data: { token: token, password: this.password },
          alert: this.$toast,
          router: this.$router
        })
      }else {
        this.$toast.fail('秘密大于8位，且输入前后一致哦！');
        this.password = '';
        this.resetPassword = '';
      }
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #4b0;
  color: #fff;
  text-align: center;
  margin-bottom: .2rem;
}
.header > p:first-child {
  margin: 0;
  padding: 0;
  font-size: 32px;
  font-weight: bold;
  padding-top: 10px;
}
.header > p:last-child {
  margin: 0;
  padding-bottom: 30px;
}
.span {
  width: 100%;
  height: .2rem;
}
</style>

