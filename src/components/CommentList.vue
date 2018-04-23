<template>
  <div class="container">
    <van-nav-bar 
      title="回帖列表"
      left-arrow
      left-text="返回"
      @click-left="$router.goBack()"
    />
    <div class="body" v-if="commentList">
      <ul class="list-container">
        <li 
          @click="$router.push(`/discuss/desc/${comment.discuss._id}`)"
          class="comment"
          v-for="(comment, index) in commentList"
          :key="index"
        >
          <p class="comment-content">{{ comment.content }}</p>
          <div class="discuss">
            <p class="discuss-content">{{ comment.discuss.subject }}</p>
            <div class="img" v-if="comment.discuss.desc_images.length > 0">
              <img
                v-for="img in comment.discuss.desc_images "
                :key="img"
                :src="'http://localhost:3000/'+img.replace('public/', '')"
                alt="描述图片"
              >
            </div>
            <p class="discuss-desc">{{ comment.discuss.desc }}</p>
          </div>
          <p class="footer">{{`${comment.commenter.user_id} 回复于 ${new Date(comment.date).toLocaleString()}`}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import comment from '../api/comment';
export default {
  name: 'CommentList',
  data() {
    return {
      commentList: null
    }
  },
  mounted () {
    // api
    comment.getCommentsByUserId({ userId: this.$route.query.u_id})
    .then(json => {
      this.commentList = json.data;
    }).catch(err => {
      this.$toast('获取用户数据失败！');
    })
  },
  methods: {

  }
}
</script>

<style scoped>
  .list-container {
    margin: 0;
    padding: .2rem 0;
    /* border-top: 1px solid rgb(234, 235, 236); */
  }
  .comment {
    position: relative;
    width: 96%;
    left: 2%;
    border-bottom: 1px solid rgb(234, 235, 236);
    padding: 5px 0;
  }
  .comment-content {
    color: #262626;
    margin: .1rem 0;
  }
  .discuss {
    position: relative;
    padding: 4px 10px;
    background-color: #f2f3f4;
    border: 1px solid #E7E9EA;
    border-radius: 2px;
  }
  .discuss:before {
    content: '';
    position: absolute;
    top: -4px;
    left: 12px;
    width: 5px;
    height: 5px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    background: #F2F3F4;
    border-top: 1px solid #E7E9EA;
    border-left: 1px solid #E7E9EA;
  }
  .discuss-content {
    margin: .1rem 0;
    color: #262626;
  }
  .discuss-desc {
    font-size: 14px;
    margin: .1rem 0;
    color: #555;
  }
  .footer {
    font-size: 12px;
    color: #a3a8ad;
    margin: .1rem 0;
  }
  .img {
  position: relative;
  display: flex;
  width: 90%;
  left: 5%;
  height: 60px;
  overflow: hidden;
}

.img > img {
  width: 25%;
  margin-right: 2%;
}

</style>
