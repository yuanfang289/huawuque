<template>
  <page-wrap class="v3-member-company">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :nativeStatusBarStyle='2'>
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div class="black-bg">

      </div>
      <div class="company-container">
        <div style="padding: 0 20px">
          <div class="company-info">
            <div class="type-icon" v-if="personalUp.payMember">
              <!--<span>{{personalUp.userMedals}}</span>-->
            </div>
            <div class="type">
              <span :class="{'super-vip':personalUp.memberIdentity != '随心会员'}"></span>
            </div>
            <div class="item-img">
              <div v-if="personalUp.headImage" class="img">
                <img :src="personalUp.headImage" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">
              </div>
              <div v-else="" class="img">
                <img src="https://assets.urwork.cn/image/headImg.png">
              </div>
            </div>
            <div class="item-name">
              <p>{{personalUp.userName}}</p>
            </div>
            <div class="item-point" @click="mylinkto('/v2/credit/myAccount')">
              <div class="point-box">
                <p class="point-num">{{personalUp.userPoints}}</p>
                <p class="point-text">积分</p>
                <div class="go-point-page">
                  <!--<i class="uricon-arrow-right"></i>-->

                </div>
              </div>

            </div>
            <div class="item-line">
              <span></span>
            </div>
            <div class="item-rank">
              <div class="top-three">
                <ul>
                  <a href="/v2/credit">
                    <li>
                      <img src="https://assets.urwork.cn/image/v3/member/per-icon1.png" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">
                      <p class="name">积分中心</p>
                    </li>
                  </a>
                  <a href="/v2/membership/card">
                    <li>
                      <img src="https://assets.urwork.cn/image/v3/member/per-icon2.png" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">
                      <p class="name">会员卡</p>
                    </li>
                  </a>
                  <a href="/company/package">
                    <li>
                      <img src="https://assets.urwork.cn/image/v3/member/per-icon3.png" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">
                      <p class="name">U礼包</p>
                    </li>
                  </a>
                  <a href="/member/vip">
                    <li>
                      <img src="https://assets.urwork.cn/image/v3/member/per-icon4.png" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">
                      <p class="name">VIP会员</p>
                    </li>
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="items">
          <!--限时福利开始-->
          <!--<div class="item item-welfare">-->
            <!--<h2>限时福利</h2>-->
            <!--<div class="welfare-content">-->
              <!--<ul class="coupon">-->
                <!--<li v-for="item in rightsMemberCouponVOList" :class="{'grey':item.obtained == 2}">-->
                  <!--<a href="javascript:void(0);" @click="getCoupon(item)">-->
                    <!--<div class="left">-->
                      <!--<div class="line1"> <h3 class="name">{{item.couponName}}</h3>-->
                        <!--<span class="status" v-if="item.obtained==1">已领取</span>-->
                        <!--<span class="status" v-if="item.obtained==2">已领完</span>-->
                      <!--</div>-->
                      <!--<div class="line2"><span class="y">¥</span><span class="price">{{item.money}}</span></div>-->
                      <!--<div class="line3" v-if="item.isLimit == 1">满{{item.limitMoney}}元可用</div>-->
                      <!--<div class="line3" v-if="item.isLimit == 0">无使用金额限制</div>-->
                      <!--<div class="line4" v-if="item.isFixPeriod == 1">领取{{item.floatDayCount}}日后到期</div>-->
                      <!--<div class="line4" v-if="item.isFixPeriod == 0">有效期至{{item.endDate | format}}</div>-->
                    <!--</div>-->
                    <!--<div class="right" v-if="item.obtained==1">立<br/>即<br/>查<br/>看</div>-->
                    <!--<div class="right" v-if="item.obtained==0">立<br/>即<br/>领<br/>取</div>-->
                    <!--<div class="right" v-if="item.obtained==2">已<br/>领<br/>完</div>-->
                  <!--</a>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
            <!--<div class="open-vip" @click="mylinkto('/member/vip')">-->
              <!--开通VIP会员  享受更多权益-->
            <!--</div>-->
          <!--</div>-->
          <!--限时福利结束-->
          <div class="item item-earn">
            <h2>豪赚高额积分</h2>
            <div class="earn-content">
              <ul>
                <li>
                  <div class="left">
                    <h4>签到</h4>
                    <p>坚持才是胜利，连签榜首就是你</p>
                  </div>
                  <div v-if="todayChecked==0" class="right" @click.stop="sign(10070)">
                    <a href="javascript:void(0);">签到</a>
                  </div>
                  <div v-else="" class="right" @click.stop="mylinkto('/v2/task')">
                    <a href="javascript:void(0);">已签到</a>
                  </div>
                </li>
                <li @click="mylinkto('/v2/credit/task')">
                  <div class="left">
                    <h4>每日任务</h4>
                    <p>完成每日任务，赚取更多积分</p>
                  </div>
                  <div class="right">
                    <a href="javascript:void(0);">赚积分</a>
                  </div>
                </li>
              </ul>
              <div class="notice">
                <!--<p>-->
                  <!--<img src="https://api.dujin.org/pic/" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">-->
                  <!--<span>张**发布动态 赚取 <em>5</em> 积分</span>-->
                <!--</p>-->
                <notice :noticeList="noticeList">
                </notice>
              </div>
            </div>
          </div>

          <div v-if="advUp.length>0" class="ad">
            <ad-banner  :bannerList="advUp" :paddingTop="36"></ad-banner>
            <!--<img src="https://assets.urwork.cn/image/v3/member/taste-package.png">-->
          </div>

          <!--<div class="item item-gift2">-->
            <!--<h2>超值优惠 礼包随享</h2>-->
            <!--<div class="gift-content">-->
              <!--<div class="three">-->
                <!--<div class="bag one-line">-->
                  <!--<div class="right">-->
                    <!--<p class="bag-name">尊享礼包</p>-->
                    <!--<p class="bag-price">￥666</p>-->
                    <!--<div class="butn">立即领取</div>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="bag two-line">-->
                  <!--<div class="fle">-->
                    <!--<p class="bag-name">会议室礼包</p>-->
                    <!--<p class="bag-price">￥666</p>-->
                    <!--<div class="img">-->

                    <!--</div>-->
                  <!--</div>-->

                  <!--<div class="butn">立即领取</div>-->
                <!--</div>-->
                <!--<div class="bag two-line">-->
                  <!--<div class="fle">-->
                    <!--<p class="bag-name">营销推广包</p>-->
                    <!--<p class="bag-price">￥666</p>-->
                    <!--<div class="img">-->

                    <!--</div>-->
                  <!--</div>-->

                  <!--<div class="butn">立即领取</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="all-gift">-->
              <!--全部礼包-->
            <!--</div>-->
          <!--</div>-->

          <div class="luckey">
            <div @click="mylinkto('/v2/credit/lotterydraw')">
              <img src="https://assets.urwork.cn/image/v3/member/per-luck-enter.png"/>
            </div>
          </div>
          
          <div class="item item-select" v-if="ongoingPersonalRights&&ongoingPersonalRights.length>0">
            <h2>热门权益 为你推荐</h2>
            <div class="coupon-content">
              <div class="two">
                <div class="bag" v-for="item in ongoingPersonalRights" @click="linkto(item)">
                  <div class="img">
                    <img :src="item.image">
                  </div>
                  <p class="bag-name">{{item.couponName}}</p>
                  <!--<div class="bag-btn">立即领取</div>-->
                  <template v-if="item.isPre == 0||item.isPre == 1||item.isPre == 3||item.isPre == 5">
                    <div v-if="item.obtained == 1" class="bag-btn">
                      已领取
                    </div>
                    <template v-else="">
                      <div v-if="item.remainderQuantity == 0" class="bag-btn">
                        已领完
                      </div>
                      <div v-else="" class="bag-btn">
                        立即领取
                      </div>
                    </template>
                  </template>
                  <div v-else="" class="bag-btn">立即参加</div>
                </div>
                <!--<div class="bag">-->
                  <!--<div class="img" style="background: url('https://assets.urwork.cn/image/v3/member/huiyishi.png') no-repeat;background-size: 100% 100%;">-->
                    <!--&lt;!&ndash;<img src="https://assets.urwork.cn/image/v3/member/huiyishi.png">&ndash;&gt;-->
                  <!--</div>-->
                  <!--<p class="bag-name">上上签 电子签章</p>-->
                  <!--<div class="bag-btn">立即领取</div>-->
                <!--</div>-->
              </div>
            </div>
            <div  @click="mylinkto('/v2/membership/Card')" class="all-rights">
              全部权益
            </div>
          </div>

          <div class="item item-gift" v-if="advDown&&advDown.length>0">
            <h2>超值优惠 礼包随享</h2>
            <div class="right-content">
              <div class="three">
                <a :href="item.linkUrl" class="bag" v-for="item in advDown">
                  <img class="img" :src="item.image">
                </a>
              </div>
            </div>
            <a href="/company/package" class="all-gift">
              全部礼包
            </a>
          </div>
        </div>
      </div>

      <!--提示-->
      <transition name="my-trans">
        <div id="point-mask" v-show="tipsDialog">
          <div class="content">
            <div class="left">
              <div class="logo">
                <img src="https://assets.urwork.cn/image/credit/icon_logo.jpg">
              </div>
              <div class="p">
                <h4>恭喜你得到{{tipsDialogTxt}}积分</h4>
                <p>可以兑换商品或抽奖哦～</p>
              </div>
            </div>
            <div class="add-point">
              +{{tipsDialogTxt}}
            </div>
          </div>
        </div>
      </transition>
    </page-main>

  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import store from 'store';
  import apiPersonalUp from 'src/api/member/apiPersonalUp';
  import apiPersonalDown from 'src/api/member/apiPersonalDown';
  import apiDrawMemberFreeCoupon from 'src/api/member/apiDrawMemberFreeCoupon';
  import {getScheme, setScheme} from 'nativeFix';

  import apiTask from 'api/user/apiTask';
  import apiSign from 'api/user/apiSign';

  import Notice from 'app/member/modules/Notice';//zujian
  import AdBanner from 'app/member/modules/AdBanner';//zujian

  export default {
    components: {
      Notice,
      AdBanner
    },
    computed:{
      noticeList() {
        let list = [];
        this.rollPointRecord.forEach(item => {
          list.push({
//            text: item.rollPointStr||"",
            text: item.rollPointStr||'',
            headImg:item.headImage||''
          })
        });
        return list;
      }
    },
    data: () => {
      return {
        show: false,
        isApp: isApp(),
        title: '个人会员',
        personalUp:'',
//        rightsMemberCouponVOList:[],
        rollPointRecord:[],
        advUp:[],
        advDown:[],
        userId:'',
        tipsDialog:false,
        tipsDialogTxt:'',
        todayChecked:'',
        ongoingPersonalRights:[]
      }
    },
    filters:{
      format(date){
        let time = new Date(date);
        let y = time.getFullYear();
        let m = time.getMonth()+1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y+'年'+m+'月'+d+'日';
      }
    },
    methods:{

      gotoApp(url){
        if(this.isApp) {
          setScheme(url);
        } else {
            this.$openApp(url);
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
      linkto(item) {
        let router = '/v2/membership/carddetail?code='+item.couponTypeCode+'_'+item.id+'_'+encodeURIComponent(item.couponName);
        if(isApp()) {
          let url = getLocation().origin + router;
          this.$DANativeApi.navigateTo({
            url
          })
        } else {
          this.$router.push(router);
        }
      },
      sign:function (item) {
        apiSign({
          data: {"taskCode":item.toString(),"userId":this.userId}
        }).then(res => {
          this.tipsDialogFn(res.rewardPoint);
          this.getTask();
        })
      },
      tipsDialogFn (n){
        this.tipsDialogTxt = n;
        this.tipsDialog = true;
        let t = window.setTimeout( ()=> {
          this.tipsDialog = false;
          window.clearInterval(t);
        }, 2000);
      },
      gototask:function () {
        if(this.isApp) {
          let url = getLocation().origin + '/v2/task';
          this.$DANativeApi.navigateTo({
            url
          })
        } else {
          this.$router.push({path: '/v2/task'});
        }
      },
      getPersonalUp (){
        apiPersonalUp().then(res => {
              console.log(res);
              this.show = true;
              this.personalUp = res;
//              this.rightsMemberCouponVOList = res.rightsMemberCoupon.rightsMemberCouponVOList;
              this.rollPointRecord = res.rollPointRecord;
              this.advUp = res.advUp;
        })
      },
      getPersonalDown (){
        apiPersonalDown().then(res => {
          console.log(res);
          this.ongoingPersonalRights = res.ongoingPersonalRights;
          this.advDown = res.advDown;
        })
      },
      getTask (){
        apiTask().then(res => {
          this.todayChecked = res.week_checkin.todayChecked;
        })
      },
      getCoupon(item){
          if(item.obtained == 0){
            apiDrawMemberFreeCoupon({couponBatchId:item.id}).then(res =>{
              console.log(res);
              this.$toast(res.data.msg);
              this.getPersonalUp();
            })
          }else if(item.obtained == 1){
            if(this.isApp) {
              setScheme('couponList');
            } else {
              window.location.href = '/coupon/list'
            }
          }
      }
    },
    created() {
      isLogin({
        success: () => {
          this.getPersonalUp();
          this.getPersonalDown();
          this.getTask();
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
      this.userId = this.$store.state.userInfo.userId || '';
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  .swiper-wrapper .img-wrap{
    background: #ffffff!important;
  }
  .my-trans-enter-active, .my-trans-leave-active {
    transition: all .4s ease-out;
  }
  .my-trans-enter {
    transform: translateY(200px);
    opacity: 0;
  }
  .my-trans-leave-active {
    transform: translateY(200px);
    opacity: 0;
  }

  .v3-member-company{
    background: #ffffff;
  }
  .black-bg{
    width: 100%;
    height: 3.9rem;
    background: #1d1d1d;
  }
  .company-container{
    margin-top: -3.64rem;
    .company-info{
      width: 100%;
      padding-bottom: 0.64rem;
      /*height: 9.54rem;*/
      background: #FFFFFF;
      box-shadow: 0 5px 10px 0 rgba(0,0,0,0.05);
      border-radius: 8px;
      margin: 0 auto;
      position: relative;
      .type-icon{
        min-width: 1.08rem;
        height: 0.4rem;
        position: absolute;
        left: 0.32rem;
        top: 0.4rem;
        background: url("https://assets.urwork.cn/image/v3/member/pre-vip-icon.png") no-repeat;
        background-size: 100% 100%;
        span{
          width: 53px;
          height: 20px;
          font-family: PingFangSC-Semibold;
          font-size: 11px;
          color: #FFFFFF;
          float: right;
          text-align: right;
          line-height: 0.44rem;
          padding-right: 4px;
        }
      }
      .type{
        position: absolute;
        right: 0.32rem;
        top: 0.4rem;
        span{
          width: 66px;
          height: 20px;
          display: inline-block;
          font-family: PingFangSC-Regular;
          background: url(https://assets.urwork.cn/image/v3/member/suixin-vip.png) no-repeat;
          background-size: contain;
        }
        .super-vip{
          background: url("https://assets.urwork.cn/image/v3/member/super-vip.png") no-repeat;
          background-size: contain;
        }
      }
      .item-img{
        display: flex;
        justify-content: center;
        padding-top: 0.88rem;
        .img{
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #E8E8E8;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: block;
            object-fit: cover;
          }
        }
      }
      .item-name{
        margin-top: 0.4rem;
        display: flex;
        justify-content: center;
        p{
          font-family: PingFang-SC-Bold;
          font-size: 18px;
          color: #1D1D1D;
          font-weight: 500;
          line-height: 18px;
          max-width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .item-point{
        margin-top: 0.3rem;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        text-align: center;
        .point-box{
          position: relative;
          display: inline-block;
          /*display: flex;*/
          /*flex-direction: column;*/
          /*justify-content: center;*/
          /*align-items: center;*/
          .point-num{
            font-family: DINPro-Bold;
            font-size: 24px;
            color: #B28700;
            text-align: center;
            line-height: 24px;
            font-weight: 600;
          }
          .point-text{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #808080;
            line-height: 14px;
            position: absolute;
            right: -32px;
            top: 7px;
          }
          .go-point-page{
            display: none;
            width: 11px;
            height: 11px;
            position: absolute;
            right: -47px;
            top: 9px;
            background: url("https://assets.urwork.cn/image/v3/member/right.png") no-repeat;
            background-size: contain;
          }
        }
      }
      .item-line{
        margin-top: 23px;
        text-align: center;
        line-height: 0;
        span{
          display: inline-block;
          width: 80px;
          height: 2px;
          background: #e8e8e8;
          transform: scale(0.5);
        }
      }
      .item-rank{
        margin-top: 25px;
        text-align: center;
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #1D1D1D;
        font-weight: 400;
        .top-three{
          ul{
            display: flex;
            justify-content: space-between;
            margin-top: 0.4rem;
            padding: 0 0.24rem;
            li{
              img{
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 50%;
              }
              .name{
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                color: #808080;
                text-align: center;
                margin-top: 0.187rem;
              }
              .point{
                font-family: DINPro-Bold;
                font-size: 16px;
                color: #B28700;
                text-align: center;
                line-height: 16px;
                margin-top: 0.16rem;
              }
            }
          }
        }
      }
    }
    .items{
      padding-bottom: 0.46rem;
      .item{
        padding: 0 20px;
        h2{
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #1D1D1D;
          line-height: 24px;
          padding-top: 48px;
          font-weight: 700;
        }
      }
      .item-welfare{
        padding: 0;
        h2{
          padding-left: 20px;
          padding-right: 20px;
        }
        .welfare-content{
          padding-top: 24px;
          overflow: hidden;
          margin-bottom: 8px;
          padding-left: 20px;
          .coupon{
            white-space: nowrap;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            margin-bottom: -10px;
            li{
              display: inline-block;
              margin-right: 21px;
              margin-bottom: 10px;
              &:last-of-type{
                margin-right: 0px;
              }
              a{
                width: 4rem;
                height: 2.1rem;
                overflow: hidden;
                background: url("https://assets.urwork.cn/image/v3/member/per-coupon-bg.png") no-repeat;
                background-size: 100% 100%;
                display: flex;
                .left{
                  width: 3.06rem;
                  padding:0.2rem 0 0.12rem 0.27rem;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  .line1{
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    .name{
                      font-family: PingFangSC-Semibold;
                      font-size: 14px;
                      color: #1D1D1D;
                      max-width: calc(100% - 0.9rem);
                      text-overflow: ellipsis;
                      overflow: hidden;
                      white-space: nowrap;
                    }
                    .status{
                      width: 0.72rem;
                      display: inline-table;
                      font-family: PingFangSC-Regular;
                      font-size: 10px;
                      color: #FFFFFF;
                      background: #B7A98B;
                      border-radius: 2px;
                      margin-left: 0.07rem;
                      text-align: center;
                      margin-top: -1px;//上移1px
                    }
                  }
                  .line2{
                    font-weight: 600;
                    line-height: 1;
                    .y{
                      font-family: PingFangSC-Semibold;
                      font-size: 16px;
                      color: #B28700;
                    }
                    .price{
                      font-family: PingFangSC-Semibold;
                      font-size: 24px;
                      color: #B28700;
                    }
                  }
                  .line3{
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #999999;
                  }
                  .line4{
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #B28700;
                  }
                }
                .right{
                  flex: 1;
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #452F09;
                  text-align: right;
                  padding-top: 0.25rem;
                  padding-right: 0.22rem;
                }
              }
            }
            .grey{
              a{
                width: 4rem;
                height: 2.1rem;
                overflow: hidden;
                background: url("https://assets.urwork.cn/image/v3/member/per-coupon-greybg.png") no-repeat;
                background-size: 100% 100%;
                display: flex;
                .left{
                  width: 3.06rem;
                  padding:0.2rem 0 0.12rem 0.27rem;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  .line1{
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    .name{
                      font-family: PingFangSC-Semibold;
                      font-size: 14px;
                      color: #1D1D1D;
                      max-width: calc(100% - 0.9rem);
                      text-overflow: ellipsis;
                      overflow: hidden;
                      white-space: nowrap;
                    }
                    .status{
                      width: 0.72rem;
                      display: inline-table;
                      font-family: PingFangSC-Regular;
                      font-size: 10px;
                      color: #FFFFFF;
                      background: #999999;
                      border-radius: 2px;
                      margin-left: 0.07rem;
                      text-align: center;
                    }
                  }
                  .line2{
                    font-weight: 600;
                    line-height: 1;
                    .y{
                      font-family: PingFangSC-Semibold;
                      font-size: 16px;
                      color: #C4C4C4;
                    }
                    .price{
                      font-family: PingFangSC-Semibold;
                      font-size: 24px;
                      color: #C4C4C4;
                    }
                  }
                  .line3{
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #A7A7A7;
                  }
                  .line4{
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #C4C4C4;
                  }
                }
                .right{
                  flex: 1;
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #452F09;
                  text-align: right;
                  padding-top: 0.5rem;
                  padding-right: 0.22rem;
                }
              }
            }
          }
        }
        .open-vip{
          height: 41px;
          line-height: 41px;
          border-radius: 21px;
          background: url("https://assets.urwork.cn/image/v3/member/per-open-vip.png") no-repeat;
          background-size: 100% 100%;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #452F09;
          letter-spacing: 1.88px;
          text-align: center;
          margin: 24px 20px 0 20px;
        }
      }
      .item-earn{
        padding: 0;
        h2{
          padding-left: 20px;
          padding-right: 20px;
        }
        .earn-content{
          ul{
            margin-top: 0.25rem;
            padding: 0 20px;
            li{
              padding: 0.37rem 0;
              position: relative;
              @include border-bottom(#D1D1D1);
              &:last-of-type{
                @include border-bottom(#ffffff);
              }
              display: flex;
              align-items: center;
              justify-content: space-between;
              .left{
                h4{
                  font-family: PingFangSC-Medium;
                  font-size: 16px;
                  color: #1D1D1D;
                  letter-spacing: 0;
                }
                p{
                  font-family: PingFangSC-Semibold;
                  font-size: 12px;
                  color: #808080;
                  letter-spacing: 0;
                }
              }
              .right{
                width: 80px;
                height: 32px;
                line-height: 32px;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #1D1D1D;
                text-align: center;
                border: 1px solid #D6D6D6;
                border-radius: 3px;
                a{
                  width: 100%;
                  height: 100%;
                  display: inline-block;
                }
              }
            }
          }
          .notice{
            width: 100%;
            height: 45px;
            padding: 0 20px;
            background: #F8F8F9;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #808080;
            line-height: 45px;
            p{
              display: flex;
              align-items: center;
              justify-content: flex-start;
              img{
                width: 25px;
                height: 25px;
                border-radius: 50%;
              }
              em{
                color: #000000;
              }
            }

          }
        }
      }
      .item-gift1{
        .gift-content{
          padding: 0.48rem 0;
          .three{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .bag {
              /*position: relative;*/
              .butn{
                /*width: 80px;*/
                /*height: 32px;*/
                /*display: inline-block;*/
                /*font-family: PingFangSC-Medium;*/
                /*font-size: 14px;*/
                /*color: #1D1D1D;*/
                /*line-height: 32px;*/
                /*text-align: center;*/
                /*border: 1px solid #D6D6D6;*/
                /*border-radius: 3px;*/
              }
            }
            .one-line{
              width: 100%;
              height: 3.6rem;
              border-radius: 4px;
              overflow: hidden;
              background: url("https://assets.urwork.cn/image/v3/member/taste-package.png") no-repeat;
              background-size: 100% 100%;
              margin-bottom: 12px;
              .right{
                float: left;
                padding-left: 41px;
                .bag-name{
                  font-family: PingFang-SC-Bold;
                  font-size: 20px;
                  color: #FFFFFF;
                  letter-spacing: 0.48px;
                  line-height: 20px;
                  margin-top: 0.94rem;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .bag-price{
                  font-family: PingFang-SC-Bold;
                  font-size: 33.33px;
                  color: #FDE72C;
                  letter-spacing: 0.81px;
                  line-height: 33.33px;
                  margin-top: 0.12rem;
                }
                .butn{
                  margin-top: 0.3rem;
                  width: 80px;
                  height: 32px;
                  display: inline-block;
                  font-family: PingFangSC-Medium;
                  font-size: 14px;
                  color: #ffffff;
                  line-height: 32px;
                  text-align: center;
                  border: 1px solid #ffffff;
                  border-radius: 3px;
                  background: transparent;
                }
              }
            }
            .two-line{
              width: 48.3%;
              height: 4.52rem;
              border-radius: 4px;
              overflow: hidden;
              background: rgba(186,193,200,0.1);
              border-radius: 3px;
              display: flex;
              flex-direction: column;
              align-items: center;
              .fle{
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
                width: 100%;
                height: 3.24rem;
              }
              &:nth-of-type(2){
                .fle{
                  background: #7F6D5C;
                }
                .img{
                  background: url("https://assets.urwork.cn/image/v3/member/huiyishi.png") no-repeat;
                  background-size: 100% 100%;
                }
              }
              &:nth-of-type(3){
                .fle{
                  background: #5D6778;
                }
                .img{
                  background: url("https://assets.urwork.cn/image/v3/member/qiyetuiguang.png") no-repeat;
                  background-size: 100% 100%;
                }
              }
              .bag-name{
                font-family: PingFang-SC-Bold;
                font-size: 16px;
                letter-spacing: 0.39px;
                text-align: center;
                margin-top: 0.42rem;
                color: #ffffff;
              }
              .bag-price{
                font-family: PingFang-SC-Bold;
                font-size: 16px;
                letter-spacing: 0.58px;
                text-align: center;
                color: #ffffff;
                margin-top: -20px;
              }
              .img{
                width:2.36rem;
                height: 1.43rem;
                display: inline-block;
              }
              .butn{
                margin-top: 0.24rem;
                width: 80px;
                height: 32px;
                display: inline-block;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #1D1D1D;
                line-height: 32px;
                text-align: center;
                border: 1px solid #D6D6D6;
                border-radius: 3px;
              }
            }
          }
        }
        .all-gift{
          width: 100%;
          height: 48px;
          text-align: center;
          line-height: 48px;
          background: rgba(186,193,200,0.1);
          border-radius: 3px;
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #1D1D1D;
        }
      }

      .item-gift{
        .right-content{
          padding-top: 20px;
          .three{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .bag{
              width: calc(50% - 6px);
              height: 4.52rem;
              border-radius: 4px;
              .img{
                width: 100%;
                height: 100%;
                border-radius: 4px;
                overflow: hidden;
                background: #DAE5F1;
              }
              &:first-child{
                width: 100%;
                height: 3.6rem;
                margin-bottom: 12px;
              }
            }
          }
        }
        .all-gift{
          width: 100%;
          height: 48px;
          text-align: center;
          line-height: 48px;
          background: rgba(186,193,200,0.1);
          border-radius: 3px;
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #1D1D1D;
          margin-top: 20px;
          display: inline-block;
        }
      }

      .item-select{
        .coupon-content{
          padding-top: 0.48rem;
          .two{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            /* padding-bottom: 0.48rem; */
            .bag{
              width: 48%;
              background: rgba(186, 193, 200, 0.1);
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 0.4rem;
              margin-bottom: 0.48rem;
              border-radius: 3px;
              overflow: hidden;
              .img{
                width: 100%;
                height: 2.6rem;
                /*background: url("https://assets.urwork.cn/image/v3/member/huiyishi.png") no-repeat;*/
                /*background-size: 100% 100%;*/
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              .bag-name{
                width: 100%;
                font-family: PingFang-SC-Bold;
                font-size: 16px;
                color: #1D1D1D;
                text-align: center;
                margin-top: 0.24rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 500;
                padding: 0 12px;
              }
              .bag-btn{
                width: 1.6rem;
                height: 0.64rem;
                margin-top: 0.32rem;
                line-height: 0.64rem;
                text-align: center;
                border: 1px solid #d6d6d6;
                border-radius: 3px;
                color: #1D1D1D;
                font-family: PingFang-SC-Bold;
                font-size: 14px;
                font-weight: 500;
              }
            }
          }
        }
        .all-rights{
          width: 100%;
          height: 48px;
          text-align: center;
          line-height: 48px;
          background: rgba(186,193,200,0.1);
          border-radius: 3px;
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #1D1D1D;
          display: inline-block;
        }
      }
      .item-serve{
        .serve-content{
          padding-top: 20px;
          .three{
            height: 3.44rem;
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.24rem;
            .bag{
              background: rgba(186, 193, 200, 0.1);
            }
            .bag-name{
              font-family: PingFangSC-Semibold;
              font-size: 16px;
              color: #1D1D1D;
              line-height: 16px;
              font-weight: 500;
            }
            .bag-price{
              font-family: PingFang-SC-Medium;
              font-size: 12px;
              color: #808080;
              letter-spacing: 0;
              line-height: 12px;
            }
            .left{
              width: 48%;
              height: 100%;
              .bag{
                width: 100%;
                height: 100%;
                border-radius: 3px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .bag-name{
                  margin-top: 0.32rem;
                }
                .bag-price{
                  margin-top: 0.16rem;
                }
                .img{
                  width: 1.9rem;
                  height: 1.9rem;
                  margin-top: 0.3rem;
                  border-radius: 6px;
                  overflow: hidden;
                  background: #DAE5F1;
                  display: flex;
                }
              }
            }
            .right{
              width: 48%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .bag{
                width: 100%;
                height: 47%;
                border-radius: 3px;
                display: flex;
                align-items: center;
                padding-left: 0.3rem;
                .img{
                  width: 0.8rem;
                  height: 0.8rem;
                  overflow: hidden;
                  background: #DAE5F1;
                  display: flex;
                }
                .txt{
                  margin-left: 0.16rem;
                  .bag-price{
                    margin-top: 0.16rem;
                  }
                }
              }
            }

          }
          .ul{
            width: 100%;
            height: 57px;
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            li{
              width: 31%;
              height: 100%;
              background: rgba(186,193,200,0.1);
              font-family: PingFangSC-Semibold;
              font-size: 16px;
              color: #1D1D1D;
              text-align: center;
              font-weight: 500;
              line-height: 57px;
              border-radius: 3px;
            }
          }
        }
      }
      .ad{
        width: 100vw;
        height: 36vw;
        margin: 20px 0 0 0;
        img{
          width: 100vw;
          height: 36vw;
        }
      }
      .luckey{
        padding: 0 20px;
        margin-top: 48px;
      }
    }
  }
/*签到积分提示*/
  #point-mask{
    width: 100%;
    height: 60px;
    padding: 0 10px;
    position: fixed;
    bottom: 10%;
    z-index: 9999;
    .content{
      height: 100%;
      background: rgba(0,0,0,0.8);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content:space-between;
      padding: 0 15px;
      .left{
        display: flex;
        align-items: center;
        justify-content:space-between;
        .p{
          margin-left: 10px;
          h4{
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;
          }
          p{
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #FFFFFF;
            letter-spacing: 0;
          }
        }
        .logo{
          width: 24px;
          height: 24px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .add-point{
        font-family: PingFangSC-Semibold;
        font-size: 15px;
        color: #F0484C;
        letter-spacing: 0;
      }
    }
  }
</style>

