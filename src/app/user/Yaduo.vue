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
        <div class="banner">
          <!--<img src="https://assets.urwork.cn/image/member/mforest.jpg">-->
        </div>
        <div class="contbox">
          <div class="cont">
            <p class="rights-code">会员企业邀请码：
              <span id="code-url">{{rightsCode}}</span>
              <span class="copy-code" @click="copyCode()">复制</span>
            </p>
          </div>
        </div>
        <div class="explain-box">
          <div class="explain">
          <h3><span class="mid_boder"></span>权益说明<span class="mid_boder"></span></h3>
            <ul>
                <li>优客工场会员企业订房优惠价</li>
                <li>会员享受门市价88折单早</li>
                <li>邀请码及优惠价格仅限优客工场平台会员企业员工享用</li>
                <li>邀请码禁止以任何形式外泄</li>
            </ul>
            <p class="ex">*此优惠活动最终解释权归亚朵酒店所有</p>
          </div>
        </div>
        <div class="kong"></div>
        <div class="footercont" @click="threeGo('http://h5tmc.yaduo.com/tmc-h5/#/home','亚朵')">
          <p class="footerrights-code">
              马上预定
          </p>
        </div>

        <div id="mask" v-show="dialog">
        <div class="dialog">
          <div class="content"  @click="tipsClick()">
            <p>提示</p>
            <div class="txt">
              本服务由第三方平台提供。相关服务和责任将由该第三方承担。如有问题请咨询该平台客服。
            </div>
            <div class="tips">
              <span :class="{'no-select':checkTips,'select':!checkTips}"></span><span class="p">不再提示</span>
            </div>
          </div>
          <div class="bot" @click="dialogClick(0)">
            我知道了
          </div>
        </div>
      </div>
        <!--<div class="kong"></div>-->
      </div>
    </page-main>
  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import apiGetTicketCode from 'api/user/apiGetTicketCode';
  import apiTicket from 'api/user/apiTicket';
  export default {
    components: {
    },
    data: () => {
      return {
        show: false,
        title: '亚朵',
        rightsCode:"请稍后",
        code:'1',
        dialogName:'',
        dialogUrl:'',
        checkTips:true,
        dialog:false
      }
    },
    methods:{
      tipsClick() {
        this.checkTips = !this.checkTips;
      },
      closeDialog() {
        this.checkTips ?  localStorage.setItem(`${this.dialogName}`, '0') : localStorage.setItem(`${this.dialogName}`, '1');
        this.dialog = false;
        if(isApp()) {
          if(this.dialogUrl == 'https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0'){
            window.location.href = this.dialogUrl;
          }else{
            let url1 = this.dialogUrl;
            if(url1.indexOf("/v2/membership") > -1){
              url1 = getLocation().origin+this.dialogUrl;
            }
            this.$DANativeApi.navigateTo({
              url:url1
            })
          }
        } else {
          window.location.href = this.dialogUrl;
        }
      },
      dialogClick(n) {
        n == 1 ? this.dialog = true:this.closeDialog();
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
          "couponType":8
        }).then(res => {
          this.rightsCode = res.ticketCode||'61df7c39e75fd6c0';
          this.show = true;
        })
      },
      threeGo(url,name) {
        this.dialogName = name;
        this.dialogUrl = url;
        if(localStorage.getItem(this.dialogName) == 1){
          if(isApp()) {
            if(this.dialogUrl == 'https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0'){
              window.location.href = this.dialogUrl;
            }else{
              let url1 = this.dialogUrl;
              if(url1.indexOf("/v2/membership") > -1){
                url1 = getLocation().origin+this.dialogUrl;
              }
              this.$DANativeApi.navigateTo({
                url:url1
              })
            }
          } else {
            window.location.href = this.dialogUrl;
          }
        }else{
          this.dialogClick(1);
        }
      },
      linkto(n) {
        isLogin({
          success: () => {
            if(n==1){
                this.threeGo('http://openweb.liangzibao.cn/redirect/to?p=9972206',"right-insurance");
                //this.gotoUrl('http://openweb.liangzibao.cn/redirect/to?p=9972206')
            }
            if(n==2){
              this.threeGo('https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0',"right-grill");
              //this.gotoUrl('https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0')
            }
            if(n==3){
              this.getInfo(5);
            }
          },
          fail: () => {
            if(isApp()) {
              toLogin();
            }else{
              window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl='+location.href;
            }
          }
        })
      },

      gotoUrl(url){
        if(isApp()) {
                   this.$DANativeApi.navigateTo({
            url
          })
        } else {
         location.href=url;
        }
      },
      mylinkto(router) {
        if(isApp()) {
          let url = getLocation().origin + router;
          this.$DANativeApi.navigateTo({
            url
          })
        } else {
          this.$router.push(router);
        }
      },
    },
    created() {
      this.show = true;
      isLogin({
        success: () => {
          this.$route.query.first ==0 ? this.$toast('领取成功') : ''
          this.getinfo();
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
  .kong{
    height: 50px;
  }
  #main{
    background: #ffffff;
    .ticket{
      text-align: center;
      position: relative;
      >img{
        display: inline-block;
      }
      .banner{
        width: 100vw;
        height: 172.27vw;
        background: url("https://assets.urwork.cn/image/member/yaduo.png") no-repeat;
        background-size: 100%;
      }
      .contbox{
        width: 100%;
        padding: 0 25px;
        margin-top: -85vw;
        .cont{
          height: 60px;
          display: flex;
          align-items: center;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          box-shadow: -2px 3px 15px 0 rgba(211,211,211,0.50);
          border-radius: 5px;
          .code{
            width: 100%;
            height: 100%;
            margin: 0 auto;
            padding: 15px;
            display: flex;
            justify-content: center;
          }
          .rights-code{
            font-family: PingFangSC-Regular;
            font-size: 15px;
            color: #F34311;
            letter-spacing: 0;
            text-align: center;
            .copy-code{
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #F34311;
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
      }
      .explain-box{
        padding-bottom: 25px;
        .explain{
          background: #FFFFFF;
          border-radius: 20px 20px 0 0;
          text-align: left;
          margin: 15px 25px 0 25px;
          padding: 20px;
          background: #FFFFFF;
          box-shadow: -2px 3px 15px 0 rgba(211,211,211,0.50);
          border-radius: 5px;
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
              font-family: PingFangSC-Regular;
              font-size: 0.26rem;
              color: #151515;
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
                background: #0E7245;
                margin-top: -5px;
                margin-right: 5px;
                position: absolute;
                left: 0;
                top: 12px;
              }
              h5{
                font-family: PingFangSC-Medium;
                font-size: 0.26rem;
                color: #333333;
                letter-spacing: 0;
                font-weight: 600;
                margin-bottom: 5px;
              }
            }
            .ss{
              display: inline-block;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #999999;
              letter-spacing: 0;
              margin-top: 15px;
            }
          }
          .ex{
              margin-top: 0.3rem;
              font-size: 0.2rem;
              color: #999999;
          }
          a{
            color: #007aff;
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
      .footercont{
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        bottom: 0;
        background: #f9f9f9;
        border-top: 1px solid #eaeaea;
        .footerrights-code{
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #F34311;
          letter-spacing: 0;
          text-align: center;
        }
        .tip{
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #999999;
          letter-spacing: 0;
          text-align: center;
        }
      }
    }
  }
  #mask {
    width: 100%;
    height: 100%;
    background: rgba(127, 126, 125, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1900;
    .dialog {
      z-index: 1901;
      width: 5.73rem;
      /*height: 3.4rem;*/
      background-color: #ffffff;
      border-radius: 0.2rem;
      padding: .3rem .5rem .3rem .5rem;
      position: fixed;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .content {
        width: 100%;
        /*height: 2.2rem;*/
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          font-weight: 600;
        }
        .txt{
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #333333;
          letter-spacing: 0;
          margin-top: 0.27rem;
        }
        .tips{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .select{
            width: 15px;
            height: 15px;
            display: inline-block;
            background: url("https://assets.urwork.cn/image/member/icon_checked.png") no-repeat;
            background-size: 100%;
            border-radius: 2px;
            margin-right: 7px;
            margin-top: 6px;
          }
          .no-select{
            width: 15px;
            height: 15px;
            display: inline-block;
            background: url("https://assets.urwork.cn/image/member/icon_nochecked.png") no-repeat;
            background-size: 100%;
            border-radius: 2px;
            margin-right: 7px;
            margin-top: 6px;
          }
          .p{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #666666;
            letter-spacing: 0;
          }
        }
        span {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666666;
          letter-spacing: 0;
          text-align: center;
          margin-top: 0.14rem;
        }
      }
      .bot {
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #097FFF;
        letter-spacing: 0;
        margin-top: 15px;
        padding-top: 10px;
        border-top: 1px solid #f4f4f4;
      }

    }
  }
</style>


