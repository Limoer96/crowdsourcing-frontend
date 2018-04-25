<template>
  <div class="container">
    <van-nav-bar
      v-if="discusslist"
      title="发帖信息"
      left-arrow
      left-text="返回"
      @click-left="$router.goBack()"
    />
    <div class="body" v-if="discusslist">
      <van-panel
        v-for="(discuss, index) in discusslist"
        :key="index"
        style="margin-top: .1rem;"
      >
        <div slot="header" class="header">
          <p class="title">{{ discuss.subject }}</p>
        </div>
        <div class="content">
          <div class="img" v-if="discuss.desc_images && discuss.desc_images.length > 0">
            <img 
              v-for="(img, index) in discuss.desc_images"
              :key="Math.random()*index"
              :src="'http://localhost:3000/'+img.replace('public/', '')" 
              alt="图片"
            >
          </div>
          <p class="desc">{{ discuss.desc }}</p>
        </div>
        <div slot="footer">
          <p class="footer-content">
            <span>
              {{`${discuss.author.user_id} 发表于 ${new Date(discuss.date).toLocaleString()}`}}
            </span>
            <span>
              <van-icon 
                style="color: rgba(0,0,0,.6); margin-left: 1rem;" 
                name="chat"
                :info="discuss.comment.length"
              />
            </span> 
            <span>                 
              <van-icon 
                style="color: rgba(0,0,0,.6); margin-left: .6rem" 
                name="arrow"
                @click="goToDiscussDesc(discuss._id)"
              /> 
            </span>  
          </p>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
import discuss from '../api/discuss';
export default {
  name: 'ProfileDiscuss',
  data() {
    return {
      discusslist: null
    }
  },
  mounted () {
    // api
    discuss.getDiscussByUserId({ u_id: this.$route.query.u_id }).then(json => {
      this.discusslist = json.data;      
    }) 
  },
  methods: {
    goToDiscussDesc(_id) {
      this.$router.push(`/discuss/desc/${_id}`);
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
  width: 100%;
  /* left: 5%; */
  /* padding: 0 .2rem; */
}
.title {
  margin: 0;
  font-weight: bold;
  word-break: break-all;
}
.img {
  position: relative;
  display: flex;
  width: 90%;
  left: 5%;
  height: 100px;
  overflow: hidden;
}

.img > img {
  width: 30%;
  margin-right: 2%;
}

.desc {
  position: relative;
  width: 90%;
  left: 5%;
  font-size: 14px;
  color: #555;
}
.footer-content {
  margin: 0;
}
.footer-content > span {
  font-size: 12px;
  color: #a3a8ad;
}

</style>
