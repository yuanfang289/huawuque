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
        <img src="https://assets.urwork.cn/image/member/siku.png">
        <!--<div class="explain">-->
          <!--<h3><span class="mid_border"></span>权益说明<span class="mid_border"></span></h3>-->
          <!--<ul>-->
            <!--<li>1、luckin coffee（瑞幸咖啡）为优客会员提供24元咖啡券，可抵消对应额度的消费；</li>-->
            <!--<li>2、在会员领取本权益的48小时内，优惠券将会发放到luckin coffee的账户中，用户可下载luckin coffee APP使用优惠券；</li>-->
            <!--<li>3、共100张优惠券，每人限领1张，先到先得。</li>-->
          <!--</ul>-->
        <!--</div>-->
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
        title: '寺库48hrs',
        value: 'https://m.urwork.cn',
        size: 160,
        rightsCode:false,
        code:'1'
      }
    },
    methods:{
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
      this.show = true;
      this.$route.query.first==0 ? this.$toast('领取成功') : ''
//      isLogin({
//        success: () => {
//          this.getinfo();
//          this.value = "https://m.urwork.cn/v2/membership/confirm?userId="+this.$store.state.userInfo.userId
//        },
//        fail: () => {
//          if(this.isApp) {
//            toLogin();
//          }else{
//            window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl='+location.href;
//          }
//        }
//      })
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
        width: 6.5rem;
        height: 69vw;
        background: #FFFFFF;
        border-radius: 20px 20px 0 0;
        position: absolute;
        bottom: 50vw;
        left: 50%;
        margin-left: -3.25rem;
        text-align: left;
        padding: 30px;
        h3{
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          font-weight: 600;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          span{
            width: 35px;
            height: 1px;
            background: #D9D9D9;
            margin: 0 8px;
          }
        }
        ul{
          li{
            width: 100%;
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #666666;
            letter-spacing: 0;
            margin-top: 0.3rem;
            position: relative;
            padding-left: 10px;
            &::before{
              display: inline-block;
              content:"";
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background: #363B7C;
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

