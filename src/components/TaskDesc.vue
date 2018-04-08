<template>
  <div class="desc-container">
    <van-nav-bar 
      title="任务详情"
      fixed
      left-arrow
      left-text="返回"
      @click-left="back"
    />
    <Loading v-if="!showContent"/>
    <Erro v-if="error"/>
    <div class="content-container">
      <van-collapse v-model="activeNames" style="margin-top: 1.2rem">
        <van-collapse-item title="基本信息" :name="1">
          <van-cell-group>
            <van-cell title="任务标题" :value="taskData.title"/>
            <van-cell title="任务描述" :label="taskData.desc"/>
            <van-cell title="发布地点" :label="taskData.location.address"/>            
            <van-cell>
              <template slot="title">
                <span class="van-cell-text">类别：</span>
                <van-tag type="success" v-for="(tag, index) in taskData.types" :key="index">{{tag}}</van-tag>
              </template>
            </van-cell>
          </van-cell-group>
        </van-collapse-item>
        <van-collapse-item title="任务要求" :name="2">
          <template>
            <ul>
              <li 
                style="color: rgba(0,0,0,.8); font-size: 14px;" 
                v-for="(limit, index) in taskData.limits" 
                :key="limit">
                {{index + 1}}. {{limit}}
              </li>
            </ul>
          </template>
        </van-collapse-item>
        <van-collapse-item title="其它信息" :name="3">
          <van-cell-group>
            <van-cell title="需求人数" :value="taskData.nums_need"/>
            <van-cell title="有效时限" :value="taskData.time_limit+'小时内'"/>
            <van-cell title="当前状态" :value="status"/>            
          </van-cell-group>
        </van-collapse-item>
        <van-collapse-item v-if="isAuthorSelf" title="采集情况" :name="4">
          <van-cell-group>
            <van-cell 
              v-for="user in taskData.receive_users" 
              :key="user.user_id" 
              :title="user.user_id" 
              is-link
              value="用户详情"
              @click="$router.replace(`/profile?id=${user._id}&redirect=${$router.currentRoute.fullPath}`)"
            />            
          </van-cell-group>
        </van-collapse-item>
        <van-collapse-item v-if="isAuthorSelf" title="完成情况" :name="5">
          <van-cell-group>
            <van-cell 
              v-for="answer in taskData.answers_" 
              :key="answer._id" 
              :title="answer.text" 
              is-link
              :label="new Date(answer.date).toLocaleString()"
            />          
          </van-cell-group>
        </van-collapse-item>
        <van-button v-if="isAuthorSelf" :disabled="!isTaskRunning" type="default" @click="closeAction" bottom-action>{{btnText}}</van-button>
      </van-collapse>
      <van-row v-if="!isAuthorSelf && isTaskRunning" type="primary">
        <van-col span="12">
          <van-button bottom-action @click="receiveTask">采集</van-button>
        </van-col>
        <van-col span="12">
          <van-button type="primary" bottom-action>收藏</van-button>
        </van-col>
      </van-row>

    </div>
  </div>
</template>

<script>
import api from '../api/task';
import Loading from './sections/Loading';
import Erro from './sections/Error';
import user from '../api/user';

export default {
  name: 'TaskDesc',
  data() {
    return {
      taskData: null,
      error: false,
      activeNames: [1,2,3]
    }
  },
  created() {
    const _id = this.$route.params.id;
    // console.log(this.$route.params.id);
    // 发送ajax请求
    api.getTaskInfo({ t_id: _id }).then((json) => {
      this.taskData = json.data;
    }).catch(err => {
      this.error = true;
    });
  },
  methods: {
    back() {
      this.$router.goBack();
    },
    closeAction() {
      this.$dialog.confirm({
        title: '确认关闭',
        message: '提前关闭任务将要支付已经采集的任务点哦！'
      }).then(() => {
        // 删除的逻辑;
        api.closeTask({t_id: this.$route.params.id}).then((json) => {
          this.$toast.success('关闭成功！');
          this.taskData.status = 2;
        }).catch(err => {
          this.$toast('发生错误了');
        })
      }).catch(() => {
        // 取消的逻辑;
      })
    },
    receiveTask() {
      api.receiveTask({ t_id: this.$route.params.id }).then((json) => {
        this.$toast.success('采集成功');
        // 跳转到回答页面
      }).catch(err => {
        console.log('err', err);
      })
    }
  },
  computed: {
    showContent() {
      return (!this.error && this.taskData !== null);
    },
    status() {
      let status = '';
      if(this.taskData) {
        let statusCode = this.taskData.status;
        switch (statusCode) {
          case 0:
            status = '进行中';
            break;
          case 1:
            status = '已结束';
            break;
          case 2:
            status = '已关闭';  
            break;
          default:
            status = '其他';
            break;
        }
      }
      return status;
    },
    btnText() {
      let status = '';
      if(this.taskData) {
        let statusCode = this.taskData.status;
        switch (statusCode) {
          case 0:
            status = '关闭任务';
            break;
          case 1:
            status = '已结束';
            break;
          case 2:
            status = '已关闭';  
            break;
          default:
            status = '';
            break;
        }
      }
      return status;
    },
    isTaskRunning() {
      return this.taskData && this.taskData.status === 0;
    },
    isAuthorSelf() {
      if(this.taskData){
        const _id = localStorage.getItem('id'); //获取用户本地的id
        const idServer = this.taskData.publish_info._id || '';
        return _id === idServer;
      }
      return false;
    }
  },
  components: {
    Loading,
    Erro
  }
}
</script>

<style scoped>
.desc-container {
  width: 100%;
  height: 100%;
}
</style>
