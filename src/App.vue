<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {cpost} from './config/mUtils'
export default {
  name: 'App',
  data(){
    return{

    }
  },
  methods:{
    initInfo(){
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
            t.$router.push({path:'/home',replace:true})
          }
        }
      };
      cpost(t, cData);
    }
  },
  created () {
    window.getIOSIdCallBack = (key) => {
      uId = key;
      this.initInfo()
    }
    if (typeof A8Show !== 'undefined') {
      // eslint-disable-next-line
      uId = A8Show.getLoveShowId()
      this.initInfo()
    } else if (typeof Activity !== 'undefined') {
      // eslint-disable-next-line
      uId = Activity.getLoveShowId()
      this.initInfo()
    } else if (typeof window.webkit !== 'undefined') {
      // eslint-disable-next-line
      window.webkit.messageHandlers.Client.postMessage({
        method: 'GetLoveShowId',
        callback: 'getIOSIdCallBack',
        params: {}
      })
    } else {
      this.initInfo()
    }
  }
}
</script>

<style lang="scss">
  @import './style/common';
  body{
    background: rgb(11,9,25);
  }
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
