<template>
  <div class="timer-container">
    <p class="title">距离任务结束还剩</p>
    <p class="content">{{timeFormat}}</p>
  </div>
</template>
<script>
// 倒计时组件
export default {
  name: 'Timer',
  data() {
    return {
      timeFormat: '',
      flag: false
    }
  },
  props: ['time', 'timeOffset'],
  methods: {
    getTimer() {
      let secLeft = Number.parseInt((new Date(this.time).getTime() + this.timeOffset * 3600000 - Date.now())/1000); // 获取还剩余的时间 s
      let hour = this.format(Number.parseInt(secLeft/(3600)%24));
      let min = this.format(Number.parseInt(secLeft/60%60));
      let sec = this.format(Number.parseInt(secLeft%60));
      if(secLeft <= 0) {
        this.flag = true;
        this.timeFormat = '任务已截止';
      }else {
        this.timeFormat = `${hour}小时${min}分${sec}秒`;
      }
    },
    format(time) {
      if(time >=10) {
        return time;
      }else {
        return `0${time}`
      }
    }
  },
  mounted () {
    let timer = setInterval(() => {
      if(this.flag === true) {
        clearInterval(timer)
      }
      this.getTimer();
    }, 1000)
  }
}
</script>

<style scoped>

.timer-container {
  width: 100%;
  height: 3rem;
  background-color: #4b0;
  color: #fff;
}

.title {
  width: 100%;
  text-align: center;
  padding-top: .6rem;
  margin: 0;
  font-size: 24px;
  font-weight: lighter;
}
.content {
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

</style>
