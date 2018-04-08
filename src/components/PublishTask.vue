<template>
  <div id="input-container">
    <van-nav-bar 
      title="发布任务"
      left-arrow
      left-text="返回"
      @click-left="back"
    />
    <div class="input-body">
      <p class="van-ellipsis">当前位置：{{this.location.address? this.location.address : "无法获取当前位置，将不使用地址发送"}}</p>
      <van-radio-group v-model="locationStyle">
        <van-cell-group>
          <van-cell><van-radio :disabled="!isLocation" name="0">使用当前地址</van-radio></van-cell>
          <van-cell><van-radio :disabled="!isLocation" name="1">仅使用所在城市</van-radio></van-cell>
          <van-cell><van-radio :disabled="!isLocation" name="2">不使用地址</van-radio></van-cell>          
        </van-cell-group>
      </van-radio-group>
      <p class="title">基本信息</p>
      <van-cell-group>
        <van-field v-model="title" placeholder="标题" />
        <van-field v-model="desc" placeholder="详细描述" type="textarea"/>
      </van-cell-group>
      <p class="title">任务类型(可多选)</p>
      <van-checkbox-group v-model="types">
        <van-cell-group>
          <van-cell v-for="item in list" :key="item">
            <van-checkbox :name="item">{{item}}</van-checkbox>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <p class="title">任务要求(最多五项)</p>
      <van-cell-group>
        <van-field 
          type="textarea"
          :rows="1"
          :key="index" 
          v-for="(limit, index) in limits"
          v-model="limits[index]" 
          :label="'要求' + (index+1)">
          <van-button @click="limits.splice(index, 1)" slot="button" size="small" type="primary">删除</van-button>
        </van-field>
        <van-row>
          <van-col span="22" offset="1">
            <van-button @click="addLimit" style="font-size: 30px; margin: 5px 0; border: dashed" size="large"><van-icon name="add"/></van-button>            
          </van-col>
        </van-row>  
      </van-cell-group>
      <p class="title">其它信息</p>
      <van-cell-group>
        <van-field v-model="nums_need" label="需求人数" type="number" placeholder="请输入需求人数" />
        <van-field v-model="price" type="number" label="任务点" placeholder="完成任务获得的任务点" />
        <van-field v-model="time_limit" label="时限(小时)" type="number" placeholder="完成任务所需要的最大时间" />
      </van-cell-group>
      <van-button type="primary" @click="addTask" bottom-action>发布任务</van-button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import api from '../api/task';
export default {
  data(){
    return {
      list: ['远程任务', '面对面', '信息采集', '问题求助', '其它'],
      locationStyle: "0",
      title: '',
      desc: '',
      types: [],
      limits: [''],
      nums_need: null,
      price: null,
      time_limit: null,
      ipAddress: {}
    }
  },
  methods: {
    addLimit() {
      if(this.limits.length < 5) {
        this.limits.push('');
      }else {
        this.$toast('你已经填写5项要求了！');
      }
    },
    back() {
      this.$dialog.confirm({
        title: '警告',
        message: '确认离开吗？当前任务还未发布'
      }).then(() => {
        this.$router.goBack();
      }).catch(() => {
        // 取消的逻辑
      })
    },
    addTask() {
      if(this.isValid) {
        api.addTask({
          title: this.title,
          desc: this.desc,
          types: this.types,
          limits: this.limits,
          location: this.getFormatLocation(),
          nums_need: this.nums_need,
          price: this.price,
          time_limit: this.time_limit
        }).then(json => {
          const _id = json.data._id;
          this.$toast.success({message: '发布成功', duration: 1000});
          setTimeout(() => {
            this.$router.push(`/task/${_id}`);
          }, 1500);
          // 一秒轻提示，1.5秒后跳转
        }).catch(err => {
          this.$toast.fail('发布失败，请重试！');
        })
      }else {
        this.$toast('请填写完所有选项后再发布');
      }
    },
    getFormatLocation() {
      if(!this.isLocation) {
        // 没有获取到地址
        return { lng: 0, lat: 0, address: '默认地址', city: '默认城市' }
      }
      if(this.locationStyle === '1') {
        return { lng: 0, lat: 0, address: '默认地址', city: this.location.city }
      }else if(this.locationStyle === '2') {
        // 不使用地址
        return { lng: 0, lat: 0, address: '默认地址', city: '默认城市' }        
      }
      return this.location
    }
  },
  computed: {
    isValid() {
      let isNotNull = this.nums_need !== null && this.price !== null && this.time_limit !== null;
      let isNotEnpty = this.title && this.desc && this.types.length > 0 && this.limits.length > 0 ;
      return isNotNull && isNotEnpty;
    },
    isLocation(){
      return this.location && this.location.address
    },
    ...mapState({
      location: state => state.auth.location
    })
  }
}
</script>
<style scoped>

.title {
  box-sizing: border-box;
  padding: 10px 5px;
  margin: 0;
  background-color: rgba(0,0,0,.1);
}

.title:first-child {
  margin-top: .2rem;
}

</style>
