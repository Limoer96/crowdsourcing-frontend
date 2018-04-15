<template>
  <div class="answer-container">
    <van-nav-bar 
      title="回答详情"
      left-text="返回"
      @click-left="back"
      left-arrow
    />
    <Loading v-if="loading && !error"/>
    <Erro v-if="error"/>
    <div class="body" v-if="isAuthorSelf">
       <Timer :time="answerData.task.time" :timeOffset="answerData.task.time_limit + 24" title="距离确认截止还有"/>
       <p class="sub-title">任务信息</p>
       <van-cell-group>
          <van-cell 
            :title="answerData.task.title"
            is-link
            value="任务详情"
            @click="$router.push(`/task/${answerData.task._id}`)"
          />
          <van-cell 
            title="任务描述"
            :label="answerData.task.desc"
          />
       </van-cell-group>
       <p class="sub-title">回答详情</p>
       <van-panel :title="answerData.text" :status="status" :desc="`${answerData.author.user_id} 回答于： ${new Date(answerData.date).toLocaleString()}`">
        <van-button style="margin: .2rem" @click="showImages">查看图片</van-button>
        <div slot="footer">
          <van-button :disabled="isAnswerConfirmed" @click="confirmAnswer" style="margin-left: 200px;" size="small" type="primary">确认</van-button>
          <van-button :disabled="isAnswerConfirmed" @click="rejectAnswer" size="small" type="danger">拒绝</van-button>
        </div>
       </van-panel>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'; // 必须导入使用
import Timer from './sections/Timer';
import Loading from './sections/Loading';
import Erro from './sections/Error';
import api from '../api/answer';
export default {
  name: 'AnswerDesc',
  data() {
    return {
      answerData: null,
      loading: true,
      error: false,
      sendConfirmRequest: false
    }
  },
  mounted() {
    // 初始化得到任务极其回答数据
    api.getAnswer({ a_id: this.$route.params.id }).then(json => {
      this.answerData = json.data;
      this.loading =false;
      if(!this.isAuthorSelf) {
        this.$toast('你无权限访问');
        setTimeout(() => {
          this.$router.goBack();
        }, 500);
      }
    }).catch(() => {
      this.error = true;
    })
  },
  components: {
    Timer,
    Erro,
    Loading
  },
  computed: {
    status() {
      let statusText = '';
      if(this.answerData) {
        switch(this.answerData.status) {
          case 1: 
            statusText = '待确认';
            break;
          case 0:
            statusText = '已确认';
            break;
          case 2:
            statusText = '已拒绝';
            break;
          case 3:
            statusText = '仲裁(确认)';
            break;
          case 4:
            statusText = '仲裁(拒绝)';
            break;    
        }
      }
      return statusText;
    },
    isAuthorSelf() {
      if(this.answerData) {
        console.log(this.answerData.task.publish_info);
        console.log(localStorage.getItem('id'));
        return this.answerData.task.publish_info === localStorage.getItem('id'); // 当前用户是作者才可以访问
      }
      return false;
    },
    isAnswerConfirmed() {
      if(this.answerData) {
        // 如果已经点击了发布按钮、当前任务状态不是正在进行、当前回答还没有被确认的话，那么此时按钮不可用
        return this.answerData.status !== 1 || this.answerData.task.status !== 0 || this.sendConfirmRequest; // 不等于1 确认按钮不可用，此时已经被确认或者被拒绝了 
      }
      return false;
    }
  },
  methods: {
    back() {
      const redirect = this.$route.params.redirect;
      this.$router.goBack(redirect);
    },
    showImages() {
      let imageUrls = this.answerData.img_src;
      imageUrls = imageUrls.map((url) => url.replace('public', 'http://localhost:3000'));
      ImagePreview(imageUrls);
    },
    confirmAnswer() {
      this.$dialog.confirm({
        message: '确认后任务点将会直接转至对方账户，继续?'
      }).then(() => {
        // 发起请求
        api.confirmAnswer({ a_id: this.answerData._id }).then((json) => {
          if(json.status === 6) {
            // 此时任务已经关闭，并且完成了支付
            this.$toast('任务已关闭或已确认，无法再进行确认');
          }else {
            this.$toast('确认成功！');
          }
          this.sendConfirmRequest = true; // 不可再次提交了
        })
      })
    },
    rejectAnswer() {
      this.$dialog.confirm({
        message: '拒绝后将发起人工仲裁，你必须接收仲裁结果，确认继续？'
      }).then(() => {
        // 发起请求
        api.rejectAnswer({ a_id: this.answerData._id }).then((res) => {
          this.sendConfirmRequest = true; // 不可再次提交了
          this.$toast('仲裁申请提交成功');
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
