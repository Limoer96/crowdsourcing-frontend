<template>
  <div class="discuss-container">
    <van-nav-bar 
      title="编辑帖子"
      left-arrow
      right-text="发布"
      @click-left="$router.goBack()"
      @click-right="publishDiscuss"
    />
    <div class="content-body">
      <van-field style="font-size: 16px; font-weight: bold;" v-model="subject" placeholder="输入一个标题~" />
      <van-field type="textarea" style="font-size: 16px; margin-top: .2rem" v-model="desc" placeholder="添加些本讨论的描述吧~" autosize rows="5"/>
      <div class="image-preview">
        <van-uploader
          :after-read="uploadFile"
          multiple
          accept="image/*"
        >
          <div class="image-item">
            <van-icon 
              name="add-o"
              style="font-size: 36px; margin-top: 62px"
            />
          </div>
        </van-uploader>
        <div v-for="(image, index) in images" :key="index">
          <div class="action-wrapper"> 
            <van-icon name="clear" @click="removeImg(index)"/>
          </div>
          <img class="image" :src="image.content" alt="待上传的图片"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import discuss from '../api/discuss';
export default {
  name: 'PublishDiscuss',
  data() {
    return  {
      subject: '',
      desc: '',
      images: []
    }
  },
  methods: {
    publishDiscuss() {
      // 发布的一些逻辑
      if(this.isValid) {
        discuss
        .publish({ subject: this.subject, desc: this.desc, images: this.images })
        .then(json => {
          this.$toast.success('发帖成功！');
        }).catch(err => {
          this.$toast.fail('发帖失败~');
        })
      }else {
        this.$toast('标题是必填选项~');
      }
    },
    uploadFile(files) {
      let currentLength = files.length ? files.length : 1;
      if(this.images.length + currentLength >5) {
        this.$toast('最多只能上传5张图片');
        return;
      }
      if(files.length) {
        this.images.push(...files)
      }else {
        this.images.push(files);
      }
    },
    removeImg(index) {
      this.images.splice(index, 1);
    }
  },
  computed: {
    isValid() {
      return this.subject !== '';
    }
  }
}
</script>

<style scoped>
.image-item {
  box-sizing: border-box;
  width: 90px;
  height: 160px;
  border: 2px dashed  rgba(0,0,0,.6);
  border-radius: 5px;
  text-align: center;
  margin: .3rem 0 0 .3rem;
  color: rgba(0,0,0,.6);
}
.image {
  width: 90px;
  height: 160px;
  margin: .3rem 0 0 .3rem;
}

.action-wrapper {
  position: absolute;
  width: 90px;
  height: 160px;
  margin: .3rem 0 0 .3rem;
  background-color: rgba(255,255,255,.5);
} 

.image-preview {
  display: flex;
  flex-wrap: wrap;
}

</style>
