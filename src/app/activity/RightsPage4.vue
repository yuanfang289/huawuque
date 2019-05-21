<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>
    <page-header>
      <topbar :type="'back'">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>
    <page-main :show="show">
      <img style="display: none" src="https://assets.urwork.cn/image/activity/521-1.png">
      <article style="display: none">为你的爱情加把“锁”</article>
      <div class="right-content">
        <div>

        </div>
        <div class="top-banner">
          
        </div>
        <div class="list">
          <div class="part-1">
            <div class="click-area1 c1" @click="gotoUrl('/v2/membership/carddetail?code=43_43_'+encodeURIComponent('美年好医生体检卡'))"></div>
            <div class="click-area1 c2" @click="gotoUrl('/v2/membership/carddetail?code=52_52_'+encodeURIComponent('职业女性学习平台'))"></div>
            <div class="click-area1 c3" @click="gotoUrl('/v2/membership/carddetail?code=50_50_'+encodeURIComponent('男士专属福利'))"></div>
          </div>
          <div class="part-2">
            <div class="click-area2 c21" @click="gotoUrl('/v2/membership/carddetail?code=49_49_'+encodeURIComponent('真实触感 真正享受'))"></div>
            <div class="click-area2 c22" @click="gotoUrl('/v2/membership/carddetail?code=35_35_'+encodeURIComponent('亚朵-成就一种生活方式'))"></div>
            <div class="click-area2 c23" @click="gotoUrl('/v2/membership/carddetail?code=46_46_'+encodeURIComponent('顺丰不贵，姿势要对'))"></div>
            <div class="click-area2 c24" @click="gotoUrl('/v2/membership/carddetail?code=47_47_'+encodeURIComponent('预约上门体检'))"></div>
            <div class="click-area2 c25" @click="gotoUrl('/v2/membership/carddetail?code=45_45_'+encodeURIComponent('兴业银行信用卡'))"></div>
            <div class="click-area2 c26" @click="gotoUrl('/v2/membership/carddetail?code=51_51_'+encodeURIComponent('「祯爱」优选寿险'))"></div>
          </div>
          <!-- <div class="part-3" @click="gotoUrl('/v2/membership/card')"></div> -->
        </div>

      </div>
      <!--<div class="banner">-->
      <!--<img style="display: none" src="https://assets.urwork.cn/image/activity/rights-banner.jpg">-->
      <!--<article style="display: none">锦礼限量派送&#45;&#45;新春送礼 优惠有你</article>-->
      <!--</div>-->
      <!--<div class="commonweal">-->
      <!--<div class="adopt" @click="adopt()"></div>-->
      <!--<div class="rights-detail" @click="rightsDetail()"></div>-->
      <!--</div>-->
      <!--<div class="list">-->
      <!--<div class="item1" @click="linkto(1)"></div>-->
      <!--<div class="item2" @click="linkto(2)"></div>-->
      <!--<div class="item3" @click="linkto(3)"></div>-->
      <!--</div>-->

      <div id="mask" v-show="dialog">
        <div class="dialog">
          <div class="content" @click="tipsClick()">
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

    </page-main>
  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  import store from 'store';
  import apiTicket from 'api/user/apiTicket';
  import apiGetCards from 'api/user/apiGetCards';
  export default {
    components: {},
    data: () => {
      return {
        show: false,
        title: '优客工场会员狂欢日',
        rights: [],
        checkTips: true,
        dialog: false,
        dialogName: '第三方',
        dialogUrl: ''
      }
    },
    methods: {
      tipsClick() {
        this.checkTips = !this.checkTips;
      },
      closeDialog() {
        this.checkTips ? localStorage.setItem(`${this.dialogName}`, '0') : localStorage.setItem(`${this.dialogName}`, '1');
        this.dialog = false;
        if (isApp()) {
          if (this.dialogUrl == 'https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0') {
            window.location.href = this.dialogUrl;
          } else {
            let url1 = this.dialogUrl;
            if (url1.indexOf("/v2/membership") > -1) {
              url1 = getLocation().origin + this.dialogUrl;
            }
            this.$DANativeApi.navigateTo({
              url: url1
            })
          }
        } else {
          window.location.href = this.dialogUrl;
        }
      },
      dialogClick(n) {
        n == 1 ? this.dialog = true : this.closeDialog();
      },
      threeGo(url, name) {
        this.dialogName = name;
        this.dialogUrl = url;
        if (localStorage.getItem(this.dialogName) == 1) {
          if (isApp()) {
            if (this.dialogUrl == 'https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0') {
              window.location.href = this.dialogUrl;
            } else {
              let url1 = this.dialogUrl;
              if (url1.indexOf("/v2/membership") > -1) {
                url1 = getLocation().origin + this.dialogUrl;
              }
              this.$DANativeApi.navigateTo({
                url: url1
              })
            }
          } else {
            window.location.href = this.dialogUrl;
          }
        } else {
          this.dialogClick(1);
        }
      },
      linkto(n) {
        isLogin({
          success: () => {
            if (n == 1) {
              this.threeGo('http://openweb.liangzibao.cn/redirect/to?p=9972206', "right-insurance");
              //this.gotoUrl('http://openweb.liangzibao.cn/redirect/to?p=9972206')
            }
            if (n == 2) {
              this.threeGo('https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0', "right-grill");
              //this.gotoUrl('https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0')
            }
            if (n == 3) {
              this.getInfo(5);
            }
          },
          fail: () => {
            if (isApp()) {
              toLogin();
            } else {
              window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl=' + location.href;
            }
          }
        })
      },

      gotoUrl(url){

       isLogin({
         success: () => {
            let url_go = getLocation().origin + url;
                if (isApp()) {
                  this.$DANativeApi.navigateTo({
                    url:url_go
                  })
                } else {
                  location.href = url_go;
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
      mylinkto(router) {
        if (isApp()) {
          let url = getLocation().origin + router;
          this.$DANativeApi.navigateTo({
            url
          })
        } else {
          this.$router.push(router);
        }
      },
      rightsDetail(){
        let url = getLocation().origin + `/v2/membership/card`;
        if (isApp()) {
          this.$DANativeApi.navigateTo({
            url
          })
        } else {
          this.$router.push('/v2/membership/Card');
        }
      },

      getInfo(type) {
        apiGetCards({
          "userId": this.$store.state.userInfo.userId,
          "pn": 1,
          "ps": 1
        }).then(res => {
          let item = null;
          let path = "";
          let couponTypeCode = 0;
          if (type == 5) {
            couponTypeCode = 5;
            path = "/v2/membership/rent";
          }
          if (type == 6) {
            couponTypeCode = 6;
            path = "/v2/membership/mforest";
          }
          this.rights = res.rights[0].rightsList;

          this.rights.map(obj => {
            if (obj.couponTypeCode == couponTypeCode) {
              item = obj;
            }
          })

          if (item.obtained == 1) {
            router = path + '?code=' + item.couponTypeCode + '&first=1';
            this.mylinkto(router);
          } else {
            if (item.remainderQuantity > 0) {
              var router = path + '?code=' + item.couponTypeCode + '&first=' + item.obtained;
              apiTicket({
                "couponType": item.couponTypeCode,
              }).then(res => {
                this.$hideLoading();
                if (res.retCode == 0) {
                  this.mylinkto(router);
                } else {
                  this.$toast(res.retMsg)
                }
              })
            } else {
              this.$hideLoading();
              this.$toast('已领完！')
            }
          }

        });
      },
      adopt(){
        isLogin({
          success: () => {
            this.getInfo(6);
          },
          fail: () => {
            if (isApp()) {
              toLogin();
            } else {
              window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl=' + location.href;
            }
          }
        })
      },

    },
    created() {
    },
    mounted() {
      this.show = true;
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";


.right-content{
   background: #f8d0c3;
   position: relative;
   //height: 29.2rem;
  .top-banner {
    width: 7.50rem;
    height: 10.09rem;
    background: url("https://assets.urwork.cn/image/activity/521-1.png") no-repeat;
    background-size: 100%;
    margin: 0 auto;
  }
  .list{
    //position: absolute;
    background: #f8d0c3;
    //top:5.88rem;
    width: 7.50rem;
    margin: 0 auto;
    .click-area1{
      position: absolute;
      //border:1px solid red;
      width: 6.2rem;
      height:2.4rem;
      /*background: red;*/
    }
    .part-1 {
      width: 7.50rem;
      height: 10.2rem;
      position: relative;
      background: url("https://assets.urwork.cn/image/activity/521-2.png") no-repeat;
      background-size: 100%;
      margin: 0 auto;
      .c1{
        top:.75rem;
        left:.66rem;
        // background: url("https://assets.urwork.cn/image/activity/418(1).jpg") no-repeat;
        // background-size: 100% 100%;
      }
      .c2{
        top:4.08rem;
        left: .66rem;
        // background: url("https://assets.urwork.cn/image/activity/418(2).jpg") no-repeat;
        // background-size: 100% 100%;
      }
      .c3{
        top: 7.18rem;
        left:.66rem;
        // background: url("https://assets.urwork.cn/image/activity/418(3).jpg") no-repeat;
        // background-size: 100% 100%;
      }

    }
   .click-area2{
      position: absolute;
      //border:1px solid red;
      width: 3rem;
      height:3.9rem;
      /*background: red;*/
    }
    .part-2 {
      width: 7.50rem;
      height: 17.26rem;
      position: relative;
      background: url("https://assets.urwork.cn/image/activity/521-3.png") no-repeat;
      background-size: 100%;
      margin: 0 auto;
      // margin-bottom: 0.2rem;
      .c21{
        top:2.40rem;
        left:.66rem;
      }
      .c22{
        top:2.40rem;
        right:.66rem;
      }
      .c23{
        top:7.30rem;
        left:.66rem;
      }
      .c24{
        top:7.30rem;
        right:.66rem;
      }
      .c25{
        top:12.20rem;
        left:.66rem;
      }
      .c26{
        top:12.20rem;
        right:.66rem;
      }
    }

    .part-3 {
      width: 7.50rem;
      height: 2.37rem;
      background: url("https://assets.urwork.cn/image/activity/418-bot.png") no-repeat;
      background-size: 100%;
      margin: 0 auto;
      margin-bottom: 0.2rem;
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
        .txt {
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #333333;
          letter-spacing: 0;
          margin-top: 0.27rem;
        }
        .tips {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .select {
            width: 15px;
            height: 15px;
            display: inline-block;
            background: url("https://assets.urwork.cn/image/member/icon_checked.png") no-repeat;
            background-size: 100%;
            border-radius: 2px;
            margin-right: 7px;
            margin-top: 6px;
          }
          .no-select {
            width: 15px;
            height: 15px;
            display: inline-block;
            background: url("https://assets.urwork.cn/image/member/icon_nochecked.png") no-repeat;
            background-size: 100%;
            border-radius: 2px;
            margin-right: 7px;
            margin-top: 6px;
          }
          .p {
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



