<template>
  <div class="wrapper">
    <van-nav-bar 
      title="找回密码"
      left-arrow
      left-text="登录"
      @click-left="$router.replace('/auth')"
    />
    <div class="header">
      <p>找回密码</p>
      <p>通过邮箱来找回密码</p>
    </div>
    <div class="form-container">
      <van-cell-group>
        <van-field :error="!checkEmailValidate" v-model="email" label="绑定邮箱" placeholder="输入绑定邮箱"/>
      </van-cell-group>
      <div class="span"></div>
      <van-row>
        <van-col span="22" offset="1">
          <van-button type="primary" @click="sendEmail" size="large">发送邮件</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ""
    }
  },
  methods: {
    sendEmail() {
      if(this.checkEmailValidate) {
        // 合法的邮箱的话
        this.$store.dispatch("sendResetEmail", { alert: this.$toast, data: { email: this.email } })
      }else {
        this.$toast.fail('请输入正确的邮件地址');
        this.email = '';
      }
    }
  },
  computed: {
    checkEmailValidate() {
      const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      return reg.test(this.email);
    }
  }
}
</script>

<style scoped>

.header{ 
  background-color: #4b0;
  color: #fff;
}
.header p:first-child {
  margin: 0;
  font-size: 32px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  padding-top: 10px;
}

.header p:last-child {
  box-sizing: border-box;
  margin: 0;
  padding: 10px 0 30px 0;
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}
.span {
  width: 100%;
  height: .3rem;
}

</style>
