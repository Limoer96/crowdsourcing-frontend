<template>
  <div class="list-container">
    <div class="header-fixed">
      <van-nav-bar 
        title="多条件检索"
        left-text="地图检索"
        left-arrow
        @click-left="back"
      />
      <p class="title">点击修改当前条件</p>
      <div class="mult-condition-container">
        <van-button @click="city.show = true" style="margin-left: .1rem" size="small">当前城市：{{city.value}}</van-button>
        <van-button @click="type.show = true" style="margin-left: .1rem" size="small">任务类型：{{type.value}}</van-button>
        <van-button @click="date.show = true" style="margin-left: .1rem" size="small">任务限时：{{ date.value }}</van-button>  
        <van-button @click="price.show = true" style="margin-top: .1rem" size="small">任务点：{{ price.value }}</van-button>
        <van-button @click="nums_need.show = true" style="margin-top: .1rem; margin-left: .1rem" size="small">所需人数：{{ nums_need.value }}</van-button>
      </div>
    </div>
    <van-popup v-model="city.show" position="top" :overlay="false">
      <van-picker 
        show-toolbar
        title="选择城市"
        @confirm="selectCity"
        :columns="city.columns"  
      />
    </van-popup>
    <van-popup v-model="type.show" position="top" :overlay="false">
      <van-picker 
        show-toolbar
        title="选择任务类型"
        @confirm="selectType"
        :columns="type.columns"  
      />
    </van-popup>
    <van-popup v-model="date.show" position="top" :overlay="false">
      <van-picker 
        show-toolbar
        title="选择任务限时"
        @confirm="selectDate"
        :columns="date.columns"  
      />
    </van-popup>
    <van-popup v-model="price.show" position="top" :overlay="false">
      <van-picker 
        show-toolbar
        title="选择任务点"
        @confirm="selectPrice"
        :columns="price.columns"  
      />
    </van-popup>
    <van-popup v-model="nums_need.show" position="top" :overlay="false">
      <van-picker 
        show-toolbar
        title="选择所需人数"
        @confirm="selectNums"
        :columns="nums_need.columns"  
      />
    </van-popup>
    <Loading v-if="!taskList && !error"/>
    <Erro v-if="error"/>
    <p class="alert" v-if="!error && taskList &&taskList.length === 0">当前条件下无任务</p>
    <div class="body" v-if="taskList">
      <van-panel
        style="margin-top: .2rem"
        v-for="task in taskList" 
        :key="task._id" 
        :title="task.title"
        :desc="task.desc"
        :status="mapStatus[task.status]"
      >
        <div class="content">
          <ul class="info-list">
            <li><span class="item"><router-link :to="`/profile?id=${task.publish_info._id}&redirect=${$router.currentRoute.fullPath}`">{{task.publish_info.user_id}}</router-link></span></li>
            <li>需求:<span class="item">{{task.nums_confirm + '/' + task.nums_need}}</span></li>
            <li><span class="item">{{ task.price }}</span>任务点</li>
            <li>&lt;<span class="item">{{ getReleaceHours(task.time, task.time_limit) }}</span>小时</li>
          </ul>
        </div>
        <div slot="footer">
          <van-button size="small" @click="collect(task._id)">{{collectionBtnText}}</van-button>
          <van-button size="small" type="danger" @click="$router.push(`/task/${task._id}`)">详情</van-button>
        </div> 
      </van-panel>
    </div>
  </div>
</template>

<script>
import api from '../api/task';
import Loading from './sections/Loading';
import Erro from './sections/Error';

export default {
  name: 'MultConditionsTaskList',
  data() {
    return {
      collectionBtnText: '收藏任务',
      mapStatus: ['正在进行', '已结束', '已关闭'],
      city: {
        show: false,
        columns: ['全国', '济南市', '重庆', '北京', '上海', '成都'],
        value: '全国'
      },
      type: {
        show: false,
        columns: ['全部', '远程任务', '面对面', '信息采集', '问题求助', '其它'],
        value: '全部'
      },
      date: {
        show: false,
        columns: ['全部限时', '一天内', '三天内', '一周内', '大于一周'],
        value: '全部限时'
      },
      price: {
        show: false,
        columns: ['所有任务点', '无任务点', '1任务点', '10任务点内', '大于10任务点'],
        value: '所有任务点'
      },
      nums_need: {
        show: false,
        columns: ['所有人数', '1人', '5人以内', '10人以内(包含)', '大于10人'],
        value: '所有人数'
      },
      taskList: null,
      error: false
    }
  },
  components: {
    Loading,
    Erro
  },
  methods: {
    back() {
      this.$router.replace('/');
    },
    selectCity(value, index) {
      this.city.show = false;
      this.city.value = value;
      this.getTaskList();
    },
    selectType(value, index) {
      this.type.show = false;
      this.type.value = value;
      this.getTaskList();
    },
    selectDate(value, index) {
      this.date.show = false;
      this.date.value = value;
      this.getTaskList();
    },
    selectPrice(value, index) {
      this.price.show = false;
      this.price.value = value;
      this.getTaskList();
    },
    selectNums(value, index) {
      this.nums_need.show = false;
      this.nums_need.value = value;
      this.getTaskList();
    },
    formatFormData() {
      const data = {
        city: '',
        nums_need: 0,
        price: 0,
        time_limit: 0,
        type: ''
      };
      if(this.city.value !== '全国') data.city = this.city.value
      if(this.type.value !== '全部') data.type = this.type.value
      switch(this.date.value) {
        case '全部限时':
          data.time_limit = 9999;
          break;
        case '一天内': 
          data.time_limit = 24;
          break;
        case '三天内': 
          data.time_limit = 72;
          break;
        case '一周内': 
          data.time_limit = 168;
          break;
        case '大于一周': 
          data.time_limit = 720;   // 默认调教小于一个月
          break;      
      }
      switch(this.price.value) {
        case '所有任务点': 
          data.price = 9999;
          break;
        case '无任务点': 
          data.price = 0;
          break;
        case '1任务点内': 
          data.price = 1;
          break;
        case '10任务点内':
          data.price = 10;
          break;
        case '大于10任务点':
          data.price = 100;  // 默认小于100任务点
          break;
      }
      switch(this.nums_need.value) {
        case '所有人数': 
          data.nums_need = 9999;
          break;
        case '1人': 
          data.nums_need = 1;
          break;
        case '5人以内': 
          data.nums_need = 5;
          break;
        case '10人以内': 
          data.nums_need = 10;
          break;  
        case '大于10人': 
          data.nums_need = 200;  // 默认小于200人
          break;      
      }
      return data;
    },
    getTaskList() {
      const data = this.formatFormData(); // 获得当前数据
      api.getTaskListMultConditions(data).then(json => {
        this.$toast({
          duration: 500,
          message: '获取列表成功'
        });
        this.taskList = json.data;
      }).catch(err => {
        this.$toast('获取任务列表失败');
        this.error = true;
      })
    },
    getReleaceHours(time, limit) {
      const offest_hours =  (new Date(time).getTime() + limit*3600*1000 - Date.now()) / 3600000;
      return Math.ceil(offest_hours);
    },
    collect(t_id) {
      // 待提收藏夹
      this.$toast('收藏功能即将上线...');
    }
  },
  mounted() {
    this.getTaskList();
  }
}
</script>

<style scoped>
.mult-condition-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-top: .2rem;
}
.title {
  color: rgba(0,0,0,.6);
  font-size: 14px;
}
.header-fixed {
  position: fixed;
  top: 0;
  z-index: 10;
}
.body {
  position: relative;
  top: 4rem;
  background-color: rgba(0,0,0,.05);
}
.content {
  padding: .1rem 
}
.info-list {
  display: flex;
}
.info-list > li {
  color: rgba(0,0,0,.6);
  font-size: 12px;
  margin-right: 0.4rem;
}
.info-list > li:first-child {
  margin-left: 15px;
}
.info-list > li:first-child a {
  color: rgba(0,0,0,.6);
}
.item {
  font-weight: bold;
}
.alert {
  position: relative;
  top: 4rem;
  width: 100%;
  text-align: center;
  font-size: 24px;
  color: rgba(0,0,0,.6);
}
</style>
