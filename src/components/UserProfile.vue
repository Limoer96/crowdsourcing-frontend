<template>
  <div class="content-wrapper">
    <div class="header">
      <van-nav-bar
        :title="this.data.userId || '加载中...'"
        left-arrow
        left-text="返回"
        @click-left="back"
        @click-right="concat"
      >
        <van-icon name="chat" slot="right"></van-icon>
      </van-nav-bar>
      <!-- <van-search placeholder="搜索任务" v-model="searchText" @search="search"/> -->
    </div>
    <div v-if="!error">
    <div class="profile">
      <van-row>
        <van-col span="6">
          <img class="avatar" src="../assets/img.jpg" alt="用户头像">
        </van-col>
        <van-col span="18">
          <p class="name">{{this.data.userId || '加载中...'}}</p>
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
      <van-cell 
        title="发布任务" 
        :value="''+data.taskPublish" 
        is-link 
        :to="`/tasks?u=${data.userId}`"
        />
      <van-cell title="接收任务" to="receive_tasks" v-if="isUserSelf" is-link :value="''+data.taskReceive" />
    </van-cell-group>
    <van-cell-group style="margin-top: 20px">
      <van-cell 
        :title="sexText + '的发帖'" 
        :value="data.discuss" 
        is-link 
        :to="`/profile_discuss?u_id=${data._id}`"
      />
      <van-cell 
        :title="sexText + '的回复'" 
        is-link 
        :value="data.answers" 
        :to="`/comments?u_id=${data._id}`"
      />
    </van-cell-group>
    <van-cell-group v-if="isUserSelf" style="margin-top: 20px">
      <van-cell 
        :title="sexText + '的钱包'" 
        is-link  
        to="/vallet/info"
      />
      <van-cell 
        title="充值" 
        is-link  
        to="/vallet/recharge"
      />
      <van-cell 
        title="提现" 
        is-link  
        to="/vallet/cash"
      />
    </van-cell-group>
    </div>
  </div>
</template>

<script>
import api from '../api/user';
export default {
  data() {
    return {
      data: {},
      error: false,
      searchText: '',
      sexText: '' // 称谓
    }
  },
  methods: {
    back() {
      const url = this.$route.query.redirect; // 返回上一级路由
      this.$router.goBack(url);
    },
    search() {

    },
    concat() {

    },
    getSexText(sex) {
      if(this.isUserSelf) {
        return '我';
      }
      if(sex === 0) {
        return '他';
      }else if(sex === 1) {
        return '她';
      }else {
        return 'Ta';
      }
    }
  },
   mounted() {
    // 在这里进行信息的请求
    const id = this.$route.query.id;
    api.getUserInfo({ _id: id }).then((json) => {
      this.data = json.data;
      this.sexText = this.getSexText(json.data.sex);
    }).catch(err => {
      console.log(err);
      this.error = true;
      this.$dialog.alert({
        message: '加载用户信息出错!'
      });
    })
  },
  computed: {
    isUserSelf() {
      // 通过判断本地的用户_id和用户数据的_id来判断是不是本人
      let _id = localStorage.getItem('id'); // 当前用户的id
      let id_server = this.data._id || '';
      return _id === id_server;
    }
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
  margin: .4rem 0;
}
.good-at {
  font-size: 8px;
  color: rgba(0, 0, 0, .5);
  margin: 5px 0;
}
</style>
