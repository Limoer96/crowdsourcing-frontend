<template>
  <div class="container">
    <div class="body" v-if="dataList">
      <div class="header">
        <p class="title">数据总览</p>
        <p class="desc">任务分类，平台收支、用户论坛数据</p>
      </div>
      <div class="task">
        <p>当前任务</p>
        <ul class="list">
          <li><p>正在进行</p><span class="item">{{ dataList.tasknums[0] }}</span></li>
          <li><p>已结束</p><span class="item">{{ dataList.tasknums[1] }}</span></li>
          <li><p>已经关闭</p><span class="item">{{ dataList.tasknums[2] }}</span></li>
          <li><p>待发布</p><span class="item">{{ dataList.tasknums[3] }}</span></li>
        </ul>
      </div>
      <div class="task">
        <p>平台收支</p>
        <ul class="list">
          <li><p>任务支付</p><span class="item">{{ dataList.recordPriceNums[0] }}</span></li>
          <li><p>平台盈利</p><span class="item">{{ (dataList.recordPriceNums[0] - dataList.recordPriceNums[1]- dataList.recordPriceNums[2]).toFixed(1)}}</span></li>
          <li><p>任务点充值</p><span class="item">{{ dataList.recordPriceNums[2] }}</span></li>
          <li><p>提现</p><span class="item">{{ dataList.recordPriceNums[3] }}</span></li>
        </ul>
      </div>
      <div class="task">
        <p>用户论坛</p>
        <ul class="list">
          <li><p>用户发帖</p><span class="item">{{ dataList.discusses }}</span></li>
          <li><p>用户回帖</p><span class="item">{{ dataList.comments }}</span></li>
        </ul>
      </div>
    </div>
    <Erro v-if="error"/>
  </div>
</template>
<script>
import admin from '../../api/admin';
import Erro from '../sections/Error';
export default {
  name: 'Data',
  data() {
    return {
      dataList: null,
      error: null
    }
  },
  mounted () {
    // api
    admin.getDataDetail({ token: localStorage.getItem('a_token')}).then(json => {
      if(json.status === 6) {
        this.error = json.error;
        this.$toast('获取用户数据失败');
      }else {
        this.dataList = json.data;
        this.$toast('获取任务成功');
      }
    }).catch(err => {
      this.$toast('获取失败');
    })
  },
  components: {
    Erro
  }
}
</script>

<style scoped>
.header {
  background-color: rgb(0, 132, 255);
  color: #fff;
  text-align: center;
}
.header > p {
  margin: 0;
  padding: 6px 0;
}
.title {
  font-size: 32px;
}
.desc {
  font-size: 18px;
}
.task {
  margin: 6px 0;
  background-color: #1976D2;
  color: #fff;
  position: relative;
  width: 94%;
  left: 3%;
  border-radius: 5px;
  box-shadow: 0px 0px 1px 1px #a3a8ad;
  /* a3a8ad */
}

.task:nth-child(2n+1) {
  background-color: #0288D1;
}

.task:last-child {
  background-color: #0097A7;
}


.task > p {
  margin: 0;
  font-size: 24px;
  padding: 6px 0 6px 6px;
}
.list {
  display: flex;
}
.list > li {
  margin-left: 12px;
}
.list > li > p {
  margin: 0;
}
.item {
  font-size: 30px;
  font-weight: bold;
}
</style>
