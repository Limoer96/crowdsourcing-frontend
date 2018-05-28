<template>
  <div class="regist-container">
    <div class="header-container">
      <p class="title">还有一步！</p>
      <p class="mention">完善个人信息，开启众包之旅。</p>
    </div>
    <div class="input-container">
      <p class="info">登录信息</p>
      <van-cell-group>
        <van-field required label="用户名" v-model="userId" placeholder="选择一个用户名">
          <van-button slot="button" size="small" type="primary" @click="checkValidate">检查可用</van-button>
        </van-field>
        <van-field :error-message="passwordValidInfo" required label="密码" type="password" v-model="password" placeholder="输入密码"/>
        <van-field :error="!passwordEquel" required label="密码确认" type="password" v-model="passwordAgain" placeholder="再次输入密码"/>
      </van-cell-group>
      <p class="info">性别</p>
        <van-radio name="0" v-model="sex">男</van-radio>
        <van-radio name="1" v-model="sex">女</van-radio>
      <p class="info">其它信息</p>        
      <van-cell-group>
        <van-field 
          v-model="profile"
          label="个人简介"
          type="textarea"
          placeholder="请用一段话介绍自己吧"
          rows="1"
          autosize
        />
      </van-cell-group>
      <van-row>
        <van-col span="22" offset="1">
          <van-button @click="regist" type="primary" size="large">开始吧！</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Regist',
  data() {
    return {
      userId: '',
      password: '',
      passwordAgain: '',
      sex: '0',
      profile: '',
    }
  },
  computed: {
    passwordEquel() {
      return this.password === this.passwordAgain;
    },
    passwordValidInfo() {
      return this.password.length < 8 ? '密码应大于8位' : '';
    }
  },
  methods: {
    regist() {
      // 进行一个简单的验证， 保证用户输了了账户和密码一致
      if(this.userId && (this.password === this.passwordAgain)) {
        this.$store.dispatch('regist', { 
          router: this.$router,
          alert: this.$toast,
          data: {
            email: localStorage.getItem('email'),
            userId: this.userId,
            password: this.password,
            sex: Number.parseInt(this.sex),
            profile: this.profile
          }
         });
      }
    },
    checkValidate() {
      if(this.userId) {
        this.$store.dispatch('checkUserId', { alert: this.$toast, data: { userId: this.userId } });
      }
    }
  }
}
</script>

<style scoped>
.header-container {
  background-color: #4b0;
  color: #fff;
  padding: 6px 0;
}
.title {
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
}
.mention {
  width: 100%;
  text-align: center;
  margin: 0;
  padding-bottom: 1rem;
}
.info {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 10px ;
  background-color: #f8f8f8;
  color:rgba(69,90,100,.6);
}
</style>
