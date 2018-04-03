<template>
  <div class="content-wrapper">
    <div class="header">
      <van-nav-bar
        title="Limoer"
        left-arrow
        left-text="返回"
        @click-left="back"
        @click-right="concat"
      >
        <van-icon name="chat" slot="right"></van-icon>
      </van-nav-bar>
      <van-search placeholder="搜索任务" v-model="searchText" @search="searchTasks"/>
    </div>
    <div v-if="data">
    <div class="profile">
      <van-row>
        <van-col span="6">
          <img class="avatar" src="../assets/img.jpg" alt="用户头像">
        </van-col>
        <van-col span="18">
          <p class="name">{{this.data.userId}}</p>
          <ul class="info-list">
            <li class="item">{{ this.data.taskComplete}}</li>
            <li class="item">{{this.data.taskComplete}}</li>
            <li class="item">{{this.data.rate}}%</li>
          </ul>
          <ul class="base-list">
            <li class="item">已完成</li>
            <li class="item">进行中</li>
            <li class="item">好评率</li>
          </ul>
        </van-col>
      </van-row>
      <p class="title">个人简介</p>
      <van-row>
        <van-col span="24">
          <p class="profile-container">{{this.data.prifile}}</p>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24">
          <p class="good-at">擅长 
            <span v-for="(item, index) in data.good_at" :key="index"><van-tag type="success">{{ item }}</van-tag></span>          
          </p>
        </van-col>
      </van-row>
    </div>
    <van-cell-group>
      <van-cell title="所有动态" is-link />
    </van-cell-group>
    <van-cell-group style="margin-top: 20px">
      <van-cell title="发布任务" :value="''+data.taskPublish" is-link />
      <van-cell title="接收任务" is-link :value="''+data.taskReceive" />
    </van-cell-group>
    <van-cell-group style="margin-top: 20px">
      <van-cell title="他的发帖" :value="data.discuss" is-link />
      <van-cell title="他的回复" is-link :value="data.answers" />
    </van-cell-group>
    </div>
  </div>
</template>

<script>
import api from '../api/user';
export default {
  data() {
    return {
      data: null,
      error: null
    }
  },
  methods: {
    back() {
      this.$router.goBack('/');
    }
  },
   mounted() {
    // 在这里进行信息的请求
    const id = this.$route.query.id;
    api.getUserInfo({ _id: id }).then((json) => {
      this.data = json.data;
      console.log(json.data);
    }).catch(err => {
      this.$dialog.alert({
        message: '加载用户信息出错!'
      });
    })
  }
}
</script>

<style scoped>
.info-list {
  display: flex;
  justify-content: left;
}
.info-list  > li{
  list-style: none;
  width: 60px;
  font-weight: bold;
}

.base-list {
  display: flex;
}
.base-list > li {
  width: 60px;
  font-size: 8px;
  color: rgba(0, 0, 0, .5)
}
.name {
  font-size: 20px;
  font-weight: bold;
  margin: 5px 0;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.avatar {
  width: 70px;
  height: 70px;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 35px;
  margin: 5px;
}
.title {
  margin: 0;
  font-size: 8px;
  color: rgba(0, 0, 0, .5);
}
.profile-container {
  margin: 0 5px;
  text-indent: 2em;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.content-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgb(242, 242, 242);
}
.header {
  background-color: #fff;
}
.profile {
  background-color: #fff;
  margin-bottom: 20px;
}
.good-at {
  font-size: 8px;
  color: rgba(0, 0, 0, .5);
  margin: 5px 0;
}
</style>
