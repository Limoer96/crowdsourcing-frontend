<template>
  <div class="container">
    <van-nav-bar 
      title="余额"
      left-arrow
      left-text="返回"
      right-text="明细"
      @click-left="$router.goBack()"
      @click-right="$router.push('/vallet/detail')"
    />
    <div class="body">
      <div class="header-content">
        <p class="msg">余额账户(任务点)</p>
        <p v-if="userAccount" class="content">{{ userAccount.account.toFixed(2) }}</p>
      </div>
      <van-cell-group>
        <van-cell 
          title="充值"
          is-link
          to="/vallet/recharge"
        />
        <van-cell 
          title="提现"
          is-link
          to="/vallet/cash"
        />
      </van-cell-group>
      <p class="help"><router-link to="help">需要帮助?</router-link></p>
    </div>
  </div>
</template>

<script>
import account from '../api/account';
export default {
  name: 'UserVallet',
  data() {
    return {
      userAccount: null
    }
  },
  mounted () {
    // api
    account.getAccount().then(json => {
      this.userAccount = json.data;
    }).catch(() => {
      // 
      this.$toast('加载数据失败！');
    })
  }
}
</script>


<style scoped>
.container {
  width: 100%;
}
.header-content {
  width: 100%;
  height: 140px;
  background-color: #4b0;
  color: #fff;
}
.header-content > p {
  box-sizing: border-box;
  margin: 0;
  width: 100%;
}

.msg {
  padding: 24px 0 6px 5%;
  font-size: 14px;
  color: rgba(255,255,255, .8);
}

.content {
  padding: 6px 5%;
  font-size: 48px;
  font-weight: 500;
}

.help {
  position: relative;
  width: 100%;
  text-align: center;
  margin: 0;
  top: 240px;
}

.help > a {
  color: #4b0;
}

</style>
