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
      <p class="alert">未注册用户登录后，注册即同意<span @click="show = true">《HFxxC用户协议》</span></p>
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
    <van-popup style="width: 90%; height: 100%;overflow: auto; margin: 10px 0; opacity: 0.9" v-model="show">
      <van-nav-bar 
        title="用户协议"
        left-arrow
        @click-left="show = false"
      />
      <div class="content-o">
        <p class="title-o">HFxxC用户协议</p>
        <p>欢迎您来到HFxxC移动众包平台。</p>
        <p>请您自诩阅读以下条款，如果您对本协议的任何条款表示异议，您可以选择不进入本应用。当您注册成功，均意味着您（即「用户」）完全接受本协议项下的全部条款。</p>
        <ul>
          <li>
            <p class="title-o1">使用规则</p>
            <p>用户一旦注册成功，该账户和密码均由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。</p>
            <p>用户承诺不得以任何方式利用本平台直接或间接从事违反中国法律以及社会公德的行为，HFxxC有权对违反上述承诺的内容予以删除。</p>
          </li>
          <li>
            <p class="title-o1">任务点</p>
            <p>任务点是本平台上专供用户使用的虚拟货币，可以使用其进行任务的支付，也可以对齐进行提现成为法定货币。换算比为任务点：人民币 = 1：1。</p>
            <p>用户违规充值任务点造成损失的，本平台不承担任何责任，并且本平台有权对违规使用任务点的账户进行封禁。</p>
          </li>
          <li>
            <p class="title-o1">任务审查</p>
            <p>所有在平台上发布的任务都将进行人工审查。</p>
            <p>用户发布了侵犯隐私和触犯法律的任务，将承担相应的责任。</p>
            <p>任务审查只是平台的监督方式，如果出现违规被举报的任务，本平台不承担责任。</p>          
          </li>
          <li>
            <p class="title-o1">回答仲裁</p>
            <p>回答仲裁将使用人工仲裁的方式对任务双方的争议回答进行仲裁。</p>
            <p>任务双方必须同意仲裁结果，但保留其投诉的权利。</p>
            <p>涉及到因为商业行为引起的法律纠纷，由任务双方自行处理，与本平台无关。</p>
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import img from '../assets/close.png';
import { mapState, mapGetters } from 'vuex';
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
      email: '',
      show: false
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
    }),
    ...mapGetters([
      'isLogin'
    ])
  },
  mounted() {
    // 如果已经登录，则不进入这个页面
    if(this.isLogin) {
      this.$router.replace('/');
    }
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
.alert > span {
  color: #4b0;
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
.content-o p{
  margin: 6px;
}

.title-o {
  font-size: 20px;
  font-weight: bold;
}
.title-o1 {
  font-size: 18px;
  font-weight: bold;
}
</style>
