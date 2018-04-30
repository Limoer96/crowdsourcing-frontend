<template>
  <div class="container">
    <Erro v-if="error"/>
    <div class="body" v-if="tasks">
      <div 
        class="task-item"
        v-for="(task, index) in tasks"
        :key="index"
      >
        <p class="title">{{ task.title }}</p>
        <p class="desc">{{ task.desc }}</p>
        <ul class="more">
          <li>{{ task.publish_info.user_id }}</li>
          <li>{{ new Date(task.time).toLocaleString() }}</li>
          <li><a @click="showDetail(index)" href="javascript:void(0);">MORE<van-icon style="font-size: 14px" name="arrow"/></a></li>
        </ul>
      </div>
      <van-popup v-if="Object.keys(currentTask).length > 0" v-model="show" position="right" style="width: 100%">
        <p class="title">基本信息</p>
        <van-cell-group>
          <van-cell title="任务名称" :value="currentTask.title"/>
          <van-cell>
            <template slot="title">
              <span class="van-cell-text">类别</span>
              <van-tag type="success" v-for="(tag, index1) in currentTask.types" :key="index1">{{tag}}</van-tag>
            </template>
          </van-cell>
          <van-cell :value="currentTask.desc"/>
          <van-cell :value="'要求：'+currentTask.limits.join(';')" />
        </van-cell-group>
        <p class="title">更多信息</p>
        <van-cell-group>
          <van-cell title="发布地点：" :value="currentTask.location.address"/>
          <van-cell title="人数" :value="currentTask.nums_confirm + '/' + currentTask.nums_need"/>
          <van-cell title="你将获得" :value="currentTask.price + '元'"/>
          <van-cell title="时限" :value="currentTask.time_limit + '小时以内'"/>
        </van-cell-group>
        <van-row>
          <van-col span="12">
            <van-button bottom-action @click="closeTask(currentTask._id)" type="primary">关闭任务</van-button>
          </van-col>
          <van-col span="12">
            <van-button bottom-action @click="show = !show">返回</van-button>
          </van-col>
        </van-row>
      </van-popup>
      <van-actionsheet v-model="actionSheetShow" title="确认关闭任务">
        <div>
          <p class="task-title">任务标题：<span>{{ currentTask.title }}</span></p>
          <p class="alert">确认关闭任务将返还任务点，请输入关闭理由。</p>
          <van-cell-group>
            <van-field 
              placeholder="输入关闭理由" 
              type="textarea" 
              v-model="reason"
              rows="2"
              />
          </van-cell-group>
          <van-row>
            <van-col span="22" offset="1">
              <van-button @click="doCloseTaskAction" style="margin: 6px 0;" type="primary" size="large">确认关闭</van-button>
            </van-col>
          </van-row>
        </div>
      </van-actionsheet>
      <div v-if="tasks && tasks.length === 0" class="task-item">
        <p class="title">暂无发布中的任务</p>
      </div>
    </div>
  </div>
</template>

<script>
import admin from '../../api/admin';
import Erro from '../sections/Error';
export default {
  name: 'TaskCensor',
  data() {
    return {
      tasks: null,
      error: false,
      show: false,
      currentIndex: 0,
      actionSheetShow: false,
      reason: '',
      loading: false
    }
  },
  mounted () {
    // api
    this.loadTasks();
  },
  methods: {
    loadTasks() {
      admin.getTasks({ token: localStorage.getItem('a_token') }).then((json => {
        this.tasks = json.data;
      })).catch(() => {
        this.error = true;
      })
    },
    showDetail(index) {
      this.currentIndex = index;
      this.show = true;
    },
    closeTask(_id) {
      this.show = false;
      this.actionSheetShow = true;
    },
    doCloseTaskAction() {
      // api
      admin.closeTask({
         token: localStorage.getItem('a_token'), 
         reason: this.reason, 
         t_id: this.currentTask._id, 
         u_id: this.currentTask.publish_info._id, 
         price: this.currentTask.price, 
         count: this.currentTask.nums_need
      }).then((json) => {
        if(json.status === 6) {
          this.$toast('用户验证失败，请重新登录');
          setTimeout(() => {
            this.$router.replace('/admin/auth');
          }, 1000)
        }else {
          this.loading = false;
          this.actionSheetShow = false; 
          this.$toast('关闭任务成功');
          this.loadTasks();
        }
      })

    }
  },
  computed: {
    currentTask() {
      return this.tasks[this.currentIndex] || {};
    }
  },
  component: {
    Erro
  }
}
</script>

<style scoped>
.body {
  width: 100%;
  margin: 10px 0;
}
.task-item {
  position: relative;
  width: 96%;
  left: 2%;
  border-radius: 5px;
  box-shadow: 0px 0px 1px 1px #a3a8ad;
  background-color: #1E88E5;
  color: #fff;
  margin-bottom: 10px;
}

.task-item:nth-child(3n) {
  background-color: #039BE5;
}

.task-item:nth-child(3n+1) {
  background-color: #00ACC1;
}
.task-item:nth-child(3n+2) {
  background-color: #1E88E5;
}

.title {
  box-sizing: border-box;
  margin: 0;
  font-size: 20px;
  padding: 6px;
  width: 100%;
  text-align: center;
}
.desc {
  margin: 0;
  font-size: 14px;
  padding: 6px;
}
.more {
  display: flex;
}
.more > li {
  font-size: 14px;
  margin: 0px 6px;
}
.more > li:last-child {
  margin-left: 50px;
}
a {
  color: #fff;
}
.alert {
  margin: 6px 4%;
  color: #FF9800;
}
.task-title {
  margin: 6px 4%;
  font-size: 14px;
}
</style>
