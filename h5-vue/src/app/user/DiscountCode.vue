<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div class="ticket">
        <img v-if="code == 1" src="./img/membership/shijinglong.png">
        <img v-else="" src="./img/membership/songhuahu.png">
        <div class="cont">
          <div class="code">
            <div class="img">
              <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <p class="rights-code">会员权益码：
            <span id="code-url">{{rightsCode}}</span>
            <span class="copy-code" @click="copyCode()">复制</span>
          </p>
          <p class="tip">购票时请出示二维码</p>
        </div>
        <div v-if="code == 1" class="explain">
          <h3>滑雪场设施</h3>
          <ul>
            <li>滑雪面积：20公顷</li>
            <li>缆车：2条</li>
            <li>垂直落差：305米</li>
            <li>雪道数：10</li>
            <li>雪道长度：4.6公里</li>
            <li>最高海拔：830+</li>
            <li>运力：每小时2,000人</li>
          </ul>
        </div>
        <div v-if="this.rightsCode" class="received">

        </div>
      </div>
      <div v-if="code == 1" class="blue">
          <div class="conte">
              <h3>班车信息</h3>
              <p>每周三、周六、周日及法定节假日</p>
              <div class="time">
                <div class="lef">
                    <p><i class="time-icon"></i>上午8:30</p>
                    <span>出发时间</span>
                </div>
                <div class="mid">
                  ／
                </div>
                <div class="rig">
                  <p><i class="time-icon"></i>下午4:00</p>
                  <span>返程时间</span>
                </div>
              </div>
              <div class="address">
                <p><i class="address-icon"></i>北京惠新西街南口地铁站C口</p>
                <span>发车地点</span>
              </div>
              <div class="phone-num">
                <p><i class="phone-icon"></i>010-69191615／010-69191615</p>
                <span>咨询、预约电话(乘车需预约）</span>
              </div>
          </div>
      </div>
      <div v-if="code==2" class="white">
        <h4>权益说明</h4>
        <!--<h5><span></span>-->
          <!--王子酒店(园景/山景高级房)-->
        <!--</h5>-->
        <!--<p>-->
          <!--1. 平日享前台价7.5折；<br>-->
          <!--2. 周末享前台价钱8折；<br>-->
          <!--3. 节假日享前台价9折优惠。-->
        <!--</p>-->
        <!--<h5><span></span>-->
          <!--青山客栈标准间-->
        <!--</h5>-->
        <!--<p>-->
          <!--1. 平日享前台价7.5折；<br>-->
          <!--2. 周末享前台价钱8折；<br>-->
          <!--3. 节假日享前台价9折优惠。-->
        <!--</p>-->
        <!--<p class="spl">-->
          <!--备注：周四至周日为平日；周五、周六为周末；节假-->
          <!--日为元旦和春节(12月30日-12月31日和2019年2月5日-->
          <!-- -2月9日)-->
        <!--</p>-->
        <h5><span></span>
          成人全天索道票(又称滑雪票)
        </h5>
        <p>
          1. 初雪期和春雪期(11月9日-12月1日)享前台价5折；<br>
          2. 冬雪期(12月2日-12月14日和2019年2月25日-3月
          3日)平日享前台5折，周末享前台价6折；<br>
          3. 冬雪旺期(12月15日-2019年2月24日)平日享前台
          价6折， 周末及节假日享前台价7折。
        </p>
        <p class="spl">
          备注：周一至周五为平日；周六、周日为周末；节假
          日为元旦和春节(12月30日-1月1日和2019年2月4日-
          2月10日)
        </p>
        <img src="./img/membership/footer-bg.png">
      </div>
      <div v-if="code==1" class="white">
        <h4>权益说明</h4>
        <h5><span></span>
          石京龙滑雪场散客权益
        </h5>
        <p>
          1、平日滑雪票（4小时）：90元/人（门市价：220元/人）<br>
          2、平日滑雪票（全天）：120元/人（门市价：260元/人）<br>
          3、平日滑雪票（4小时）+雪服+风镜+柜子：170元/人（门市价：300元/人）<br>
          4、平日滑雪票（全天）+雪服+风镜+柜子：200元/人（门市价：340元/人）<br>
          5、周末滑雪票（4小时）：140元/人（门市价：280元/人）<br>
          6、周末滑雪票（全天）：210元/人（门市价：380元/人）<br>
          7、周末滑雪票（4小时）+雪服+风镜+柜子：220元/人（门市价：360元/人）<br>
          8、周末滑雪票（全天）全天雪服+风镜+柜子：290元/人（门市价：460元/人）
        </p>
        <p class="spl">
          备注：包含雪板，雪鞋，雪杖，头盔，魔毯，缆车。
        </p>
        <h5><span></span>
          石京龙滑雪场团队VIP权益
        </h5>
        <p>
          1、平日滑雪票（4小时）：218元/人（门市价：380元/人）<br>
          2、平日滑雪票（全天）：248元/人（门市价：420元/人）<br>
          3、周末滑雪票（4小时）：268元/人（门市价：440元/人）<br>
          4、周末滑雪票（全天）：338元/人（门市价：540元/人）
        </p>
        <p class="spl">
          备注：包含雪板，雪鞋，雪杖，头盔，魔毯，缆车，雪服，风镜，VIP柜子。
        </p>
        <h5><span></span>
          刺猬乐园专属权益
        </h5>
        <p>
          1、娱乐套票A：85元/张（门市价：128元/张）
        </p>
        <p class="spl">
          备注：包含雪地摩托车、雪圈冲浪、雪地转转、火线穿越、萌宠乐园拍照。
        </p>
        <p>
          2、娱乐套票B：160元/张（门市价：218元/张）
        </p>
        <p class="spl">
          备注：包含极速摩托车、雪圈冲浪、雪地转转、大马拉爬犁、雪绵羊拉车。
        </p>
        <h5><span></span>
          其他专享权益
        </h5>
        <p>
          1、雪具大厅VIP接待区，熊猫雪人滑雪学校所有产品8.5折优惠；<br>
          2、滑雪教练，按照“班式”的收取方式，收取私人到团队的优惠价格。
        </p>
        <img src="./img/membership/footer-bg.png">
      </div>
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
        title: '万科滑雪场优惠码',
        value: 'https://m.urwork.cn',
        size: 160,
        rightsCode:false,
        code:'1'
      }
    },
    methods:{
      copyCode2() {
          let _this = this;
        this.$copyText(this.rightsCode).then(function (e) {
          _this.$toast('复制成功');
        }, function (e) {
          _this.$toast('复制失败');
        })
      },
      copyCode() {
          /*两种方法在电脑上都ok  手机端要区别*/
          var successful = ''
          if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {//区分iPhone设备
            window.getSelection().removeAllRanges();//这段代码必须放在前面否则无效
            var Url2=document.getElementById("code-url");//要复制文字的节点
            var range = document.createRange();
            // 选中需要复制的节点
            range.selectNode(Url2);
            // 执行选中元素
            window.getSelection().addRange(range);
            // 执行 copy 操作
             successful = document.execCommand('copy');
            // 移除选中的元素
            window.getSelection().removeAllRanges();
          }else{//安卓
            var Url2=document.getElementById("code-url").innerText;
            var oInput = document.createElement('input');
            oInput.value = Url2;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
            successful = document.execCommand("Copy");// 执行浏览器复制命令
            oInput.className = 'oInput';
            oInput.style.display='none';
          }
          const text = successful ? '复制成功' : '复制失败';
          this.$toast(text);
        },
      getinfo() {
        apiGetTicketCode({
          "userId":this.$store.state.userInfo.userId,
          "couponType":this.$route.query.code
        }).then(res => {
          console.log(res,'11111111');
          this.rightsCode = res.ticketCode;
          this.show = true;
        })
      },
      received() {
        apiTicket({
          "couponType":this.$route.query.code,
        }).then(res => {
          this.getinfo();
        })
      }
    },
    created() {
      isLogin({
        success: () => {
          this.$route.query.first == '0' ?  this.$toast('领取成功'): ''
          this.getinfo();
          this.value = "https://m.urwork.cn/v2/membership/confirm?userId="+this.$store.state.userInfo.userId
        },
        fail: () => {
          if(this.isApp) {
            toLogin();
          }else{
            window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl='+location.href;
          }
        }
      })
    },
    mounted() {
        this.code = this.$route.query.code;
    }
  }
</script>

<style lang="scss" scoped="">
  #main{
    .ticket{
      text-align: center;
      position: relative;
      >img{
        display: inline-block;
      }
      .cont{
        width: 100%;
        position: absolute;
        top: 5.51rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        .code{
          width: 100%;
          height: 100%;
          margin: 0 auto;
          padding: 15px;
          display: flex;
          justify-content: center;
          .img{
            width: 176px;
            height: 176px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            span{
              width: 14px;
              height: 14px;
              border: 2px solid #FFCD00;
              &:nth-of-type(1){
                position: absolute;
                top: 0;
                left: 0;
                border-right: none;
                border-bottom: none;
              }
              &:nth-of-type(2){
                position: absolute;
                top: 0;
                right: 0;
                border-left: none;
                border-bottom: none;
              }
              &:nth-of-type(3){
                position: absolute;
                bottom: 0;
                right: 0;
                border-left: none;
                border-top: none;
              }
              &:nth-of-type(4){
                position: absolute;
                bottom: 0;
                left: 0;
                border-right: none;
                border-top: none;
              }
            }
            div{
              margin-top: 5px;
            }
          }
        }
        .rights-code{
          font-size: 14px;
          text-align: center;
          padding-bottom: 11px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
          .copy-code{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFBE00;
            letter-spacing: 0;
            text-align: center;
            text-decoration-line: underline;
            margin-left: 5px;
          }
        }
        .tip{
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #999999;
          letter-spacing: 0;
          text-align: center;
        }
      }
      .explain{
        width: 6.7rem;
        height: 3.84rem;
        background: #FFFFFF;
        border-radius: 20px 20px 0 0;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -3.35rem;
        text-align: left;
        padding: 15px;
        h3{
          font-family: PingFangSC-Medium;
          font-size: 0.36rem;
          color: #333333;
          letter-spacing: 0;
        }
        ul{
          li{
            width: 50%;
            font-family: PingFangSC-Regular;
            font-size: 0.24rem;
            color: #151515;
            letter-spacing: 0;
            margin-top: 0.3rem;
            position: relative;
            padding-left: 10px;
            &:nth-of-type(even){
              float: right;
            }
            &:nth-of-type(odd){
              float: left;
            }
            &::before{
              display: inline-block;
              content:"";
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background: #FFCD00;
              margin-top: -5px;
              margin-right: 5px;
              position: absolute;
              left: 0;
              top: 12px;
            }
          }
        }
      }
      .received{
        position: absolute;
        top: 8.8rem;
        right: 0;
        width: 70px;
        height: 85px;
        background: url("./img/membership/received.png") no-repeat center;
        background-size: 100%;
      }
    }
    .blue{
      width: 100%;
      height: 295px;
      background: #598BE7;
      display: flex;
      justify-content: center;
      .conte{
        display: inline-block;
        width: 6.7rem;
        height: 100%;
        background: #4F80E5;
        color: #ffffff;
        padding: 25px 15px;
        >h3{
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #FFFFFF;
          letter-spacing: 0;
        }
        p{
          position: relative;
          padding-left: 20px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #FFFFFF;
          letter-spacing: 0;
          i{
            width: 15px;
            height: 15px;
            display: inline-block;
            margin-right: 5px;
            position: absolute;
            top: 2px;
            left: 0;
          }
        }
        >p{
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #FFFFFF;
          letter-spacing: 0;
          padding-left: 0;
        }
        >div{
          padding: 15px 0;
          border-bottom: 1px solid #5F90E6;
          &:last-child{
            border: none;
          }
          span{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #FFFFFF;
            letter-spacing: 0;
          }
        }
        .time{
          display: flex;
          /*align-items: center;*/
          /*justify-content: space-between;*/
          .mid{
            margin: 0 1rem;
            display: flex;
            align-items: center;
          }
          span{
            padding-left: 20px;
          }
          .time-icon{
            background: url("./img/membership/time-icon.png") no-repeat center;
            background-size: cover;
          }
        }
        .address{
          .address-icon{
            background: url("./img/membership/address-icon.png") no-repeat center;
            background-size: cover;
          }
          span{
            padding-left: 20px;
          }
        }
        .phone-num{
          .phone-icon{
            background: url("./img/membership/phone-icon.png") no-repeat center;
            background-size: cover;
          }
          span{
            padding-left: 20px;
          }
        }
      }
    }
    .white{
      padding:20px 0 0 0;
      background: url("./img/membership/footer-bg.png") no-repeat bottom;
      background-size: 100%;
      >img{
        height: 1.8rem;
        opacity: 0;
      }
      h4{
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #333333;
        letter-spacing: 0;
        margin-bottom: 15px;
        padding:0 35px;
      }
      h5{
        font-family: PingFangSC-Medium;
        font-size: 13px;
        color: #333333;
        letter-spacing: 0;
        position: relative;
        padding-left: 9px;
        margin:0 35px 5px 35px;
        span{
          position: absolute;
          top: 5px;
          left: 0px;
          width: 4px;
          height: 4px;
          display: inline-block;
          border-radius: 50%;
          background: #FFCD00;
        }
      }
      >p{
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #666666;
        letter-spacing: 0;
        line-height: 21px;
        margin-bottom: 10px;
        padding:0 45px;
        /*&:nth-of-type(1){*/
          /*margin-bottom: 25px;*/
        /*}*/
      }
      .spl{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
</style>
