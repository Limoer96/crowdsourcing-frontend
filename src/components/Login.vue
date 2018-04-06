<template>
  <div>
    <div class="header-main">
      <p class="title">登录HFxxC</p>
      <p class="attention">开启你的众包之旅</p>
      <p class="icon-close"><van-icon @click="back" name="clear" /></p>
    </div>
    <div class="auth-container">
      <div class="input-container">
      <van-row v-if="!emailLogin">
        <van-col span="22" offset="1">
          <van-cell-group>
            <van-field v-model="userId" 
              placeholder="输入用户账号" 
            />
            <van-field 
              v-model="password" 
              type="password" 
              placeholder="输入密码" 
            />     
          </van-cell-group>
        </van-col>
      </van-row>
      <van-row v-if="emailLogin">
        <van-col span="22" offset="1">
          <van-cell-group>
            <van-field v-model="email" 
              placeholder="输入邮件" 
            />
            <van-field 
              v-model="verificationCode" 
              center
              placeholder="请输入验证码"
              icon="clear"
              @click-icon="verificationCode = ''"
            >
              <van-button :disabled="vc_send" @click="getVCode" slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>     
          </van-cell-group>
        </van-col>
      </van-row>
      </div>
      <p class="alert">未注册用户登录后，注册即同意《HFxxC用户协议》</p>
      <van-row>
        <van-col span="22" offset="1">
          <van-button @click="login" type="primary" size="large" :loading="loading">登录</van-button>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="22" offset="1">
          <div class="footer-container">
            <ul>
              <li><a href="javascript: void(0);" @click="changeToEmailLogin">{{btnMessage}}</a></li>
              <li><router-link to="/forgot_password">忘记密码？</router-link></li>
              <li><router-link to="/help">需要帮助</router-link></li>
            </ul>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import img from '../assets/close.png';
import { mapState } from 'vuex';
export default {
  name: 'Auth',
  data() {
    return {
      emailLogin: false,
      btnMessage: '邮箱免密登录',
      imgSrc: img,
      userId: '',
      password: '',
      verificationCode: '',
      email: ''
    }
  },
  methods: {
    back() {
      this.$router.goBack('/');
    },
    changeToEmailLogin() {
      if(this.emailLogin) {
        this.email = '';
        this.verificationCode = '';;
        this.btnMessage = '账户密码登录';
      }else {
        this.btnMessage = '邮箱免密登录';
        this.userId = '';
        this.password = '';
      }
      this.emailLogin = !this.emailLogin;
    },
    login() {    
      const to= this.$route.query.redirect || '/';
      console.log(to);
      this.$store.dispatch('auth', { 
        router: this.$router, 
        alert: this.$toast,
        to,
        data:{
          user_id: this.userId, 
          password: this.password,
          email: this.email,
          vc: this.verificationCode 
        }
      })

    },
    getVCode() {
      this.$store.dispatch('getVC', {
        alert: this.$toast,
        data: {
          email: this.email
        }
      });
    }
  },
  computed: {
    isUserIdEmpty() {
      return this.userId === '' ;
    },
    isPasswordEmpty() {
      return this.password === '';
    },
    ...mapState({
      loading: state => state.auth.loading,
      error: state => state.auth.error,
      vc_send: state => state.auth.vc_send
    })
  }
}
</script>

<style scoped>
.header-main {
  position: relative;
  width: 100%;
  height: 100px;
  background-color: #4b0;
  color: #fff;
  text-align: center;
}
.input-container {
  height: 100px;
}
.title {
  margin: 0;
  padding-top: 15px;
  font-size: 24px;
  font-weight: bold;
}
.attention {
  font-size: 16px;
  margin: 0;
}
.alert {
  width: 100%;
  text-align: center;
  font-size: 10px;
  color: rgba(0,0,0,.4);
  margin: 20px 0;
}
.footer-container {
  margin-top: 5px;
}
.footer-container > ul > li {
  list-style: none;
  float: left;
}
.footer-container > ul > li:first-child {
  margin-right: 15px;
}

.footer-container > ul > li:last-child {
  margin-left: 60px;
}

.footer-container > ul > li a {
  color: #4b0;
}

.icon-close {
  position: absolute;
  margin: 0;
  top: 10px; 
  right: 10px;
  font-size: 20px;
  font-weight: lighter;
}

</style>
