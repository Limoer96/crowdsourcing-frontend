<template>
  <div class="message-box">
    <!--  消息聚合页面，包含24小时内的 账单信息，任务提交信息，发帖回帖信息  -->
    <van-nav-bar 
      title="消息盒子"
      left-text="返回"
      left-arrow
    />
    <van-notice-bar
      style="margin: .2rem 0"
      text="24小时之内的任务消息、账单信息、回帖信息都在这里"
      mode="closeable"
      :scrollable="false"
      color="#fff"
      background="#4b0"
    />
    <van-collapse v-model="activeNames">
      <van-collapse-item title="最新回答" name="1">
        <template v-if="answerData && answerData.length !== 0">
          <van-panel
          style="margin: .2rem 0"
          v-for="(answer, index) in answerData" 
          :key="index" 
          :title="'问题：' + answer.task.title"
          :desc="'用户 ' + answer.author.user_id + ' 回答于 ' + new Date(answer.confirmTime).toLocaleString()"
          :status="mapStatus[answer.status]"
          >
          <div class="content-wrapper">
            <p class="van-ellipsis">TA的回复：{{ answer.text }}</p>
          </div>
          <div slot="footer">
            <van-button @click="toDescPage(answer._id)" style="margin-left: 50%;" size="small">查看详情</van-button>
            <van-button @click="confirmAnswer(answer._id)" :disabled="answer.status !== 1 || sendConfirmRequest" size="small" type="danger">快速确认</van-button>
          </div>
          </van-panel>
        </template>
        <p class="alert">暂无回答</p>
      </van-collapse-item>
      <van-collapse-item title="账单信息" name="2">
        <p class="sub-title">到账信息</p>
        <van-cell-group v-if="records && records.receiveList.length !== 0">
          <van-cell 
            v-for="(record, index) in records.receiveList" 
            :key="Math.random()*index"
            :title="'任务点: ' + record.offset + '*' + record.count + ' 共计：' + record.offset*record.count + '个任务点'"
            :label="'于' + new Date(record.date).toLocaleString() + '由 ' + record.send.user_id + ' 向你支付'"
          />
        </van-cell-group>
        <p class="alert" v-else>暂无到账信息</p>
        <p class="sub-title">支付信息</p>
        <van-cell-group v-if="records && records.sendList.length !== 0">
          <van-cell 
            v-for="(item, index) in records.sendList" 
            :key="Math.random()*index"
            :title="'任务点: ' + item.offset + '*' + item.count + ' 共计：' + item.offset*item.count + '个任务点'"
            :label="'于' + new Date(item.date).toLocaleString() + '支付给 ' + item.receive.user_id"
          />
        </van-cell-group>
        <p v-else class="alert">暂无支付记录</p>
      </van-collapse-item>
      <van-collapse-item title="最新回复" name="3">
        
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import answer from '../api/answer';
import record from '../api/record';
export default {
  name: 'Message',
  data() {
    return {
      mapStatus: ['已确认', '待确认', '已拒绝', '仲裁成功', '仲裁失败'],
      activeNames: ['1', '2', '3'],
      answerData: null,
      records: null,
      sendConfirmRequest: false
    }
  },
  mounted () {
    // 发起请求 获得包括账单信息 任务回答信息 回帖信息
    answer.getLatestAnswers().then((json) => {
      this.answerData = json.data;
    });
    record.getLatestRecords().then((json) => {
      this.records = json.data; // 包含收款记录和付款记录
    });
  },
  methods: {
    toDescPage(id) {
      this.$router.push(`/answer/${id}`)
    },
    confirmAnswer(id) {
      this.$dialog.confirm({
        message: '确认后任务点将会直接转至对方账户，继续?'
      }).then(() => {
        // 发起请求
        answer.confirmAnswer({ a_id: id }).then((json) => {
          if(json.status === 6) {
            // 此时任务已经关闭，并且完成了支付
            this.$toast('任务已关闭或已确认，无法再进行确认');
          }else {
            this.$toast('确认成功！');
          }
          this.sendConfirmRequest = true; // 不可再次提交了
        }).catch(() => {
          this.$toast.fail({
            message: '确认失败，请重试！'
          })
        })
      })
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  font-size: 14px;
  color: rgba(0,0,0,.8);
  padding: .2rem;
}
.content-wrapper > p {
  margin: 0;
}
.sub-title {
  width: 100%;
  background-color: rgba(0,0,0,.2);
  margin: 0;
  color: #fff;
}
.alert {
  margin: 0;
  padding: .1rem;
  color: rgba(0,0,0,.8);
}
</style>
