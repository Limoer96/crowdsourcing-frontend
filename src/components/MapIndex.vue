<template>
  <div class="map-container">
    <div class="user-container">
      <p class="user-content" v-if="!isLogin">你好！请先 <router-link to="/auth">登录</router-link></p>
      <div class="user-bar" v-if="isLogin">
        <ul>
          <li><van-icon name='contact' @click="userMeunShow=true"/></li>
          <li>21次</li>
          <li>1个</li>
          <li>214元</li>
          <li>100%</li>
          <li><van-icon name='setting' @click="settingShow=true"/></li>          
        </ul>
      </div>
    </div>
    <el-amap 
      class="amap-box"  
      ref='map' 
      vid="amap-vue" 
      :amap-manager="amapManager" 
      :center="center" 
      :zoom="zoom" 
      :plugin="plugin" 
      :mapStyle="style"
    >
      <el-amap-marker 
        v-for="(marker, index) in markers"
        :title="index"
        :position="marker.position" 
        :icon="icon"
        :key="marker.position.lat"
        :events="marker.events"
      >
      </el-amap-marker>
      <el-amap-info-window
        v-for="(one, index) in windows"
        :position="one.position"
        :Key="Math.random() * index"
        :content="one.content"
        :visible="one.visible"
        autoMove=true
      >

      </el-amap-info-window>
    </el-amap>
    <div class="position-container">
      <p>当前位置：{{isLocation ? '定位中...' : searchOption.city}}</p>
      <p>可用任务数：{{ !loadSuccess ? '加载中...': tasks.length}}</p>
      <p>更多任务：<router-link style="color: #fff; font-weight: bold;" to="/multConditions">点击进入</router-link></p>
    </div>
    <van-popup v-if="currentTask" v-model="show" position="right">
      <p class="title">基本信息</p>
      <van-cell-group>
        <van-cell title="任务编号" is-link :value="currentTask._id" @click="toTaskDesc(currentTask._id)"/>
        <van-cell title="任务名称" :value="currentTask.title"/>
        <van-cell>
          <template slot="title">
            <span class="van-cell-text">类别</span>
            <van-tag type="success" v-for="(tag, index1) in currentTask.types" :key="index1">{{tag}}</van-tag>
          </template>
        </van-cell>
        <van-cell :value="currentTask.desc"/>
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
          <van-button bottom-action @click="chooseTask" type="primary">采集！</van-button>
        </van-col>
        <van-col span="12">
          <van-button bottom-action @click="show = !show">返回</van-button>
        </van-col>
      </van-row>
    </van-popup>
    <van-popup v-model="userMeunShow" position="top">
      <div class="btn-group">
        <van-button style="background-color: #00E5FF; color: #fff" class="btn" @click="toProfile" size="large" type="default">个人信息</van-button>
        <van-button class="btn" size="large" type="primary" @click="toPublishTask">发布任务</van-button>
        <van-button @click="logout" size="large" type="danger">登出</van-button>  
      </div>    
    </van-popup>
    <van-popup v-model="settingShow">
      <div class="setting-container">
      <p>深色地图</p>
      <van-switch v-model="styleType"/>
      </div>
    </van-popup>
  </div>
</template>

<script>
import img from '../assets/icon_task_fill.png';
import types from '../store/type';
import task from '../api/task';
import { AMapManager } from 'vue-amap';
import { mapGetters, mapState } from 'vuex';
let amapManager = new AMapManager();

export default {
  name: 'MapIndex',
  data() {
    const self = this;
    return {
      styleType: false, // 地图的模式，日间和夜间模式可选
      icon: img, // 任务标记所使用的图标
      isLocation: true, // 是否正在定位
      show: false, // 是否显示任务详情
      userMeunShow: false, // 是否显示用户菜单
      settingShow: false, // 是否显示设置菜单
      loadSuccess: false, // 是否加载成功
      currentIndex: 0, // 当前所选任务的index
      amapManager, // 地图管理对象
      zoom: 12, // 缩放比例
      lng:0, // 当前经纬度
      lat: 0,
      searchOption: {
        city: '厦门'
      },
      center: [118.14162, 24.66741], // 地图中心点
      tasks: [], // 任务，从服务器中取得
      markers: [{
        position: [117.24155, 36.66731],
        id: 'dsadsads',
        events: {
          click: () => {
          }
        }
      }], // 标记点
      windows: [],
      plugin: [{
        pName: 'ToolBar'
      },
      {
        pName: 'Geolocation',
        timeout: 3000,
        events: {
          init(o) {
            o.getCurrentPosition((status, result) => {
              if(result && result.position) {
                self.isLocation = false;
                self.searchOption.city = result.addressComponent.city;
                self.lng = result.position.lng;
                self.lat = result.position.lat;
                self.center = [self.lng, self.lat];
                const location = {
                  lng: result.position.lng,
                  lat: result.position.lat,
                  address: result.formattedAddress,
                  city: result.addressComponent.city
                }
                self.$store.commit(types.GET_AND_SAVE_LOCATION, location);
                self.windows.push({
                  position: [result.position.lng, result.position.lat],
                  content: '你在这里!',
                  visible: true,
                  autoMove: true
                })
                self.$nextTick();
              }else {
                if(self.loadAlert) {
                  // 此时无法加载地图...
                  self.$dialog.confirm({
                    title: '提示',
                    message: '无法加载地图，请切换至多条件检索'
                  }).then(() => {
                    self.$store.commit(types.CAN_NOT_USE_MAP_SEARCH);
                    self.$router.push('/multConditions');
                  }).catch(() => {
                    // 如果用户此时选了否，那么以后加载地图都不要进行提示了
                    self.$store.commit(types.NOT_LOAD_MAP_LOADING_ALERT);
                  })
                }
              }
            })
          }
        }
      }] // 插件及其配置
    }
  },
  methods: {
   toTaskDesc(id) {
     this.$router.push(`/task/${id}`)
   },
   logout() {
     this.$store.commit(types.LOGOUT_AND_CLEAR_TOKEN);
     this.userMeunShow = false;     
   },
   toPublishTask() {
     this.$router.push('/publish');
   },
   chooseTask() {
     // 添加任务的操作
     if(this.isLogin) {
       this.$toast('采集成功！')
     }else {
       this.$toast('你还未登录，采集失败');
     }
   },
   toProfile() {
     this.$router.push(`/profile?id=${localStorage.getItem('id')}&redirect=${this.$router.currentRoute.fullPath}`);
   }
  },
  mounted() {
    // 假设通过API请求去拿数据
    task.getMapTasks().then((json) => {
      let tasks = json.data;
      const markers = [];
      let that = this;
      for(let task of tasks) {
        markers.push({
          position: [task.location.lng, task.location.lat],
          id: task._id,
          events: {
            click: (o) => {
              const title = o.target.Uh.title;
              that.show = true;
              that.currentIndex = title;
            }
          }
        })
      }
      that.markers = markers;
      that.tasks = tasks;
      that.loadSuccess = true;
    });
    if(localStorage && localStorage.getItem('token')) {
      this.$store.dispatch('quickLogin');
    }
  },
  computed: {
    currentTask() {
      return this.tasks[this.currentIndex];
    },
    style(){
      return this.styleType ? 'dark' : 'fresh';
    },
    ...mapGetters([
      'isLogin'
    ]),
    ...mapState({
      userName: state => state.auth.userName,
      id: state => state.auth.id,
      loadAlert: state => state.app_state.loadAlert
    })
  }
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
.search-box {
  position: absolute;
  z-index: 10;
  width: 96%;
  left: 2%;
  top: 1%;
}
.position-container {
  position: absolute;
  box-sizing: border-box;
  width: 96%;
  left: 2%;
  height: 20%;
  bottom: 18px;
  background-color: #4b0;
  border-radius: 5px;
  padding: 10px;
  z-index: 10;
  color: #fff;
}

.position-container > p {
  margin: 6px;
}
.title{
  margin: 0;
  box-sizing: border-box;
  padding: 10px;
  color: #fff;
  background-color: #4b0;
  font-weight: lighter;
}
.user-container {
  position: absolute;
  top: 10px;
  width: 96%;
  height: 50px;
  left: 2%;
  background-color: #4b0;
  border-radius: 5px;
  text-align: center;
  z-index: 100;
}

.user-bar {
  position: relative;
}
.user-bar > ul {
  display: flex;
  justify-content: center;
}
.user-bar > ul >li{
  float: left;
  width: 50px;
  height: 50px;
  line-height: 50px;
  margin-left: 5px;
  color: #fff;
  border-radius: 25px;
}

.user-content {
  color: #fff;
  margin: 0;
  padding: 0;
  height: 50px;
  line-height: 50px;
}
.user-content a {
  color: rgba(30,144,255, .8);
}

.btn-group {
  margin: 30px 10px;
}
.btn {
  margin-bottom: 10px;
}
.setting-container {
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  color: rgba(0,0,0,.6);
}
</style>
