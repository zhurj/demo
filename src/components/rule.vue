<!--活动规则-->
<template>
  <div id="ruleBox" >
    <img :src="images.rule" class="ruleTitle">
      <div class="return" @click="goBack" v-if="type===2">返回</div>
    <div class="ruleContent">
      本次活动分3个阶段:征集——评选——获奖公示<br/>
      评选结束后,官方将用主播照片作为启动页封面展示<br/>
      1.照片征集:3月12日18:00-3月15日18:00<br/>
      主播提供个人生活照或艺术照报名的形式参与本次活动；<br/>
      请将拍好的个人照片或艺术照发送给官方工作人员；<br/>
      ※官方工作人员会从征集到的照片中首轮筛选出10个优质照片,入选的主播即可参与本次征集票选活动。<br/>
      作品要求：<br/>
      1.以年轻、体育风格为主题拍摄一张你认为可以用作封面的个人生活照或艺术照,风格不限<br/>
      2.画质要求清晰不模糊。<br/>
      3.图片中不可包含任何形式水印。<br/>
      4.提交图片文件要求:png、jpg<br/>
      ※您的个人照片也许会成为持续获得粉丝关注的源泉哦。<br/>
      <br/>
      2.票选评选:3月15日18:00-3月19日14:00<br/>
      已入选的10名主播将随机排名,活动主页会展示每位主播的照片以供大家观看投票,并且可连接至主播的个人空间及直播间<br/>
      投票方式:在活动页面找到自己喜爱的主播点击给TA投 ,每个用户每天可投票1次。<br/>
      <div class="ruleFooter">
        <p>活动最终解释权归A8体育所有，更多信息请关注A8体育 微信公众号A8_sports</p>
      </div>
    </div>
  </div>
</template>
<script >
  import rule from '../assets/post-ruleTip.jpg'
  export default{
    data(){
      return{
         images:{
           rule:rule
         },
        h: document.body.clientHeight + 'px'
      }
    },
    props:{
      type:{
        default:2
      }
    },
    methods:{
      goBack(){
        let t=this;
        t.$router.push({path:'/vote',replace:true});
      }
    }
  }
</script>
<style lang="scss" scoped>
  #ruleBox{
    background: rgb(11,9,25);
    .return{
      height: 1.5rem;
      width: 2.6rem;
      background: #f5b301;
      border:2px solid rgb(87,39,28);
      border-bottom-right-radius: 40%;
      border-top-right-radius: 40%;
      border-left:none;
      position: fixed;
      top:0.5rem;
      left: 0;
      color:rgb(87,39,28);
      font-size:14px;
      font-weight: bold;
      text-align: center;
      line-height: 1.4rem;
    }
    .ruleTitle{
      width: 24%;
      margin-top:0.5rem;
      margin-left:38%;
    }
    .ruleContent{
      width: 90%;
      margin-left:5%;
      margin-top:5%;
      font-size: 14px;
      color:white;
    }
    .ruleFooter{
      width: 70%;
      margin-left: 15%;
      margin-top:1rem;
      padding-bottom: 2rem;
      p{
        color:rgb(245,179,1);
        font-size: 12px;
        text-align: center;
      }
    }
  }
</style>
