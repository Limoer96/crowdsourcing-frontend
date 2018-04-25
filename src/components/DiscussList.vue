<template>
  <div class="list-container">
    <van-nav-bar 
      title="讨论区"
      @click-left="$router.goBack('/')"
      @click-right="$router.push('/discuss/publish')"
    >
      <van-icon style="font-size: 20px;" name="wap-home" slot="left" />
      <van-icon style="font-size: 20px;" name="edit" slot="right" />
    </van-nav-bar>
    <div v-if="discussList" class="body">
      <van-panel
        style="margin: .2rem 0"
        v-for="(discuss, index) in discussList"
        :key="index"
        :title="discuss.subject"
        :desc="`${discuss.author.user_id} 发布于 ${new Date(discuss.date).toLocaleString()}`"
      >
        <div class="content-container">
          <p class="content">{{ discuss.desc }}</p>
          <div class="img" v-if="discuss.desc_images.length > 0">
            <img 
              :src="'http://localhost:3000/'+discuss.desc_images[0].replace('public/', '')" 
              alt=""
            >
          </div>
        </div>
        <div slot="footer">
          <van-icon 
            style="color: rgba(0,0,0,.6);  margin-left: 70%" 
            name="like-o"
            @click="likeDiscuss(discuss._id)"
          />                  
          <van-icon 
            style="color: rgba(0,0,0,.6); margin-left: .4rem" 
            name="arrow"
            @click="goToDiscussDesc(discuss._id)"
          />     
        </div>
      </van-panel>
      <van-pagination
        v-model="currentPage"
        :total-items="totalCount"
        :items-per-page="itemsPerPage"
        mode="simple"
      />  
    </div>
  </div>
</template>

<script>

import discuss from '../api/discuss';

export default {
  name: 'DiscussList',
  data() {
    return {
      discussList: null,
      currentPage: 1,
      totalCount: null,
      itemsPerPage: 8
    }
  },
  methods: {
    likeDiscuss(_id) {
      this.$toast("收藏功能开发中...");
    },
    goToDiscussDesc(_id) {
      this.$router.push(`/discuss/desc/${_id}`);
    }
  },
  mounted () {
    discuss.getDiscussesByPage({ page: 1, pageSize: this.itemsPerPage}).then(json => {
      console.log(json);
      let { count, list } = json.data;
      this.totalCount = count;
      this.discussList = list;
    }).catch(err => {
      // console.log(err)
      this.$toast.fail('加载失败~');
    })
  }  
}
</script>
<style scoped>
.content-container {
  width: 100%;
}
.body {
  background-color: rgba(0,0,0,.05);
}
.img {
  position: relative;
  width: 90%;
  left: 5%;
  height: 200px;
  overflow: hidden;
  background-color: #333;
}
.img > img {
  width: 100%;
  position: absolute;
  left: 0;
  /* top: 50%; */
  /* transform: translateY(-50%); */
}
.content {
  width: 90%;
  margin: 0;
  padding: 5px 5%;
  font-size: 14px;
}
</style>
