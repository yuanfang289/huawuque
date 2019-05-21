<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>
    <page-header>
      <topbar :type="'back'">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>
    <page-main :show="show">
      <img style="display: none" src="https://assets.urwork.cn/image/activity/right-banner-319.png">
      <article style="display: none">优客工场会员日 多本好书免费领</article>
      <div class="right-content">
        <div class="top-banner"><div class="banner-click"  @click="gotoUrl('/v2/membership/carddetail?code=13_13_'+encodeURIComponent('掌阅-引领品质阅读'))"></div></div>
        <div class="list">
          <div class="part-1">
            <div class="click-area1 c11" @click="gotoUrl('/v2/membership/carddetail?code=13_13_'+encodeURIComponent('掌阅-引领品质阅读'))"></div>
            <div class="click-area1 c12" @click="gotoUrl('/v2/membership/carddetail?code=14_14_'+encodeURIComponent('意大利进口水杯'))"></div>
            <div class="click-area1 c13" @click="gotoUrl('/v2/membership/carddetail?code=15_15_'+encodeURIComponent('优客工场单向历'))"></div>
          </div>
          <div class="part-2">
            <div class="click-area1 c21" @click="gotoUrl('/v2/membership/carddetail?code=16_16_'+encodeURIComponent('Veer图库-告别版权侵扰'))"></div>
            <div class="click-area1 c22" @click="gotoUrl('/v2/membership/carddetail?code=17_17_'+encodeURIComponent('让招聘更高效'))"></div>
            <div class="click-area1 c23" @click="gotoUrl('/v2/membership/carddetail?code=18_18_'+encodeURIComponent('给你世界的美好'))"></div>
            <div class="click-area1 c24" @click="gotoUrl('/v2/membership/carddetail?code=19_19_'+encodeURIComponent('闪送-同城1小时速达'))"></div>
          </div>
          <div class="part-3" @click="gotoUrl('/v2/membership/card')"></div>
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
        let url_go = getLocation().origin + url;
        if (isApp()) {
          this.$DANativeApi.navigateTo({
            url:url_go
          })
        } else {
          location.href = url_go;
        }
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
   background: #254b8f;
   position: relative;
   //height: 29.2rem;
  .top-banner {
    width: 7.50rem;;
    position: relative;
    height: 7.68rem;
    background: url("https://assets.urwork.cn/image/activity/right-banner-315.png") no-repeat;
    background-size: 100%;
    margin-bottom: 0.4rem;
    .banner-click{
      position: absolute;
      //border:1px solid red;
      top:2.15rem;
      left:1.7rem;
      width: 3.95rem;
      height:0.67rem;
    }
  }
  .list{
    //position: absolute;
    background: #254b8f;
    //top:5.88rem;

    width: 7.32rem;
    margin: 0 auto;
    margin-top: -2.42rem;
    margin-left: 0.09rem;
    .click-area1{
      position: absolute;
      //border:1px solid red;
      width: 1.72rem;
      height:0.64rem;
    }
    .part-1 {
      width: 7.32rem;
      height: 10.21rem;
      position: relative;
      background: url("https://assets.urwork.cn/image/activity/318-1.png") no-repeat;
      background-size: 100%;
      margin: 0 auto;
      margin-bottom: 0.2rem;

      .c11{
        top:3rem;
        left:3.84rem
      }
      .c12{
        top:5.92rem;
        left:3.84rem
      }
      .c13{
        top:8.78rem;
        left:3.84rem
      }

    }

    .part-2 {
      width: 7.32rem;
      height: 10.68rem;
      position: relative;
      background: url("https://assets.urwork.cn/image/activity/318-2.png") no-repeat;
      background-size: 100%;
      margin: 0 auto;
      margin-bottom: 0.2rem;

      .c21{
        top:4.80rem;
        left:1.18rem
      }
      .c22{
        top:4.80rem;
        left:4.44rem
      }
      .c23{
        top:9.40rem;
        left:1.18rem
      }
      .c24{
        top:9.4rem;
        left:4.44rem
      }
    }

    .part-3 {
      width: 7.32rem;
      height: 1.82rem;
      background: url("https://assets.urwork.cn/image/activity/315-3.png") no-repeat;
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



