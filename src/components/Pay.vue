<template>
  <div class="pay-container">
    <van-nav-bar
      title="订单支付"
      left-text="返回"
      left-arrow
      @click-left="back"
    />
    <Loading v-if="!taskData && !error && isUserSelf" />
    <Erro v-if="error" />
    <div class="body" v-if="taskData">
      <div v-if="taskData.status === 3">
        <Timer title="剩余支付时间" :timeOffset="24" :time="taskData.time"/>
        <p class="title">订单信息</p>
        <van-cell-group>
          <van-cell title="任务名" :value="taskData.title"/>
          <van-cell title="任务描述" :value="taskData.desc"/>
          <van-cell title="合计任务点" :value="taskData.nums_need + '*' + taskData.price"/>
          <van-switch-cell :disabled="checked" v-model="checked" :title="confirmText" />
        </van-cell-group>
        <van-row style="margin-top: .2rem">
          <van-col span="22" offset="1">
            <van-button @click="showPaymentSheet" size="large" type="primary">支付</van-button>
          </van-col>
        </van-row>
        <van-actionsheet v-model="sheetShow" title="订单支付">
          <van-row>
            <van-col span="22" offset="1">
              <p style="width: 100%; text-align: center">你将支付：{{ this.price }}</p>
            </van-col>
          </van-row>
          <van-row style="margin: .2rem 0">
          <van-col span="22" offset="1">
            <van-button :disabled="disabled" @click="pay" size="large" type="primary" :loading="paying">{{ payText }}</van-button>
          </van-col>
        </van-row>
        </van-actionsheet>
      </div>
      <div style="text-align: center; margin-top: 1rem" v-else><p class="alert">订单已支付</p></div>
    </div>
  </div>
</template>

<script>

import Loading from './sections/Loading';
import Timer from './sections/Timer';
import Erro from './sections/Error';

import task from '../api/task';
import record from '../api/record';

export default {
  data() {
    return {
      checked: false,
      taskData: null,
      error: false,
      sheetShow: false,
      paying: false,
      payText: '确认支付',
      disabled: false
    }
  },
  components: {
    Loading,
    Timer,
    Erro
  },
  created () {
    task.getTaskInfo({ t_id: this.$route.params.id }).then(json => {
      this.taskData = json.data;
    }).catch(err => {
      this.error = true;
    })
  },
  computed: {
    confirmText() {
      return this.checked ? '已确认' : '确认订单';
    },
    isUserSelf() {
      if(this.taskData) {
        return this.taskData.publish_info._id === localStorage.getItem('id');
      }
      return false;
    },
    price() {
      if(this.taskData) {
        return this.taskData.nums_need * this.taskData.price + '任务点';
      }
      return '加载中';
    }
  },
  methods: {
    showPaymentSheet() {
      if(!this.checked) {
        this.$toast('请确认订单后继续');
      }else {
        this.sheetShow = true;
      }
    },
    back() {
      this.$router.goBack();
    },
    pay() {
      this.payText = '支付中';
      this.paying = true;
      record.pay({ count: this.taskData.nums_need, offset: this.taskData.price, t_id: this.$route.params.id}).then((json) => {
        this.paying = false;
        if(json.status === 7) {
          // 余额不足
          this.$dialog.confirm({
            title: '提示',
            message: '任务点不足，是否需要充值?'
          }).then(() => {
            this.$router.push(`/recharge`);
          })
        }else {
          this.payText = '支付成功';
          this.disabled = true;
        }
      }).catch(err => {
        this.paying = false;
        this.$toast('支付失败');
      }) 
    }
  }
}
</script>

<style scoped>
.alert {
  font-size: 24px;
  font-weight: bold;
}
</style>
