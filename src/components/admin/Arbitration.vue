<template>
  <div class="container">
    <div class="body" v-if="answerList && answerList.length > 0">
      <ul>
        <li 
          v-for="(answer, index) in answerList"
          :key="index"
          >
          <van-row>
            <van-col span="22" offset="1">
              <van-collapse v-model="activeNames">
                <van-collapse-item title="回答详情" name="1">
                  <p class="content">{{answer.text}}</p>
                  <van-button type="primary" size="small" @click="showInmages(answer.img_src)">查看图片</van-button>
                  <p class="footer"><span>{{ answer.author.user_id }} 回答于：{{new Date(answer.date).toLocaleString()}}</span></p>    
                </van-collapse-item>
                <van-collapse-item title="任务详情" name="2">
                  <p class="title">{{ answer.task.title }}<span class="title-time">发布于{{ new Date(answer.task.time).toLocaleDateString() }}</span></p>  
                  <p class="desc">任务描述：{{ answer.task.desc }}</p>
                  <p class="type">任务类型：{{ answer.task.types.join(' ') }}</p>
                  <p class="limits">任务要求：{{ answer.task.limits.join('; ') }}</p>

                </van-collapse-item>
                <van-collapse-item title="仲裁" name="3">
                  <van-cell-group>
                    <van-field type="textarea" rows="3" v-model="reason" placeholder="输入仲裁理由"/>
                  </van-cell-group>
                  <van-button @click="resolve(index)" size="small" type="primary">完成任务</van-button>
                  <van-button size="small" @click="reject(index)" type="danger">未完成任务</van-button>
                </van-collapse-item>
              </van-collapse>
            </van-col>
          </van-row>
        </li>
      </ul>
    </div>
    <div class="item" v-else>
      <p class="no-title">当前无需要仲裁的回答！</p>
    </div>
    <Erro v-if="error"/>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import admin from '../../api/admin';
import Erro from '../sections/Error';
export default {
  name: 'Arbitration',
  data() {
    return {
      activeNames: ['1', '2'],
      answerList: null,
      error: false,
      reason: ''
    }
  },
  mounted() {
    // api
    this.getAnswers();
  },
  methods: {
    showInmages(imgs) {
      let imageUrls = imgs;
      imageUrls = imageUrls.map((url) => url.replace('public', 'http://localhost:3000'));
      ImagePreview(imageUrls);
    },
    getAnswers() {
      admin.getAnswers({ token: localStorage.getItem('a_token') }).then((json) => {
        if(json.status === 6) {
          this.$router.push('/admin/auth')
        }else {
          this.$toast('获取数据成功!');
          this.answerList = json.data;
        }
      }).catch(err => {;
        this.error = true;
      })
    },
    resolve(index) {
      // 表示仲裁完成任务
      //  token, reason, price, t_id, u_id, a_id
      if(this.reason) {
        admin.resolveAnswer({
          token: localStorage.getItem('a_token'),
          reason: this.reason,
          price: this.answerList[index].task.price,
          t_id: this.answerList[index].task._id,
          u_id: this.answerList[index].author._id,
          a_id: this.answerList[index]._id,

        }).then(json => {
          if(json.status === 6) {
            this.$toast('用户验证失效，请登录');
            setTimeout(() => {
              this.$router.push('/admin/auth');
            }, 1000)
          }else {
            this.$toast('仲裁成功');
            this.reason = '';
            this.getAnswers(); // 重新加载任务数据
          }
        }).catch(err => {
          this.$toast('仲裁失败，请重试！');
        })
      }else {
        this.$toast('请填写仲裁理由后继续');
      }
    },
    reject(index) {
      // 表示仲裁完成任务
      //  token, reason, price, t_id, u_id, a_id
      if(this.reason) {
        admin.rejectAnswer({
          token: localStorage.getItem('a_token'),
          reason: this.reason,
          price: this.answerList[index].task.price,
          t_id: this.answerList[index].task._id,
          u_id: this.answerList[index].task.publish_info,
          a_id: this.answerList[index]._id
        }).then(json => {
          if(json.status === 6) {
            this.$toast('用户验证失效，请登录');
            setTimeout(() => {
              this.$router.push('/admin/auth');
            }, 1000)
          }else {
            this.$toast('仲裁成功');
            this.reason = ''; // 清除reason
            this.getAnswers(); // 重新加载任务数据
          }
        }).catch(err => {
          this.$toast('仲裁失败，请重试！');
        })
      }else {
        this.$toast('请填写仲裁理由后继续');
      }
    }
  },
  comments: {
    Erro
  }
}
</script>

<style scoped>
.body {
  margin: 60px 0 56px 0;
  background-color: rgba(0,0,0,.01);
}
.content {
  margin: 0;
}
.footer {
  margin: 0;
  font-size: 14px;
  color: rgba(0,0,0,.6);
}
.footer > span {
  font-weight: 100;
}
.title {
  margin: 6px 0;
}
.title-time {
  font-size: 12px;
  font-weight: lighter;
  margin: 0 10px;
}
.desc {
  font-weight: 300;
  margin: 6px 0; 
}
.type {
  font-weight: 400;
  margin: 6px 0;
}
.limits {
  font-weight: 500;
  margin: 6px 0;
}
.no-title {
  box-sizing: border-box;
  margin: 0;
  font-size: 20px;
  padding: 6px;
}
.item {
  position: relative;
  width: 96%;
  left: 2%;
  border-radius: 5px;
  box-shadow: 0px 0px 1px 1px #a3a8ad;
  background-color: #1E88E5;
  color: #fff;
  margin-bottom: 10px;
  text-align: center;
}
</style>
