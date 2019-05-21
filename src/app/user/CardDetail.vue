<template>
  <page-wrap class="page-user-center black-bg">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
        <div class="m-wrapper-cont">
            <div class="m-wrapper">
                <div class="m-content-info">
                    <!-- 小图icon，icon-full -->
                    <div id="deflmg" class="icon" :style="'background-image: url('+info.image+'?imageMogr2/auto-orient/thumbnail/!320x260r/gravity/Center/crop/320x260/format/'+isWebp+');'"></div>
                    <div id="displayName" class="c-title">{{info.couponName}}</div>
                    <!--<div id="shortDisplayName" class="c-text">v1yishang</div>-->
                    <div id="integralName" class="c-text c-text-gold hide"></div>
                    <div v-if="info.startTime&&info.endTime" id="welfare_deadline" class="c-time">活动日期 {{info.startTime.split(" ")[0]}}— {{info.endTime.split(" ")[0]}}</div>
                    <!-- 按钮黑色字体追加类名fz-color 金色背景追加类名gold-bg -->
                  <template v-if="info.isPre != 6">
                    <a v-if="info.isPre == 4" id="button" href="javascript:;" class="c-btn-link gold-bg" @click="mylinkto('/v2/membership/myecode')">出示身份</a>
                    <a v-if="info.isPre == 2" id="button2" href="javascript:;" class="c-btn-link gold-bg" @click="threeGo(info.linkUrl,info.couponName)">参加活动</a>
                    <template v-else="">
                      <a v-if="info.obtained == 0&&info.remainderQuantity!=0"  href="javascript:;" class="c-btn-link gold-bg" @click="getCode()">立即领取</a>
                      <a v-if="info.obtained == 1"  href="javascript:;" class="c-btn-link" style="color: #cccccc;">已领取</a>
                      <a v-if="info.obtained == -1"  href="javascript:;" class="c-btn-link gold-bg" @click="getCode()">再领一张</a>
                      <a v-if="info.remainderQuantity == 0&&info.obtained==0"  href="javascript:;" class="c-btn-link" style="color: #cccccc;">已领完</a>
                    </template>
                  </template>

                </div>
                <div class="m-content-list">
                    <ul id="coupon" v-if="rightsCode.length>0"  class="list-item">
                        <li class="gold" v-for="(key,index) in rightsCode">
                            <span id="code-url" class="input-wrap">{{key}}</span>
                            <div class="c-text" @click="copyCodeq(key)">复制券码</div>
                        </li>
                    </ul>
                </div>
                <!-- 使用说明 -->
                <div id="detail" class="m-use-list">
                    <div class="c-tit">使用说明：</div>
                    <ul class="list-cont" v-html="info.summary">
                    </ul>
                  <!--<ul class="list-cont">-->
                    <!--<p>213123</p>-->
                    <!--<p>123131</p>-->
                  <!--</ul>-->
                </div>
                <!-- 使用说明 end-->
            </div>


            <div v-if="info.isPre == 5&&info.obtained == 1">
              <div class="kong">

              </div>
              <div class="use">
                <a href="javascript:;" class="c-btn-link gold-bg" @click="threeGo(info.linkUrl,info.couponName)">立即使用</a>
              </div>
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
        </div>
    </page-main>
  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import QrcodeVue from 'qrcode.vue';
  import apiGetRightsDetail from 'api/user/apiGetRightsDetail';
  import apiTicket from 'api/user/apiTicket';
  import apiReceiveRights from 'api/mPackage/apiReceiveRights';

  export default {
    components: {
      QrcodeVue
    },
    data: () => {
      return {
        show: false,
        title: '会员卡详情',
        value: 'https://m.urwork.cn',
        size: 160,
        rightsCode:[],
        code:'1',
        info:'',
        id:'1',
        giftId:'',
        dialog:false,
        dialogName:'第三方',
        dialogUrl:'',
        checkTips:true
      }
    },
    computed: {
      isWebp (){
        if(document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0){
          return 'webp'
        }else{
          return 'jpeg'
        }
      }
    },
    methods:{
      copyCodeq(code) {
        this.$copyText(code).then(
          res => {
            this.$toast("复制成功");
          },
          err => {
            this.$toast("复制失败");
          }
        )
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
      dialogClick(n) {
        n == 1 ? this.dialog = true:this.closeDialog();
      },
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
//            if(url1.indexOf("/v2/membership") > -1){
//              url1 = getLocation().origin+this.dialogUrl;
//            }
            this.$DANativeApi.navigateTo({
              url:url1
            })
          }
        } else {
          window.location.href = this.dialogUrl;
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
          oInput.style.display='none';
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
        apiGetRightsDetail({
          "id":this.id
        },this.$store.state.userInfo.userId).then(res => {
          this.rightsCode = res.data.ticketCode;
          this.info = res.data;
          this.info.remainderQuantity == null ?  this.info.remainderQuantity = 0:''
          this.show = true;
        })
      },
      getCode(){
        this.giftId ? this.rightReceived() : this.received();
      },
      received() {
        apiTicket({
          "couponTypeCode":this.code,
        },this.$store.state.userInfo.userId).then(res => {
          if(res.retCode == 0){
            this.getinfo();
          }else{
            this.$toast(res.retMsg)
          }
        })
      },
      rightReceived() {
        apiReceiveRights({
          "targetId":this.giftId,
        }).then(res => {
          if(res.retCode == 0){
            this.getinfo();
          }else{
            this.$toast(res.retMsg)
          }
        })
      }
    },
    created() {
      this.show = true;
      this.code = this.$route.query.code.split("_")[0];
      this.id = this.$route.query.code.split("_")[1];
      this.title = this.$route.query.code.split("_")[2];
      this.giftId = this.$route.query.code.split("_")[3];
        isLogin({
         success: () => {
           this.getinfo();
           this.code = this.$route.query.code.split("_")[0];
           this.id = this.$route.query.code.split("_")[1];
//           this.value = "https://m.urwork.cn/v2/membership/confirm?userId="+this.$store.state.userInfo.userId
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
    mounted() {

    }
  }
</script>

<style lang="scss">
    .kong{
      height: 0.8rem;
      margin-bottom: 20px;
    }
    .hide{
        display:none;
    }
    .black-bg{
        background: #313032; 
        color: #333;
    }
    .m-content-info:before, .m-content-info:after {
        position: absolute;
        left: -0.12rem;
        bottom: -0.14rem;
        content: "";
        width: .24rem;
        height: .24rem;
        border-radius: 100%;
        background: #313032;
    }
    .m-content-info:after {
        left: auto;
        right: -0.12rem;
    }
    .m-wrapper-cont {
        padding-top: .35rem;
        padding-bottom: .28rem;
        .m-wrapper {
            border-radius: .1rem;
            margin: .8rem .24rem 0;
            box-shadow: 0 2px 4px 0 rgba(29,25,25,0.85);
            background: #fff;
            .m-content-info {
                position: relative;
                text-align: center;
                padding-bottom: .6rem;
                border-bottom: 3px dotted #c0c0c0;
                .icon {
                    width: 3.2rem;
                    height: 2.6rem;
                    margin: 0 auto;
                    display: inline-block;
                    margin-top: -0.8rem;
                    border-radius: .05rem;
                    background-repeat: no-repeat;
                    background-size: contain;
                }
                .c-title {
                    font-size: .48rem;
                    line-height: .68rem;
                    margin-top: .3rem;
                    padding: 0 .3rem;
                    color: #333;
                }
                .c-text {
                    color: #666;
                    font-size: .26rem;
                    line-height: .36rem;
                    margin-top: .2rem;
                    padding: 0 .3rem;
                }
                .c-text.c-text-gold {
                    color: #bb8b51;
                }
                .c-time {
                    color: #666;
                    font-size: .28rem;
                    line-height: .34rem;
                    margin-top: .3rem;
                    padding: 0 .3rem;
                }
                .c-btn-link {
                    color: #bb8b51;
                    font-size: .32rem;
                    width: 3.2rem;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    display: block;
                    border-radius: 1rem;
                    background: #f5f5f5;
                    margin: .6rem auto 0;
                }
            }
            .m-content-info .c-btn-link.gold-bg {
                color: #68400b;
                background-image: linear-gradient(-90deg, rgb(240, 210, 158) 4%, rgb(231, 187, 120) 100%);
            }

        }
    }
    .m-content-list .list-item li.gold {
        color: #bb8b51;
        display: flex;
        justify-content: space-between;
    }
    .m-content-list .list-item li {
        display: -moz-box;
        display: -webkit-box;
        display: box;
        color: #666;
        font-size: .28rem;
        line-height: .56rem;
        padding: .24rem 0;
        margin: 0 .13rem;
        padding-left: .18rem;
        padding-right: .16rem;
        box-shadow: 0 1px 0 0 rgba(235,235,235,0.5);
        .input-wrap {
            -moz-box-flex: 1;
            -webkit-box-flex: 1;
            box-flex: 1;
            display: block;
            color: #bb8b51;
            line-height: .56rem;
            border: none;
            -webkit-appearance: none;
        }
    }
    .m-use-list {
        padding: 0 .16rem .35rem;
        .c-tit {
            font-size: .32rem;
            font-weight: bold;
            line-height: .44rem;
            margin-top: .3rem;
            margin-bottom: .2rem;
        }
        .list-cont{
          p{
            position: relative;
            color: #666;
            font-size: .24rem;
            line-height: .34rem;
            /*padding-left: .26rem;*/
            text-align: justify;
            font-weight: normal;
          }
        }
    }
    .use{
      width: 100%;
      position: fixed;
      bottom: 20px;
      .c-btn-link {
        color: #bb8b51;
        font-size: .32rem;
        width: 3.2rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        display: block;
        border-radius: 1rem;
        background: #f5f5f5;
        margin: .6rem auto 0;
      }
      .gold-bg {
        color: #68400b;
        background-image: linear-gradient(-90deg, rgb(240, 210, 158) 4%, rgb(231, 187, 120) 100%);
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


