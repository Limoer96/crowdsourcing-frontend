<template>
  <div class="container">
    <van-nav-bar 
      title="充值"
      left-arrow
      left-text="返回"
      @click-left="$router.goBack()"
    />
    <div class="body">
      <van-cell-group style="margin-top: 10px; padding: 10px 0">
        <p class="title">充值金额</p>
        <van-field 
          @touchstart.native.stop="show = true"
          style="font-size: 20px"
          v-model="account"
          label="任务点"
          placeholder="输入充值任务点"
        />
      </van-cell-group>
      <van-number-keyboard
        :show="show"
        extra-key="."
        close-button-text="完成"
        @blur="show = false"
        @input="onInput"
        @delete="onDelete"
      />  
      <div class="btn-container">
        <van-button
          type="primary"
          :disabled="!isUserInput"
          @click="nextStep"
          size="large"
        >
          下一步
        </van-button>
      </div>
      <van-actionsheet v-model="showSheet" title="订单支付">
        <van-row>
          <van-col span="22" offset="1">
            <p style="width: 100%; text-align: center">你将支付：￥{{ Number.parseInt(this.account)}} </p>
          </van-col>
        </van-row>
        <van-row style="margin: .2rem 0">
          <van-col span="22" offset="1">
            <van-button :disabled="disabled" @click="recharge" size="large" type="primary" :loading="loading">确认支付</van-button>
          </van-col>
        </van-row>
      </van-actionsheet>
    </div>
  </div>
</template>

<script>
import account from '../api/account';
export default {
  name: 'Recharge',
  data() {
    return  {
      account: '',
      show: false,
      showSheet: false,
      disabled: false,
      loading: false
    }
  },
  methods: {
    onInput(value) {
      this.account = this.account + value;
    },
    onDelete() {
      // 分割这个字符串
      this.account = this.account.slice(0, this.account.length-1);
    },
    nextStep() {
      this.$toast("待开发的下一步！");
      this.showSheet = true;
    },
    recharge() {
      this.loading = true;
      // api
      if(this.isUserInput) {
        account.recharge({ count: Number.parseInt(this.account)}).then(json => {
          this.loading = false;
          this.$toast('充值成功');
          this.showSheet = false;
        }).catch(err => {
          this.$toast('充值失败');
          this.loading = false;
        })
      }
    }
  },
  computed: {
    isUserInput() {
      return this.account && Number(this.account) > 0;
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f2f2f4;
}
.title {
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  padding: 6px 4%;
}
.btn-container {
  position: relative;
  width: 90%;
  left: 5%;
  top: .4rem;
}
</style>
