<template>
  <div class="container">
    <van-nav-bar 
      title="提现"
      left-arrow
      left-text="返回"
      @click-left="$router.goBack()"
    />
    <div class="body">
      <van-row v-if="!added">
        <van-col span="22" offset="1">
          <van-button 
            @click="show=true" 
            style="font-size: 24px; margin: 5px 0; border: 2px dashed" 
            size="large"
          >
            <van-icon name="add"/>添加银行卡
          </van-button>            
        </van-col>
      </van-row>
      <van-cell-group v-if="added">
        <van-cell 
          :title="`持卡人 ${name}`" 
          :label="`尾号 ${account.slice(account.length-4)} 储蓄卡`" 
          is-link
          @click="show = true"
        />
      </van-cell-group>
      
      <van-cell-group style="margin-top: .4rem;">
        <p class="label">提现金额</p>
        <van-field @touchstart.native.stop="keyboardShow = true" v-model="cashCount" style="font-size: 36px; font-weight: 600"/>
        <p class="label">可用余额 {{ accountData.account.toFixed(2) }}元 <a class="cashAll" @click="cashAll" href="javascript:void(0);">全部提现</a></p>
      </van-cell-group>
      <van-button
        @click="cashBefore" 
        type="primary"
        style="margin-top: .4rem; width: 90%; margin-left: 5%;"
        :disabled="!disabled"
      >
        提现
      </van-button>
      <van-popup v-model="show" position="bottom">
        <van-cell-group>
          <van-field v-model="name" placeholder="输入持卡人姓名" label="持卡人"/>
          <van-field v-model="account" placeholder="输入卡号" label="卡号"/>
        </van-cell-group>
        <van-button @click="addCard" type="primary" bottom-action style="background-color: #4b0">添加</van-button>
      </van-popup>
      <van-number-keyboard
        :show="keyboardShow"
        extra-key="."
        close-button-text="完成"
        @blur="keyboardShow = false"
        @input="onInput"
        @delete="onDelete"
      />
      <van-actionsheet v-model="showSheet" title="任务点提现">
        <van-row>
          <van-col span="22" offset="1">
            <p style="width: 100%; text-align: center">你将提现：￥{{ Number.parseInt(this.cashCount)}} </p>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="22" offset="1">
            <van-cell-group v-if="added">
              <van-cell 
                :title="`持卡人 ${name}`" 
                :label="`尾号 ${account.slice(account.length-4)} 储蓄卡`" 
              />
            </van-cell-group>
          </van-col>
        </van-row>
        <van-row style="margin: .2rem 0">
          <van-col span="22" offset="1">
            <van-button @click="cash" size="large" type="primary" :loading="loading">确认提现</van-button>
          </van-col>
        </van-row>
      </van-actionsheet>
    </div>
  </div>
</template>

<script>
import account from '../api/account';
export default {
  name: 'UserCash',
  data() {
    return {
      show: false,
      added: false,
      name: '',
      account: '',
      cashCount: '',
      keyboardShow: false,
      accountData: '',
      showSheet: false,
      loading: false
    }
  },
  methods: {
    addCard() {
      if(this.name && this.account.length === 19) {
        // 19位卡号
        this.show = false;
        this.added = true;
      }else {
        this.$toast('请重新输入！');
        this.name = '';
        this.account = '';
      }
    },
    cash() {
      // api 
      this.loading = true;
      account.cash({ count: Number.parseFloat(this.cashCount), card: this.account, name: this.name}).then(json => {
        this.loading = false;
        this.showSheet = false;
        this.$toast('提现成功！');
      })
    },
    cashBefore() {
      this.showSheet = true;
    },
    cashAll() {
      this.cashCount = this.accountData.account.toFixed(2);
    },
    onInput(value) {
      let newCount = this.cashCount + value;
      if(Number.parseFloat(newCount) > this.accountData.account) {
        this.$toast('输入金额不正确！');
      }else {
        this.cashCount = this.cashCount + value;
      }
    },
    onDelete() {
      // 分割这个字符串
      this.cashCount = this.cashCount.slice(0, this.account.length-1);
    },
  },
  computed: {
    disabled() {
      return this.name && this.account.length === 19 && Number.parseInt(this.cashCount) > 0;
    }
  },
  mounted () {
    account.getAccount().then((json) => {
      this.accountData = json.data;
    })
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f2f2f4;
}
.body {
  margin-top: .4rem;
}
.label {
  font-size: 14px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  padding:6px .2rem;
  color: rgba(0,0,0,.6);
}
.cashAll {
  margin-left: 2rem;
  color: #4b0;

}
</style>
