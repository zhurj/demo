<template>
  <div>
<div class="box" v-if="status==='END'">
  <img :src="winnerData.photo" >
  <div class="whiteShade">
    <img :src="winnerData.headUrl" class="header">
    <div class="hostInfo">
      <p>{{ winnerData.nickName }}</p>
      <p>ID:{{ winnerData.uid }}</p>
      <p>{{ winnerData.voteCount }}&nbsp;票</p>
    </div>
  </div>
  <img v-lazy="images.success" class="successLogo">
</div>
  <div class="logo">
    <img :src="images.a8Logo">
  </div>
  </div>
</template>

<script>
  import {cpost} from '../../config/mUtils'
  import a8Logo from '../../assets/a8Logo.png'
  import success from '../../assets/success.png'

  export default {
    data() {
      return {
        status: 'VOTE',
        images: {
          a8Logo,
          success
        },
        winnerData: {
          photo: '',
          headUrl: ''
        }
      }
    },
    components: {},
    mounted() {
      let t = this;
      let cData = {
        url: "info",
        postData: {
          "uid": uId
        },
        callback: res => {
          t.winnerData = res.data.winner;
          t.status = res.data.status;
        }
      };
      cpost(this, cData);
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      display: block;
    }
    .successLogo {
      height: 4rem;
      width: 5.8rem;
      position: absolute;
      bottom: -.8rem;
      right: .2rem;
    }
    .whiteShade {
      height: 3.6rem;
      width: 100%;
      background: rgba(255, 255, 255, .3);
      position: absolute;
      bottom: 0;
      left: 0;
      .header {
        height: 2.4rem;
        width: 2.4rem;
        position: absolute;
        left: 1rem;
        bottom: 0.6rem;
        border-radius: 50%;
      }
      .hostInfo {
        height: 3rem;
        position: absolute;
        bottom: 0.3rem;
        left: 3.8rem;
        p {
          color: black;
          font-size: 16px;
          font-weight: 800;
        }
      }
    }
  }

  .logo {
    width: 100%;
    padding-bottom: 2rem;
    background: white;
    img {
      width: 70%;
      margin-top: 1rem;
      margin-left: 15%;
    }
  }
</style>
