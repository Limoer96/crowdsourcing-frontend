<template>
  <div>
    <van-nav-bar
      title="提交回答"
      left-arrow
      left-text="返回"
      @click-left="back"
    />
    <Timer :time="taskData.time" :timeOffset="taskData.time_limit" title="距离任务结束还剩"/>
    <div class="body">
      <van-panel 
        style="margin-bottom: .2rem"
        :title="taskData.title"
        :desc="taskData.desc"
      />
      <van-cell-group>
        <van-field 
          v-model="answer"
          label="提交回答"
          type="textarea"
          placeholder="请输入答案文本描述"
          rows="2"
          autosize
        />
      </van-cell-group>
      <van-uploader
        style="width: 100%"
        :after-read="upLoadFile"
        multiple
        accept="image/*"
      >
      <!-- 插入内容 -->
      
      <div class="upload-text"><p><van-icon style="font-size: 24px; padding: 5px;" name="add-o"/>上传图片</p></div>
      </van-uploader>
      <div class="img-preview" v-if="imgList.length">
        <div v-for="(img, index) in imgList" :key="index">
          <div class="action-wrapper"> 
            <van-icon name="clear" @click="removeImg(index)"/>
          </div>
          <img class="item" :src="img.content" alt="待上传的图片">
        </div>
      </div>
    </div>
    <van-button :disabled="isTaskEnd || uploaded" style="position: fixed; bottom: 0" @click="uploadData" bottom-action>提交回答</van-button>
  </div>
</template>

<script>
import Timer from './sections/Timer';
import api from '../api/answer';
import task from '../api/task';
export default {
  name: 'UploadAnswer',
  data() {
    return {
      taskData: '',
      answer: '',
      imgList: [],
      error: false,
      uploaded: false
    }
  },
  components: {
    Timer
  },
  methods: {
    upLoadFile(files) {
      let currentLength = files.length ? files.length : 1;
      if(this.imgList.length + currentLength >5) {
        this.$toast('最多只能上传5张图片');
        return;
      }
      if(files.length) {
        console.log(files);
        this.imgList.push(...files);
      }else {
        this.imgList.push(files);
      }
    },
    removeImg(index) {
      this.imgList.splice(index, 1);
    },
    back() {
      this.$dialog.confirm({
        message: '返回将丢失待提交的回答，确认返回？'
      }).then(() => {
        this.$router.goBack();
      })
    },
    uploadData() {
      this.$dialog.confirm({
        message: '一旦提交将无法再修改，确认提交吗？'
      }).then(() => {
         api.uploadData({
          t_id: this.taskData._id,
          answer: this.answer,
          images: this.imgList
        }).then((json) => {
          if(json.status === 8) {
            this.$toast("提交失败，你已经提交过任务了");
          }else {
            this.$toast("回答成功")
          }
          this.uploaded = true;
        }).catch(err => {
          console.log('回答任务失败');
        })
      })
    }
  },
  mounted () {
    const _id = this.$route.params.id;
    task.getTaskInfo({ t_id: _id }).then((json) => {
      this.taskData = json.data;
    }).catch(err => {
      this.error = true;
    });
  },
  computed: {
    isTaskEnd() {
      return new Date(this.taskData.time).getTime() + this.taskData.time_limit * 3600000 - Date.now() <= 0;
    }
  }
}
</script>

<style>
.upload-text {
  position: relative;
  box-sizing: border-box;
  margin-top: .2rem;
  width: 90%;
  height: 60px;
  left: 5%;
  border: 2px dashed #4b0;
  border-radius: 5px;
}
.upload-text p {
  margin: 0;
  height: 60px;
  width: 90%;
  line-height: 60px;
  text-align: center;
  font-size: 16px;
}
.img-preview {
  position: relative;
  width: 90%;
  left: 5%;
  margin-top: .2rem;
  display: flex;
  flex-wrap: wrap;
}
.action-wrapper {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: rgba(255,255,255,.5);
}
.item {
  width: 100px;
  height: 100px;
  margin-right: .2rem;
}
</style>
