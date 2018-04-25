<template>
  <div class="contrainer">
    <van-nav-bar 
      title="接收的任务"
      left-arrow
      left-text="返回"
      @click-left="$router.goBack()"
    />
    <p v-if="taskData" class="title">{{ taskData.length || '0' }}个任务</p>
    <Loading v-if="loading" />
    <Erro v-if="error"/>
    <div class="body" v-if="taskData">
      <van-panel
        style="margin-bottom: .2rem"
        v-for="(task, index) in taskData"
        :key="index"
        :title="task.title"
        :desc="task.desc"
        :status="mapStatus[task.status]"
      >
      <p class="content">
        <span>发布于：{{ new Date(task.time).toLocaleString()}}</span>
        <van-button 
          :disabled="task.status !==0" 
          size="small" 
          type="primary" 
          @click="goToAnswerPage(task._id)"
        >
          去回答
        </van-button>
      </p>
      </van-panel>
    </div>
  </div>
</template>

<script>
import user from '../api/user';
import Loading from './sections/Loading';
import Erro from './sections/Error';
export default {
  name: 'ReceiveTaskList',
  data() {
    return {
      mapStatus: ['正在进行', '已结束','已关闭', '待支付'],
      taskData: null,
      loading: true,
      error: false
    }
  },
  mounted () {
    // 获取数据
    user.getReceiveTasks().then((json) => {
      this.taskData = json.data.tasks_receive;
      this.loading = false;
    }).catch(() => {
      this.error = true;
    })
  },
  components: {
    Loading,
    Erro
  },
  methods: {
    goToAnswerPage(id){
      this.$router.push(`/upload/${id}`);
    }
  }
}
</script>

<style scoped>

.contrainer {
  position: relative;
  width: 100%;
  background-color: rgba(0,0,0,.1);
}

.content {
  margin: 0;
  padding: .1rem .2rem;
  font-size: 12px;
  color: rgba(0,0,0,.6);
}
.content > span {
  margin-right: .5rem;
}

.title {
  margin: 0;
  padding: .2rem;
  color: rgba(0,0,0,.6);
}

</style>
