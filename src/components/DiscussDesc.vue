<template>
  <div class="discuss-container">
    <van-nav-bar 
      title="讨论区"
      left-arrow
      @click-left="$router.goBack()"
      @click-right="commentToDiscuss"
    >
      <van-icon style="font-size: 16px;" name="edit" slot="right" />
    </van-nav-bar>
    <div class="body" v-if="discussData">
      <van-panel
        :title="discussData.subject"
        :desc="`${discussData.author.user_id} 发布于 ${new Date(discussData.date).toLocaleString()}`"
        style="margin-bottom: .2rem;"
      >
        <div class="content-container">
          <p>{{discussData.desc}}</p>
          <div class="img">
            <img
              v-if="discussData.desc_images" 
              :src="'http://localhost:3000/'+discussData.desc_images[0].replace('public/', '')" 
              alt="图片"
            >
          </div>
        </div>
      </van-panel>
      <div v-if="comments && comments.length > 0">
        <van-panel
          v-for="(comment, index) in comments"
          :key="Math.random()*index"
          style="margin-bottom: .1rem;"
        >
          <div slot="header">
            <p class="van-ellipsis" style="margin: 0; font-size:14px;">{{ comment.content }}</p>
            <p class="desc">{{`${comment.commenter.user_id} 发布于 ${new Date(comment.date).toLocaleString()}`}}</p>
          </div>
          <p class="content">
            <span 
              v-if="comment.userRef">
              <router-link :to="`/profile?id=${comment.userRef._id}&redirect=${$router.currentRoute.fullPath}`">
              @{{ comment.userRef.user_id }}
              </router-link>
            </span>
            {{ comment.content }}
          </p>
          <div slot="footer">
            <van-icon 
              style="color: rgba(0,0,0,.6);  margin-left: 70%" 
              name="like-o"
              @click="addLikeToComment(comment._id)"
            />                  
            <van-icon 
              style="color: rgba(0,0,0,.6); margin-left: .4rem" 
              name="edit"
              @click="reply(comment)"
            />
          </div>  
        </van-panel>
      </div>
      <div class="empty" v-else>
        <p>暂无评论</p>
      </div>
      <van-popup
        v-model="show"
        position="right"
        :overlay="false"
        style="width: 100%; height: 100%"
      >
        <div class="input-content">
          <van-nav-bar 
            title="发表评论"
            left-arrow
            @click-left="show = false"
            right-text="回复"
            @click-right="comment"
          />
          <van-cell-group>
            <van-field
              v-model="commentText"
              :placeholder= "ph"
              type="textarea"
              rows="5"
            />
          </van-cell-group>
        </div>
      </van-popup>
    </div>
    <Loading v-if="loading"/>
    <Erro v-if="error"/>
  </div>
</template>

<script>
import discuss from '../api/discuss';
import comment from '../api/comment';
import Loading from './sections/Loading';
import Erro from './sections/Error';
export default {
  name: 'DiscussDesc',
  data() {
    return  {
      discussData: null,
      error: false, 
      loading: true,
      show: false,
      commentText: '',
      ph: '也说点什么吧',
      userId: '',
      commentId: '',
      comments: []
    }
  },
  mounted () {
    this.getDiscussInfo();
    this.getCommentInfo();
  },
  methods: {
    getCommentInfo() {
      comment.getCommentInfo({ d_id: this.$route.params.id }).then(json => {
        this.comments = json.data;
      })
    },
    getDiscussInfo() {
      discuss.getDiscussById({ d_id: this.$route.params.id }).then(json => {
        this.loading =false;
        this.discussData = json.data;
      }).catch(err => {
        this.loading = false;
        this.error = true;
      })
    },
    comment() {
      comment.comment({ 
        d_id: this.discussData._id,
        content: this.commentText,
        u_id: this.userId,
        c_id: this.commentId
      }).then(json => {
        this.$toast('评论成功');
        setTimeout(() => {
          this.show = false;
          this.getCommentInfo(); // 重新获取评论数据
        }, 1000)
      })
    },
    reply(comment) {
      // 1
      let userId = comment.commenter.user_id;
      let u_id = comment.commenter._id;
      let d_id = this.$route.params.id;
      let c_id = comment._id;
      // 2
      this.ph = `@${userId}(这是给${userId}的评论)`;
      this.show = true;
      this.userId = u_id;
      this.commentId = c_id;
    },
    commentToDiscuss() {
      this.show = true;
      this.ph = '也说点什么吧';
    }
  },
  components: {
    Loading,
    Erro
  }
}
</script>

<style scoped>

.body {
  width: 100%;
  background-color: rgba(0,0,0,.05);
}

.content-container {
  position: relative;
  box-sizing: border-box;
  width: 90%;
  left: 5%;
  padding-bottom: .2rem;
  }

.content-container > p {
  margin: .1rem 0;
  font-size: 14px;
}

.img {
  position: relative;
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

.empty {
  width: 100%;
  height: 50px;
  padding-top: 1rem;
  background-color: #fff;
  text-align: center;
}

.empty > p {
  font-size: 20px;
  font-weight: lighter;
}

.input-content {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.desc {
  margin: 0;
  font-size: 10px;
  color: rgba(0,0,0,.4);
}
.content {
  width: 100;
  margin: 0;
  box-sizing: border-box;
  padding: .1rem 5%;
}

</style>
