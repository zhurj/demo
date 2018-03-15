<template>
    <div class="watchImgBox" :style="{'height':h}">
       <div class="imgBox"  @click="close">
         <img :src="url" id="img">
         <div class="confirmBt" @click="close">确定</div>
       </div>
    </div>
</template>
<script>
  import tip from '../assets/post-tip1.png'

  export default {
    data() {
      return {
        url: this.watchImgUrl,
        h: document.body.clientHeight + 'px',
        imgHeight:'450px'
      }
    },
    props: {
      'watchImgUrl': {
        default: ''
      }
    },
    methods: {
      close() {
        let t = this;
        t.$parent.watchImgShow = false;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .watchImgBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
    overflow: auto;
    .imgBox {
      width: 86%;
      background: rgb(245, 179, 1);
      position: absolute;
      margin-left: 7%;
      margin-bottom: 5rem;
      margin-top:1rem;
      z-index: 11;
      border-radius: 6px;
      border: 1px solid rgb(87, 39, 28);
      box-shadow: 0 0 0px 3px rgb(245, 179, 1);
      img {
        width: 94%;
        margin-left: 3%;
        margin-top: .3rem;
      }
      .confirmBt {
        height: 1.8rem;
        width: 94%;
        margin-left: 3%;
        margin-bottom: 0.3rem;
        background: white;
        border-radius: 4px;
        text-align: center;
        line-height: 1.8rem;
        font-size: 12px;
        font-weight: bold;
        color: rgb(87, 39, 28);
      }
    }
  }
</style>
