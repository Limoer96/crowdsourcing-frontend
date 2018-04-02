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
    <div class="body">
      <van-row>
        <van-col span="6">
          <img class="avatar" src="../assets/img.jpg" alt="用户头像">
        </van-col>
        <van-col span="18">
          <p class="name">Limoer</p>
          <ul class="info-list">
            <li class="item">25</li>
            <li class="item">1</li>
            <li class="item">100%</li>
          </ul>
          <ul class="base-list">
            <li class="item">已完成</li>
            <li class="item">进行中</li>
            <li class="item">好评率</li>
          </ul>
        </van-col>
      </van-row>
      <van-row>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: 'Limoer',
      searchText: ''
    }
  },
  methods: {
    back() {
      this.$router.goBack('/');
    }
  },
  mounted() {
    let temp = [];
    for(let i = 0; i< 50; i++) {
      temp.push(i);
    }
    this.list = temp;
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
  font-size: 6px;
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
</style>
