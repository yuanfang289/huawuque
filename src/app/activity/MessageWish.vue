<template>
  <page-wrap class="page-user-center"   :hasDownloadBar="false">
    <title v-title>{{title}}</title>

    <!--<page-header>-->
      <!--<topbar :type="'back'" :hideShareBtn="true">-->
        <!--<template slot="title">{{title}}</template>-->
      <!--</topbar>-->
    <!--</page-header>-->

    <page-main :show="show">
      <div class="ticket">
        <div>
        <img src="https://assets.urwork.cn/image/activity/wish2.jpg?x-oss-process=image/quality,q_90/format,jpeg"/>
        </div>
      </div>
      <!--<div class="ticket">-->
        <!--<div class="top">-->
          <!--<img src="https://assets.urwork.cn/image/activity/wish-top.png"/>-->
        <!--</div>-->
        <!--&lt;!&ndash;<img src="https://assets.urwork.cn/image/member/yanzhao-zt.png">&ndash;&gt;-->
        <!--<div class="kong">-->

        <!--</div>-->
        <!--<div class="content">-->
          <!--&lt;!&ndash;<div class="bg">&ndash;&gt;-->
            <!--<img src="https://assets.urwork.cn/image/activity/con-top1.png">-->
            <!--<div class="txt">-->
              <!--<h2>倾其所有 永不停歇 只为成就最优秀的彼此</h2>-->
              <!--<div class="p">-->
                <!--<p style="text-align: right">——致优客工场会员的一封信</p><br>-->
                <!--<p style="text-indent: 0em;">尊敬的优客工场会员：</p><br>-->
                <!--<p>44座城市，223个社区，签约总面积近67万平方米——在2018年即将结束时，优客工场交出了这样一份成绩单。</p><br>-->
                <!--<p>在此，优客工场董事长毛大庆，总裁孙霞，助理总裁雷雪山诚挚地感谢您，因为您的加入，让我们有了改善办公环境、搭建商业平台的信心和勇气，有了急速扩张的动力，然后才有了这份成绩单。</p><br>-->
                <!--<p>绝大多数时候，人们只看到了从量变到质变的荣耀时刻，却忽略了漫长的量变累积和我们为此倾其所有的无数个瞬间。新年的脚步声越来越近，我们的感恩之心炙热且澎湃，能够与您一道见证会员成长，并携手同行，与有荣焉。</p><br>-->
                <!--<p>2015年4月，优客工场开始了这段空间更新的美好事业。每个人都在为社区贡献着智慧与力量，这正是共享的精髓所在。我们意图激发出因为合作而产生的溢出价值，并再度与您分享，如此往复，生生不息。</p><br>-->
                <!--<p>一直以来，优客工场对于互联网精神、扁平化架构、商业社群以及消费场景升级推崇备至，我们的空间产品（共享办公）、互联网产品（优鲜集App）、管理输出产品（楼宇托管）、会员产品在此引领下磨杵成针、精雕细琢。</p><br>-->
                <!--<p>2018年年末，优客工场隆重推出了盛大的会员日活动，每个会员日，我们严选最优质的美好生活商品，并通过优客工场强大的平台议价体系，惠及尊贵的会员。</p><br>-->
                <!--<p>优客工场之所以成为今天的样子，不是因为我们有多厉害。我们所有的努力只是源于一个美好梦想的分内之事，如果没有您的存在，一切的努力都将是徒劳而苍白的。</p><br>-->
                <!--<p>每一个时代中，最值得尊敬的永远是那些不惧风雨、不畏艰难、一路前行的创业者，是那些始终拥有创新精神的梦想家。</p><br>-->
                <!--<p>改革开放40年间，是中华民族数千年历史中群星闪耀的大时代。在大众创业，万众创新的国家战略引导下，优客工场能够成为您的第一选择，激励着我们对于办公场景的升级与完善。在这里，协作与创新是一切价值的根源，我们一直致力于此，并依此设计空间的多维场景：商务洽谈，休闲会晤，集团会议，团队建设，社群凝聚……都是我们持续追求更加精彩用户体验过程中的重要拼图。</p><br>-->
                <!--<p>过去的一年，您见证了优客工场的成长，我们也见证着每一天在办公桌聚精会神、在会议室运筹帷幄、在咖啡厅开拓人脉、在共享厨房谈笑风生的您。我们相信，正是因为对现状的不满和对未来的期许，塑造了每一天都更加优秀的您。</p><br>-->
                <!--<p>真正永续的价值一定来源于彼此的信任与协作，为了让平行世界的人们能够相互遇见，温暖彼此，成就彼此，2019年，优客工场的升级与迭代仍将一如既往，并迫切期待得到您的意见反馈。您的意见对我们无比重要。将您的反馈发送至maodq@ucommune.com，我们的团队将珍视每一封邮件，并一一作答。</p><br>-->
                <!--<p>请相信，优客工场成长过程中的每一次进步，都与您有关。</p><br>-->
                <!--<p>新年即将来临，回首过往，我们的热情仍在升温，展望未来，我们将用共享的力量创造更多价值，在路上，与您一道，共同开拓世界的未知边界。</p><br>-->
                <!--<p>很荣幸，优客工场可以为您和像您一样优秀的创想者提供最优质的服务。</p><br>-->
                <!--<p>生活明朗，万物可爱。</p><br>-->
                <!--<p>谢谢您，明年见。</p><br>-->
                <!--<p>新年快乐！</p><br>-->
                <!--<p style="text-align: right">优客工场 毛大庆 孙霞 雷雪山</p><br>-->
              <!--</div>-->
            <!--</div>-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</div>-->
        <!--<div class="footer">-->
          <!--<img src="https://assets.urwork.cn/image/activity/wish-bot.png"/>-->
        <!--</div>-->
      <!--</div>-->
    </page-main>
  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import QrcodeVue from 'qrcode.vue';
  import apiGetTicketCode from 'api/user/apiGetTicketCode';
  import apiTicket from 'api/user/apiTicket';
  export default {
    components: {
      QrcodeVue
    },
    data: () => {
      return {
        show: false,
        title: '2019新年寄语',
        code:'1'
      }
    },
    methods:{

    },
    created() {
      this.show = true;
    },
    mounted() {
       //download-bar
//      if(document.getElementsByClassName("download-bar")){
//        var box=document.getElementsByClassName("download-bar")[0];
//        box.parentNode.removeChild(box);
//      }
    }
  }
</script>

<style lang="scss" scoped="">
  /deep/ .download-bar{
    display: none;
  }
  .kong{
    width: 100vw;
    height: 130px;
  }
  .top{
    position: absolute;
    top: 0;
    z-index: 9;
    width: 100%;
  }
  .footer{
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  #main{
    .ticket{
      text-align: center;
      position: relative;
      width: 100vw;
      /*height: 100vh;*/
      /*background: url("https://assets.urwork.cn/image/activity/wish-bg.jpg") repeat;*/
      /*background-size: 100%;*/
      /*>img{*/
        /*display: inline-block;*/
      /*}*/
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
     .content{
       width: 89.333vw;
       height: 100vh;
       overflow: hidden;

       background: url("https://assets.urwork.cn/image/activity/con-bg.png") repeat;
       background-size:100%;
       background-color: #ffe2b9;

       color: #7b5832;
       position: relative;
       >img{
         padding: 3vw 0 0 0;
         background-color: #ffe2b7;
       }
         .txt{
           height: 100%;
           margin-top:-30px;
           padding-top: 15px;
           overflow: scroll;
           -webkit-overflow-scrolling: touch;
           h2{
             width: 100%;
             /*position: absolute;*/
             /*top: 40px;*/
             font-size: 17px;
             text-align: center;
             font-weight:700;
           }
           .p{
             text-align: left;
             padding: 20px 30px 150px 30px;
             line-height: 23px;
             font-size: 15px;
             p{
               text-indent: 2em;
               letter-spacing:1px;
               &:nth-of-type(1){
                 text-indent: 0;
               }
             }
           }
         }
     }
    }
  }
</style>



