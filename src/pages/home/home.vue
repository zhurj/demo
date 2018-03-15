<template>
  <div class="box">
  <div id="home">
      <div class="header">
        <img  v-lazy="images.header">
        <timeBox></timeBox>
      </div>
  </div>
  <img class="qqBox" :src="images.qq">
    <ruleContent :type=1></ruleContent>
  </div>
</template>

<script>
  import {cpost} from '../../config/mUtils'
  import ruleContent from '../../components/rule'
  import timeBox from '../../components/timeBox'
  import alertTip from '../../components/alertTip'
  import header from '../../assets/post-header.png'
  import tip from '../../assets/post-tip1.png'
  import qq from '../../assets/QQ.png'

  export default {
    name: 'home',
    data() {
      return {
        images: {          //图片
          header: header,
          tip: tip,
          qq: qq,
          showFlag:false
        }
      }
    },
    components: {
      ruleContent, timeBox
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
          if(res.data.status==='VOTE'){
            t.$router.push({path:'/vote',replace:true})
          }else if(res.data.status==='END'){
            t.$router.push({path:'/winner',replace:true})
          }else{
            console.log('home');
          }
        }
      };
      cpost(t, cData);
    }
  }
</script>

<style lang="scss" >
  @-webkit-keyframes scaleStyle {
    from {
      transform: scale(1);
      -webkit-transform: scale(1)
    }
    50% {
      transform: scale(0.95);
      -webkit-transform: scale(0.95)
    }
    to {
      transform: scale(1);
      -webkit-transform: scale(1)
    }
  }

  .box {
    background: rgb(11, 9, 25);
    font-family: '微软雅黑';
  }

  #home {
    width: 100%;
    position: relative;
    .header img {
      width: 100%;
    }
  }

  .qqBox {
    width: 90%;
    margin-top: 0.7rem;
    margin-left: 5%;
    -webkit-animation: scaleStyle 1s infinite ease-in-out;
    animation: scaleStyle 1s infinite ease-in-out;
  }
</style>
