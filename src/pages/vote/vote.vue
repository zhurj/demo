<template>
  <div id="home">
    <div id="scrollWrap">
      <ul id="scrollMsg">
        <li v-for="(item,index) in marqueeArr" :key="index">{{ item }}</li>
      </ul>
    </div>
      <div class="header">
        <img  v-lazy="images.header">
        <timeBox :type=2></timeBox>
        <div class="voteHostBox">
          <img v-lazy="images.voteHost">
          <p> 剩余票数&nbsp;&nbsp;&nbsp;{{ remainingVotes }}</p>
          <p> 使用票数&nbsp;&nbsp;&nbsp;{{ useVotes }}</p>
        </div>
        <router-link to="/rule">
          <img v-lazy="images.ruleLogo" class="ruleLogo">
        </router-link>
      </div>
    <div class="rankBox" :style="{'height':Math.round(rankArr.length/2)*12.5+'rem'}">
      <!--<div class="gap"></div>-->
      <ul>
        <li class="rankContent" v-for="(item,index) in rankArr" :key="index">
          <p class="hostVoteCount">NO.{{ index+1 }}&nbsp;&nbsp;{{ item.voteCount }}票</p>
          <div class="hostContent">
               <div class="headerImg">
                 <img v-lazy="item.headUrl" @click="toLiveRoomeOrHomePage(item)">
                 <img v-lazy="images.liveLogo" class="liveLogo" v-if="item.onLive">
               </div>
            <p class="hostName">{{ item.nickName }}</p>
            <p class="hostUid">ID:{{ item.uid }}</p>
            <div class="hostImg">
              <img v-lazy="item.photo" @click="watchImg(item.photo)">
            </div>
          </div>
           <div class="voteButton" @click="showAlert(item.nickName,item.uid,item.headUrl,index)">
             <img v-lazy="images.voteBt">
           </div>
        </li>
      </ul>
    </div>
    <div class="ruleFooter">
      <p>活动最终解释权归A8体育所有，更多信息请关注A8体育 微信公众号A8_sports</p>
    </div>
    <alertTip v-if="alertShow" :type=2 :selectHostData="selectHostData" @closeTip="closeTip" @update="update" @refresh="refresh"></alertTip>
    <watchImg v-if="watchImgShow" :watchImgUrl="watchImgUrl"></watchImg>
  </div>
</template>

<script>
  import {cpost} from '../../config/mUtils'
  import ruleContent from '../../components/rule'
  import timeBox from '../../components/timeBox'
  import alertTip from '../../components/alertTip'
  import watchImg from '../../components/watchImg'
  import header from '../../assets/post-header.png'
  import tip from '../../assets/post-tip1.png'
  import voteHost from '../../assets/vote-host.png'
  import liveLogo from  '../../assets/liveLogo.png'
  import voteBt from  '../../assets/vote-bt.png'
  import ruleLogo from  '../../assets/ruleLogo.png'
  import marqueeBg from  '../../assets/marqueeBg.png'
  let INIT,MARQUEE;

  export default {
    name: 'home',
    data() {
      return {
        images: {          //图片
          header: header,
          tip: tip,
          voteHost: voteHost,
          liveLogo: liveLogo,
          voteBt: voteBt,
          ruleLogo: ruleLogo
        },
        remainingVotes: 0,     //剩余票数
        useVotes: 0,            //使用票数
        rankArr: [],           //排名数据
        marqueeArr: [],          //跑马灯数据
        selectHostData: null,    //点击的主播的数据
        alertShow: false,        //是否展示弹窗
        watchImgUrl: '',          //查看大图的URL
        watchImgShow: false       //是否查看大图
      }
    },
    components: {
      ruleContent, timeBox, alertTip, watchImg
    },
    mounted() {
      let t = this;
      t.init();
      t.marqueeInit();
      INIT = setInterval(() => {     //1分钟刷新一次数据
        t.init();
      }, 60000)
    },
    destroyed() {
      window.clearInterval(INIT);
    },
    methods: {
      init() {                 //数据初始化
        let t = this;
        let cData = {
          url: "rank",
          postData: {
            "uid": uId
          },
          callback: res => {
            t.remainingVotes = res.data.voteInfo.remain;
            t.useVotes = res.data.voteInfo.used;
            t.rankArr = res.data.rank;
          }
        };
        cpost(t, cData);       //请求主播排名
      },
      marqueeInit() {           //跑马灯数据初始化，因为后期会自动刷新数据，为避免自动刷新数据影响跑马灯投票时的实时插入数据，所以将其单独抽出来初始化
        let t = this;
        let cData = {
          url: "marquee",
          postData: {
            "uid": uId
          },
          callback: res => {
            t.marqueeArr = res.data.marquee;
            window.clearInterval(MARQUEE);
            t.marquee();
          }
        };
        cpost(t, cData);       //请求跑马灯数据
      },
      refresh() {
        let t = this;
        t.init();
      },
      //进入主播房间
      toLiveRoomeOrHomePage(item) {
        if (item.rid) {
          if (typeof Activity !== 'undefined') {
            // eslint-disable-next-line
            Activity.goToAnchorRoom(item.rid)
          } else if (typeof window.webkit !== 'undefined') {
            // eslint-disable-next-line
            window.webkit.messageHandlers.Client.postMessage({
              method: 'goToAnchorRoom',
              callback: '',
              params: {
                rId: item.rid
              }
            })
          }
        } else {
          if (typeof A8Show !== 'undefined') {
            // eslint-disable-next-line
            A8Show.goToOtherPersonHomeWithTuid(item.uid)
          } else if (typeof Activity !== 'undefined') {
            // eslint-disable-next-line
            Activity.goToOtherPersonHomeWithTuid(item.uid)
          } else if (typeof window.webkit !== 'undefined') {
            window.webkit.messageHandlers.Client.postMessage({
              method: 'goToOtherPersonHome',
              callback: '',
              params: {
                uid: item.uid
              }
            })
          }
        }
      },
      //跑马灯
      marquee() {
        let isStoped = false;
        let oScroll = document.getElementById("scrollWrap");
        oScroll.onmouseover = new Function('isStoped = true');
        oScroll.onmouseout = new Function('isStoped = false');
        let preTop = 0;
        let curTop = 0;
        let stopTime = 0;
        let oScrollMsg = document.getElementById("scrollMsg");
        oScroll.appendChild(oScrollMsg.cloneNode(true));
        init_srolltext();

        function init_srolltext() {
          oScroll.scrollTop = 0;
          MARQUEE = setInterval(() => scrollUp(), 15);
        }

        function scrollUp() {
          if (isStoped)
            return;
          curTop += 1;
          if (curTop == 19) {
            stopTime += 1;
            curTop -= 1;
            if (stopTime == 180) {
              curTop = 0;
              stopTime = 0;
            }
          } else {
            preTop = oScroll.scrollTop;
            oScroll.scrollTop += 1;
            if (preTop == oScroll.scrollTop) {
              oScroll.scrollTop = 0;
              oScroll.scrollTop += 1;
            }
          }
        }
      },
      //投票成功后插入跑马灯
      update() {
        let t = this;
        window.clearInterval(MARQUEE);      //投票成功后清除旧的跑马灯定时器
        let oScroll = document.getElementById("scrollWrap");
        oScroll.scrollTop = 0;    //将跑马灯恢复到开头，新的信息插入在开头第一项
        setTimeout(() => {    //让新的信息显示2s后再接着开启跑马灯
          t.marquee();
        }, 2000);
      },
      //打开询问弹窗
      showAlert(name, id, headImg, index) {
        let t = this;
        t.alertShow = true;
        t.selectHostData = {
          name: name,
          id: id,
          headImg: headImg,
          index: index
        }
      },
      //关闭弹窗
      closeTip() {
        let t = this;
        t.alertShow = false;
      },
      //打开大图
      watchImg(url) {
        let t = this;
        t.watchImgUrl = url;
        t.watchImgShow = true;
        DS.ready(function () {
          DS.sendBtnName("主播个人照片的查看");
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  #home {
    width: 100%;
    height: 100%;
    background: #1b0b2e;
    font-family: '微软雅黑';
    .header {
      position: relative;
      .ruleLogo {
        height: 2rem;
        width: 2rem;
        position: absolute;
        bottom: 2.6rem;
        right: 0;
        z-index: 2;
      }
    }
    .header img {
      width: 100%;
    }
    .voteHostBox {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 50%;
      height: 2.6rem;
      text-align: center;

      img {
        width: 50%;
        margin-top: -0.3rem;
      }
      p {
        text-align: center;
        color: white;
        font-size: 12px;
        font-weight: bold;
      }
    }
    #scrollWrap {
      width: 90%;
      height: 18px;
      margin-left: 5%;
      overflow: hidden;
      background-image: url("../../assets/marqueeBg.png");
      position: fixed;
      top: 0.3rem;
      z-index: 2;
      li {
        height: 18px;
        line-height: 18px;
        overflow: hidden;
        font-size: 12px;
        padding: 0 10px;
        color: white;
        text-align: center;
      }
    }
    .rankBox {
      width: 100%;
      /*background:rgb(11,9,25);*/
      background: -webkit-linear-gradient(#1b0b2e .5%, #0b0919 99.5%, #0b0919, #0b0919);
      background: -o-linear-gradient(#1b0b2e .5%, #0b0919, #0b0919, #0b0919);
      background: -moz-linear-gradient(#1b0b2e .5%, #0b0919, #0b0919, #0b0919);
      background: linear-gradient(#1b0b2e .5%, #0b0919, #0b0919, #0b0919);
      padding-left: 0.8rem;
      padding-right: 0.8rem;
      .rankContent {
        float: left;
        height: auto;
        width: 50%;
        margin-top: 0.5rem;
        &:nth-child(odd) {
          padding-right: 0.25rem;
        }
        &:nth-child(even) {
          padding-left: 0.25rem;
        }
        .hostVoteCount {
          color: rgb(245, 179, 1);
          font-size: 14px;
          font-weight: bold;
        }
        .hostContent {
          width: 100%;
          border: 1px solid white;
          border-radius: 0.3rem;
          position: relative;
          .headerImg {
            height: 1.5rem;
            width: 1.5rem;
            margin-left: 0.3rem;
            margin-top: 0.2rem;
            position: relative;
            font-size: 14px;
            img:first-child {
              width: 1.5rem;
              height: 1.5rem;
              border-radius: 50%;
            }
            .liveLogo {
              width: 100%;
              position: absolute;
              bottom: 0;
            }
          }
          .hostName, .hostUid {
            color: white;
            font-size: 12px;
            position: absolute;
            top: 4px;
            left: 32%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 68%;
          }
          .hostUid {
            top: 20px;
          }
          .hostImg {
            height: 6.5rem;
            width: 96%;
            margin: 0.15rem 2%;
            margin-top: 0.2rem;
            background: #1b0b2e;
            img {
              height: 100%;
              width: 100%;
            }
          }
        }
        .voteButton {
          height: 1.6rem;
          width: 100%;
          border: 2px solid rgb(245, 179, 1);
          border-radius: 6%;
          margin-top: 0.5rem;
          text-align: center;
          line-height: 1.6rem;
          img {
            width: 50%;
          }
        }
      }

    }
    .ruleFooter {
      width: 100%;
      padding-left: 15%;
      padding-right: 15%;
      padding-bottom: 2rem;
      background: #0b0919;
      p {
        color: rgb(245, 179, 1);
        font-size: 12px;
        text-align: center;
      }
    }
  }
</style>
