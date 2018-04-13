<template>
  <div class="task-container">
    <van-nav-bar 
      :title="userId || '加载中...'"
      left-arrow
      @click-left="back"
      fixed
    />
    <div class="body">
      <p class="show-number">{{count}}个任务</p>
      <van-list
        v-model="loading"
        :finished="finished"
        @load="lazyLoadData"
      >
        <div 
          class="task-item"
          v-for="task in lists"
          :key="task.t_id"
          @click="toTaskDetail(task._id)"
        >
          <p class="title">{{ task.title }}</p>
          <p class="desc">{{ task.desc}}</p>
          <ul>
            <li>需求数{{task.nums_confirm}}/{{task.nums_need}}</li>
            <li>{{mapStatus[task.status]}}</li>
            <li>{{10}} 天前</li>
          </ul>
        </div>
      </van-list>
    </div>
  </div>  
</template>

<script>
import api from '../api/user';
export default {
  data() {
    return {
      mapStatus: ['进行中', '已完成', '已关闭'],
      userId: 'limoer',
      count: 20,
      lists: []
      ,
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    back() {
      this.$router.goBack();
    },
    lazyLoadData() {
      const userId= this.$route.query.u;
      const count = this.lists.count; // 获得任务的总数, 每次加载8条任务记录
       api.getPublishTasks({ user: userId, page: this.page}).then(json => {
          this.count = json.data.count;
          this.userId = json.data.userId;
          this.lists.push(...json.data.lists);
          this.page += 1;
          this.loading = false;
          // 如果获取到的每页数量小于8的话
          if(json.data.lists.length < 8) {
            this.finished = true;
          }
       })
    },
    toTaskDetail(_id) {
      this.$router.push(`/task/${_id}`);
    }
  }
}
</script>

<style scoped>
.task-container {
  width: 100%;
  min-height: 100%;
  background-color: rgb(241,241,241);
}
.body {
  width: 100%;
  margin-top: 50px;
}

.show-number {
  margin: .2rem;
  color: rgba(0,0,0,.4);
  font-size: 12px;
}

.task-item {
  box-sizing: border-box;
  padding: .1rem;
  width: 100%;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.1);
  margin-bottom: .1rem;
}
.title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}
.desc {
  margin: .1rem 0;
  color: rgba(0,0,0,.8);
}
.task-item ul {
  display: flex;
}
.task-item ul > li {
  list-style: none;
  margin-right: .5rem;
  color: rgba(0,0,0,.4);
  font-size: 14px;
}
</style>
