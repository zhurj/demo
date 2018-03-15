<!--倒计时-->
<template>
    <div class="timeBox" :style="{'width':type===1?'50%':'36%','margin-left':type===1?'25%':'9%'}">
      <img v-lazy="type===2?images.tip:images.homeTime" class="timeTitle" :style="{'width':type===1?'50%':'70%','margin-left':type===1?'25%':'15%'}">
      <p class="showTime">{{ time }}</p>
    </div>
</template>
<script>
  import {cpost, getUid} from '../config/mUtils'
  import tip from '../assets/post-tip1.png'
  import homeTime from '../assets/homeTime.png'
  let TIMEFLAG;

  export default {
    data() {
      return {
        images: {
          tip: tip,
          homeTime:homeTime
        },
        time: '',
        timeGap:0    //服务器和本地时间的差距
      }
    },
    props: {
      'type': {
        default: 1
      }
    },
    mounted() {
      let t = this;
      //获取基础数据
      let cData = {
        url: "info",
        postData: {
          "uid": uId
        },
        callback: res => {
          t.timeGap=res.data.now-(new Date());
          if(res.data.status==='PRE'){
            t.countdown(res.data.voteStart,1);
            TIMEFLAG = setInterval(() => t.countdown(res.data.voteStart,1), 1000);
          }
          if(res.data.status==='VOTE'){
            t.countdown(res.data.voteEnd,2);
            TIMEFLAG = setInterval(() => t.countdown(res.data.voteEnd,2), 1000);
          }
        }
      };
      cpost(this, cData);
    },
    destroyed() {
      window.clearInterval(TIMEFLAG);
    },
    methods: {
      countdown(endTime,type) {
        let t = this;
        let leftTime = endTime - (new Date())+t.timeGap; //计算剩余的毫秒数
        if (leftTime <= 1000) {         //判断活动是否结束
          if(type===1){
            t.$router.push({path:'/vote'})
          }else{
            t.$router.push({path:'/winner'})
          }
          return;
        }
        let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10) + days * 24; //计算剩余的小时
        let minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
        let seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
        days = t.checkTime(days);
        hours = t.checkTime(hours);
        minutes = t.checkTime(minutes);
        seconds = t.checkTime(seconds);
        t.time = `${hours}:${minutes}:${seconds}`
      }
      ,
      checkTime(i) {        //在个位数时间前面加0
        if (i < 10 && i > -1) {
          i = '0' + i;
        }
        return i;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .timeBox{
    height: 2.6rem;
    width: 50%;
    margin-left: 25%;
    border:1px solid white;
    border-radius: 0.3rem;
    position: absolute;
    bottom: 0;
    left:0;
    z-index: 2;
    .timeTitle{
      width:50%;
      margin:0.3rem 25%;
    }
    .showTime{
      width: 100%;
      text-align: center;
      color:white;
      font-weight: bold;
      font-size: 0.8rem;
      margin-top: -0.5rem;
    }
  }
</style>
