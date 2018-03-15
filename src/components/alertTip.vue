 <template>
    <div class="alet_container">
	    <section class="tip_text_container">
        <img :src="selectHostData.headImg" class="headImg">
        <p class="name">{{ selectHostData.name }}</p>
        <p class="tips" v-if="alertType===2">是否为 <span>TA</span> 投上宝贵的一票</p>
        <p class="tips" v-if="alertType===1">{{ tip }}</p>
            <div class="confrim" @click="closeTip" v-if="alertType===1">确定</div>
            <div class="footBt" v-if="alertType===2">
              <div @click="closeTip">否</div>
              <div @click="submitVote">是</div>
            </div>
        </section>
    </div>
</template>

 <script>
   import {cpost} from '../config/mUtils'

   export default {
     data() {
       return {
         positionY: 0,
         timer: null,
         alertType: this.type,
         tip: "感谢你为我投上宝贵的一票"
       }
     },
     mounted() {

     },
     props: {
       type: {
         default: 1
       },
       selectHostData: {
         default: {
           name: '',
           id: '',
           headImg: ''
         }
       }
     },
     methods: {
       closeTip() {
         this.$emit('closeTip')
       },
       submitVote() {      //投票请求
         let t = this;
         let cData = {
           url: "vote",
           postData: {
             "uid": uId,
             "data": {
               'tuid': t.selectHostData.id
             }
           },
           callback: res => {
             t.alertType = 1;
             if (res.success === false) {
               t.tip = res.desc;
               return;
             }
             if (t.$parent.remainingVotes > 0) {
               t.$parent.remainingVotes--;    //投票成功后可使用票数减1
             }
             t.$parent.useVotes++;           //使用成功票数加1
             t.$parent.rankArr[t.selectHostData.index].voteCount++;   //该主播票数+1
             if (res.data != null) {
               t.$parent.marqueeArr = [res.data.msg].concat(t.$parent.marqueeArr);    //将投票成功的数据更新到跑马灯
             }
             t.$emit('update');
             t.$emit('refresh');
           }
         };
         cpost(t, cData);
       }
     }
   }
 </script>

 <style lang="scss" scoped>
   //宽高
   @mixin wh($width, $height) {
     width: $width;
     height: $height;
   }

   //字体大小，颜色
   @mixin sc($size, $color) {
     font-size: $size;
     color: $color;
   }

   @keyframes tipMove {
     0% {
       transform: scale(1)
     }
     35% {
       transform: scale(.8)
     }
     70% {
       transform: scale(1.1)
     }
     100% {
       transform: scale(1)
     }
   }

   .alet_container {
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     z-index: 200;
   }

   .tip_text_container {
     position: absolute;
     top: 50%;
     left: 50%;
     margin-top: -6rem;
     margin-left: -6rem;
     width: 12rem;
     height: 8rem;
     animation: tipMove .4s;
     background-color: rgba(255, 255, 255, 1);
     border: 1px;
     padding-top: .6rem;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     border: 1px;
     border-radius: 0.25rem;
     .headImg {
       height: 4rem;
       width: 4rem;
       border-radius: 50%;
       border: 2px solid white;
       position: absolute;
       top: -2rem;
     }
     .name {
       font-size: 14px;
       font-weight: bold;
       color: black;
       margin-top: 1.9rem;
     }
     .tips {
       font-size: 14px;
       color: black;
       margin-top: 0.5rem;
       span {
         font-size: 20px;
         color: rgb(245, 179, 1);
       }
     }
     .tip_icon {
       @include wh(3rem, 3rem);
       border: 0.15rem solid #f8cb86;
       border-radius: 50%;
       display: flex;
       justify-content: center;
       align-items: center;
       flex-direction: column;
       span:nth-of-type(1) {
         @include wh(.12rem, 1.5rem);
         background-color: #f8cb86;
       }
       span:nth-of-type(2) {
         @include wh(.2rem, .2rem);
         border: 1px;
         border-radius: 50%;
         margin-top: .2rem;
         background-color: #f8cb86;
       }
     }
     .tip_text {
       @include sc(.7rem, #333);
       line-height: .9rem;
       text-align: center;
       margin-top: .8rem;
       padding: 0 .4rem;
     }
     .confrim {
       @include sc(14px, black);
       font-weight: bold;
       margin-top: .8rem;
       background-color: rgb(245, 179, 1);
       width: 94%;
       text-align: center;
       line-height: 1.6rem;
       border: 1px;
       border-radius: 0.2rem;
     }
     .footBt {
       font-size: 14px;
       font-weight: 900;
       padding-top: 0.8rem;
       width: 100%;
       text-align: center;
       line-height: 1.8rem;
       border: 1px;
       display: flex;
       padding-left: 0.3rem;
       padding-right: 0.3rem;
       div {
         flex: 1;
         border-radius: 4px;
         color: black;
         &:first-child {
           background-color: rgb(238, 238, 238);
           color: gray;
         }
         &:nth-child(2) {
           background: rgb(245, 179, 1);
           margin-left: 10px;
         }
       }
     }
   }

</style>
