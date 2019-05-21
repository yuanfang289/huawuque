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
          <div class="company-info-box">
            <div v-if="companyUp != -1" class="company-info">
              <div class="type">
                <span v-if="companyUp.isAuthenticate == 1"></span>
              </div>
              <div class="item-img">
                <div class="img" v-if="companyUp.companyLogo">
                  <img :src="companyUp.companyLogo" onerror="javascript:this.src='https://assets.urwork.cn/image/v3/member/default-company.jpg';">
                </div>
                <div class="img" v-else="">
                  <img src="https://assets.urwork.cn/image/v3/member/default-company.jpg">
                </div>
              </div>
              <div class="item-name">
                <p>{{companyUp.companyName}}</p>
              </div>
              <div class="item-point" @click="mylinkto('/v2/market/points?companyId='+companyUp.companyId)">
                <div class="point-box">
                  <p class="point-num">{{companyUp.balance}}</p>
                  <p class="point-text">积分</p>
                  <div class="go-point-page">
                    <!--<i class="uricon-arrow-right"></i>-->
                  </div>
                </div>
              </div>
              <div class="item-line" v-if="companyUp.userContributePointsList&&companyUp.userContributePointsList.length >= 3">
                <span></span>
              </div>
              <div class="item-rank" v-if="companyUp.userContributePointsList&&companyUp.userContributePointsList.length >= 3">
                <h4>企业积分贡献榜</h4>
                <div class="top-three">
                  <ul>
                    <a v-for="item in companyUp.userContributePointsList" :href="'/user/userDetail?userId='+item.userId">
                      <li>
                        <img :src="item.headImage" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">
                        <p class="name">{{item.userName}}</p>
                        <p class="point">{{item.score}}</p>
                      </li>
                    </a>
                    <!--<a :href="'/user/userDetail?userId='+'147217'">-->
                    <!--<li>-->
                    <!--<img src="https://api.dujin.org/pic/" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">-->
                    <!--<p class="name">王立韩</p>-->
                    <!--<p class="point">12000</p>-->
                    <!--</li>-->
                    <!--</a>-->
                    <!--<a :href="'/user/userDetail?userId='+'147217'">-->
                    <!--<li>-->
                    <!--<img src="https://api.dujin.org/pic/" onerror="javascript:this.src='https://assets.urwork.cn/image/headImg.png';">-->
                    <!--<p class="name">王立韩</p>-->
                    <!--<p class="point">12000</p>-->
                    <!--</li>-->
                    <!--</a>-->
                  </ul>
                </div>
              </div>
            </div>
            <div v-else="" class="company-info">
              <div class="img">
                <img src="https://assets.urwork.cn/image/v3/member/wuqiye.png">
              </div>
              <div class="text">
                <p>加入企业，获取更多优质资源</p>
              </div>
              <div class="join">
                <a href="javascript:void(0);" @click="goJoinCompany()">
                  + 加入企业
                </a>
              </div>
            </div>
          </div>
          <div class="items">
            <!--<div class="item item-gift">-->
                <!--<h2>企业超值礼包</h2>-->
               <!--<div class="gift-content">-->
                 <!--<div class="three">-->
                    <!--<div class="bag one-line">-->
                      <!--<div class="right">-->
                        <!--<p class="bag-name">企业尝鲜包</p>-->
                        <!--<p class="bag-price">￥666</p>-->
                        <!--<div class="butn">立即领取</div>-->
                      <!--</div>-->
                    <!--</div>-->
                   <!--<div class="bag two-line">-->
                     <!--<div class="fle">-->
                       <!--<p class="bag-name">企业尝鲜包</p>-->
                       <!--<p class="bag-price">￥666</p>-->
                       <!--<div class="butn">立即领取</div>-->
                     <!--</div>-->

                     <!--<div class="img">-->

                     <!--</div>-->
                   <!--</div>-->
                   <!--<div class="bag two-line">-->
                     <!--<div class="fle">-->
                       <!--<p class="bag-name">企业尝鲜包</p>-->
                       <!--<p class="bag-price">￥666</p>-->
                       <!--<div class="butn">立即领取</div>-->
                     <!--</div>-->
                     <!--<div class="img">-->

                     <!--</div>-->
                   <!--</div>-->
                 <!--</div>-->
               <!--</div>-->
               <!--<div class="all-gift">-->
                    <!--全部礼包-->
               <!--</div>-->
            <!--</div>-->
            <div class="item item-gift1" v-if="advDown&&advDown.length>0">
              <h2>超值优惠 礼包随享</h2>
              <div class="right-content">
                <div class="three">
                  <a :href="item.linkUrl" class="bag" v-for="item in advDown">
                    <img class="img" :src="item.image">
                  </a>
                </div>
              </div>
              <div class="all-gift" @click="mylinkto('/v2/mPackage/list')">
                全部礼包
              </div>
            </div>

            <!--<div class="item item-right">-->
              <!--<h2>精选权益 即将开始</h2>-->
              <!--<div class="right-content">-->
                <!--<div class="three">-->
                  <!--<div class="left">-->
                    <!--<div class="bag">-->
                      <!--&lt;!&ndash;<p class="bag-name">企业尝鲜包</p>&ndash;&gt;-->
                      <!--&lt;!&ndash;<p class="bag-price">￥666</p>&ndash;&gt;-->
                      <!--<div class="img">-->
                        <!--<img src="https://image.urwork.cn/Xian.png">-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="right">-->
                    <!--<div class="bag">-->
                      <!--&lt;!&ndash;<p class="bag-name">企业尝鲜包</p>&ndash;&gt;-->
                      <!--&lt;!&ndash;<p class="bag-price">￥666</p>&ndash;&gt;-->
                      <!--<div class="img">-->
                        <!--<img src="https://image.urwork.cn/Xian.png">-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="bag">-->
                      <!--&lt;!&ndash;<p class="bag-name">企业尝鲜包</p>&ndash;&gt;-->
                      <!--&lt;!&ndash;<p class="bag-price">￥666</p>&ndash;&gt;-->
                      <!--<div class="img">-->
                        <!--<img src="https://image.urwork.cn/Xian.png">-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="item item-point">-->
              <!--<h2>积分好礼任意换</h2>-->
              <!--<div class="coupon-content">-->
                <!--<div class="two">-->
                    <!--<div class="bag">-->
                      <!--<div class="img">-->
                        <!--&lt;!&ndash;<img src="https://assets.urwork.cn/image/v3/member/huiyishi.png">&ndash;&gt;-->
                      <!--</div>-->
                      <!--<p class="bag-name">全国会议室礼包</p>-->
                      <!--<div class="bag-btn">立即兑换</div>-->
                    <!--</div>-->
                    <!--<div class="bag">-->
                      <!--<div class="img">-->
                        <!--&lt;!&ndash;<img src="https://assets.urwork.cn/image/v3/member/huiyishi.png">&ndash;&gt;-->
                        <!--<p class="price">￥200</p>-->
                      <!--</div>-->
                      <!--<p class="bag-name">全国会议室礼包</p>-->
                      <!--<div class="bag-btn">立即兑换</div>-->
                    <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->


            <!--轮播-->
            <div v-if="advUp.length>0" class="ad">
              <ad-banner  :bannerList="advUp" :paddingTop="36"></ad-banner>
              <!--<img src="https://assets.urwork.cn/image/v3/member/taste-package.png">-->
            </div>

            <!--轮播-->


            <div class="item item-select" v-if="ongoingCompanyRights&&ongoingCompanyRights.length>0">
              <h2>精选企业权益</h2>
              <div class="coupon-content">
                <div class="two">
                  <div class="bag" v-for="item in ongoingCompanyRights" @click="linkto(item)">
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
                </div>
              </div>
              <div class="all-rights" @click="mylinkto('/v2/membership/Card')">
                全部权益
              </div>
            </div>
            <div class="item item-serve">
              <h2>一键企服</h2>
              <div class="serve-content">
                <div class="three">
                  <div class="left">
                    <a href="/market/serviceAgent" class="bag">
                      <p class="bag-name">财税服务</p>
                      <p class="bag-price">财务统筹管家</p>
                      <div class="img">
                        <img src="https://assets.urwork.cn/image/v3/member/caishui.png">
                      </div>
                    </a>
                  </div>
                  <div class="right">
                    <a href="/market/serviceHuman" class="bag">
                      <div class="img">
                        <img src="https://assets.urwork.cn/image/v3/member/hr.png">
                      </div>
                      <div class="txt">
                        <p class="bag-name">人力资源</p>
                        <p class="bag-price">一站式解决方案</p>
                      </div>
                    </a>
                    <a href="/market/serviceAffairs" class="bag">
                      <div class="img">
                        <img src="https://assets.urwork.cn/image/v3/member/ask.png">
                      </div>
                      <div class="txt">
                        <p class="bag-name">政务咨询</p>
                        <p class="bag-price">从咨询到规划</p>
                      </div>
                    </a>
                  </div>
                </div>
                <ul class="ul">
                  <li><a href=" /market/serviceMarketing">营销推广</a></li>
                  <li><a href="/market/serviceManage">管理输出</a></li>
                  <li><a href="/market/serviceCustom">U定制</a></li>
                </ul>
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
  import store from 'store';
  import apiCompanyUp from 'src/api/member/apiCompanyUp';
  import apiCompanyDown from 'src/api/member/apiCompanyDown';
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
    data: () => {
      return {
        show: false,
        title: '企业会员',
        companyUp:'',
        advUp:[],
        advDown:[],
        ongoingCompanyRights:[]
      }
    },
    methods:{
      goJoinCompany(){
        if(isApp()) {
          setScheme('myCompanyList');
        } else {
            window.location.href = '/company/myCompanyList'
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
      getCompanyUp (){
        apiCompanyUp().then(res => {
          this.show = true;
          this.companyUp = res;
        })
      },
      getCompanyDown (){
        apiCompanyDown().then(res => {
          this.ongoingCompanyRights = res.ongoingCompanyRights;
          this.advDown = res.advDown||[];
          this.advUp = res.advUp||[];
        })
      }
    },
    created() {
      isLogin({
        success: () => {
          this.getCompanyUp();
          this.getCompanyDown();
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

  .swiper-wrapper .img-wrap{
    background: #ffffff!important;
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
    /*padding: 0 20px;*/
    margin-top: -3.64rem;
    .company-info-box{
      padding: 0 20px;
      .company-info{
        width: 100%;
        padding-bottom: 20px;
        background: #FFFFFF;
        box-shadow: 0 5px 10px 0 rgba(0,0,0,0.05);
        border-radius: 8px;
        margin: 0 auto;
        position: relative;
        .type{
          position: absolute;
          right: 0.32rem;
          top: 0.4rem;
          span{
            width: 61px;
            height: 18px;
            display: inline-block;
            background: url("https://assets.urwork.cn/image/v3/member/renzheng-company.png") no-repeat;
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
              /*display: block;*/
              /*object-fit: cover;*/
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
          /*flex-direction: column;*/
          /*justify-content: center;*/
          /*align-items: center;*/
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
              position: absolute;
              right: -32px;
              top: 4px;
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
              justify-content: space-around;
              margin-top: 0.4rem;
              padding: 0 15px;
              a{
                width: 33.33%;
                li{
                 width: 100%;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  img{
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 50%;
                    display: block;
                    object-fit: cover;
                  }
                  .name{
                    width: 100%;
                    font-family: PingFang-SC-Medium;
                    font-size: 14px;
                    color: #808080;
                    text-align: center;
                    line-height: 16px;
                    margin-top: 0.167rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  .point{
                    font-family: DINPro-Bold;
                    font-size: 16px;
                    color: #B28700;
                    text-align: center;
                    line-height: 16px;
                    margin-top: 0.16rem;
                    font-weight: 500;
                  }
                }
              }

            }
          }
        }

        >.img{
          text-align: center;
          padding: 40px 0 16px 0;
          img{
            width: 55px;
            height: 66px;
            display: inline-block;
          }
        }
        .text{
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #999999;
          text-align: center;
        }
        .join{
          text-align: center;
          margin-top: 28px;
          a{
            display: inline-block;
            width: 95px;
            height: 32px;
            line-height: 32px;
            border: 1px solid #D6D6D6;
            border-radius: 3px;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #1D1D1D;
          }
        }
      }
    }
    .items{
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
      .item-gift{
        .gift-content{
          padding: 0.48rem 0;
          .three{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .bag {
              /*position: relative;*/
              .butn{
                display: inline-block;
                font-family: PingFang-SC-Bold;
                font-size: 12px;
                color: #FFFFFF;
                letter-spacing: 0.29px;
                text-align: center;
                line-height: 12px;
                background: rgba(29,29,29,0.3);
                border-radius: 4px;
                padding: 6px 8px;
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
                width: 45%;
                float: right;
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
                }
              }
            }
            .two-line{
              width: 48.3%;
              height: 4.25rem;
              border-radius: 4px;
              overflow: hidden;
              background-size: 100% 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              .fle{
                display: flex;
                align-items: center;
                flex-direction: column;
              }
              &:nth-of-type(2){
                background: #DAE5F1;
                .bag-name{
                  color: #526171;
                }
                .bag-price{
                  color: #00C7E4;
                }
                .img{
                  background: url("https://assets.urwork.cn/image/v3/member/huiyishi.png") no-repeat;
                  background-size: 100% 100%;
                }
              }
              &:nth-of-type(3){
                background: #FFEABD;
                .bag-name{
                  color: #7D6F52;
                }
                .bag-price{
                  color: #D87000;
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
                line-height: 16px;
                font-weight: 400;
                margin-top: 0.42rem;
              }
              .bag-price{
                font-family: PingFang-SC-Bold;
                font-size: 24px;
                letter-spacing: 0.58px;
                text-align: center;
                line-height: 24px;
                font-weight: 600;
                margin-top: 0.13rem;
              }
              .img{
                width:2.4rem;
                height: 1.32rem;
                display: inline-block;
              }
              .butn{
                margin-top: 0.14rem;
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
      .item-gift1{
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
        }
      }
      .item-right{
        .right-content{
          padding-top: 20px;
          .three{
            height: 5.44rem;
            display: flex;
            justify-content: space-between;
            .left{
              width: 48%;
              height: 100%;
              .bag{
                width: 100%;
                height: 100%;
                border-radius: 6px;
                .img{
                  width: 100%;
                  height: 100%;
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
                height: 48%;
                border-radius: 4px;
                .img{
                  width: 100%;
                  height: 100%;
                  border-radius: 4px;
                  overflow: hidden;
                  background: #DAE5F1;
                  display: flex;
                }
              }
            }
          }
        }
      }
      .item-point{
        .coupon-content{
          padding-top: 0.48rem;
          .two{
            display: flex;
            justify-content: space-between;
            .bag{
              width: 48%;
              background: rgba(186, 193, 200, 0.1);
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 0.4rem;
              .img{
                width: 2.4rem;
                height: 1.34rem;
                margin-top: 0.64rem;
                background: url("https://assets.urwork.cn/image/v3/member/huiyishi.png") no-repeat;
                background-size: 100% 100%;
                display: flex;
                justify-content: center;
                .price{
                  font-family: PingFang-SC-Bold;
                  font-size: 20px;
                  color: #FFFFFF;
                  letter-spacing: 0.48px;
                  font-weight: 500;
                  padding-top: 0.2rem;
                }
              }
              &:nth-of-type(2){
                .img{
                  background: url("https://assets.urwork.cn/image/v3/member/daijinquan.png") no-repeat;
                  background-size: 100% 100%;
                }
              }
              .bag-name{
                font-family: PingFang-SC-Bold;
                font-size: 16px;
                color: #1D1D1D;
                text-align: center;
                line-height: 16px;
                margin-top: 0.94rem;
              }
              .bag-btn{
                width: 1.6rem;
                height: 0.64rem;
                margin-top: 0.32rem;
                line-height: 0.64rem;
                text-align: center;
                border: 1px solid #1D1D1D;
                border-radius: 3px;
                color: #1D1D1D;
                font-family: PingFang-SC-Bold;
                font-size: 14px;
              }
            }
          }
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
          padding: 20px 0;
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
                  display: flex;
                }
              }
            }
            .right{
              width: 48%;
              height: 100%;
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
              a{
                width: 100%;
                height: 100%;
                display: inline-block;
              }
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
    }
  }
</style>

