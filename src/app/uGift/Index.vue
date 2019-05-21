<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div class="ugift-list">
        <ul>
          <gift-list :apiFn="apiFn"
                     :pageSize="20"
                     :queryData="{}"
          >
            <template slot-scope="{item}">
              <li>
                <div class="top">
                  <span class="order-code">订单号 {{item.orderId}}</span>
                  <span class="order-status">{{item.orderStatusDesc}}</span>
                </div>
                <div class="mid" @click="toDetail(item.orderId)">
                  <div class="img">
                    <img height="74px" width="74px" :src="item.bgImage+'?imageMogr2/thumbnail/74x74'" onerror="javascript:this.src='https://assets.urwork.cn/image/ugift/g_def.png'"/>
                  </div>
                  <div class="info">
                    <div class="name-price"><p class="name">{{item.memberPackageName}}</p>
                      <span v-if="item.isOtherPay!=3" class="price">￥{{item.packagePrice}}</span>
                      <span v-if="item.isOtherPay==3" class="price">{{item.packagePrice}}积分</span>
                    </div>
                    <div class="company-num"><p class="company">{{item.companyName}}</p><span
                      class="num">x{{item.packageCount}}</span></div>
                  </div>
                </div>
                <div class="bot">
                  <span class="total">共{{item.packageCount}}件</span>
                  <span v-if="item.isOtherPay!=3" class="price">实付： <em>￥{{item.payAmount}}</em></span>
                  <span v-if="item.isOtherPay==3" class="price">实付： <em>{{item.payAmount}}积分</em></span>
                  <!--orderStatus	Y	int	订单状态，数值类型 （0 待支付； 1已支付； 4已取消； 6 超时未支付取消）-->
                  <span v-if="item.needOpen" class="butn" @click="toDetail(item.orderId)">激活礼包</span>
                  <span v-if="item.orderStatus===0" class="pay-butn" @click="toPay(item.orderId)">立即支付</span>
                </div>
              </li>
            </template>
          </gift-list>
        </ul>
      </div>

      <div id="mask" v-show="dialog">
        <div class="dialog">
          <div class="content">
            <p>确认要激活使用U礼包嘛？</p>
            <span>礼包中的代金券将存入您的个人账户</span>
          </div>
          <div class="bot">
            <div class="close" @click="dialogFn(0)">
              我想想
            </div>
            <div class="sure" @click="dialogFn(0)">
              确认退款
            </div>
          </div>

        </div>
        <div class="form" v-html="form"></div>
      </div>
    </page-main>

  </page-wrap>
</template>

<script>
  import apiOrderList from 'api/uGifts/apiOrderList';
  import GiftList from 'component/list/GiftList';
  import apiPay from 'api/uGifts/apiPay';
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  export default {
    components: {
      GiftList
    },
    data: () => {
      return {
        show: false,
        title: 'U礼包订单',
        dialog: false,
        data: [],
        pageSize: 20,
        currentPageNo: 0,
        totalPages: -1,
        apiFn: apiOrderList,
        payment:1,              // 支付方式 3  微信   1支付宝
        channel:4,            // 渠道
        form:'<form></form>', //form表单
        paying:0,
        orderId:0,
      }
    },
    methods: {
      dialogFn(n) {
        n == 1 ? this.dialog = true : this.dialog = false;
      },
      getData(){
        apiOrderList({currentPageNo: this.currentPageNo}).then(res => {
//            this.data=res.result;
//            this.totalPages=res.totalRecord;
          this.show = true;
        })
      },
      toPay(orderId){
          if(this.paying){return}
          let data={};
        //data.channelCode =this.channel;
        data.payUser
        data.channel =this.channel;
        data.payType=this.payment;
        data.orderId=orderId;
        this.orderId=orderId;
        data.returnUrl= encodeURIComponent('https://m.urwork.cn/v2/ugift/orderDetail?orderId='+orderId);
        apiPay(data).then(res=>{
            if(res){
              if(this.payment==3){
                this.webChatGZH(res);
              }else if(this.payment==1){
                this.form = res.payRequest;
                console.log(res.payRequest,'支付宝串')
                this.$nextTick(function () {
                  document.forms['alipaysubmit'].submit();
                })
              }else{
                alert('暂不支持此种支付方式！');
              }
            }else{
              this.$toast("订单状态不可支付");
            }
          this.paying=0;
        })


      },
      toDetail(orderId){
        let url = getLocation().origin + '/v2/ugift/orderDetail?orderId='+orderId;
       if(isApp()){
         this.$DANativeApi.navigateTo({
           url
         })
       }else{
         this.$router.push({name: 'orderDetail', query: {orderId: orderId}})
       }

      },
      isWEIxin() {
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true;
        }else{
          return false;
        }
      },
      webChatGZH(data) {
        var  wwdata = JSON.parse(data.payRequest);
        console.log(wwdata,"返回的对象");
        var ww = {};
        var id = this.orderId;
        var _this = this;
        ww.appId = wwdata.appId;
        ww.nonceStr = wwdata.nonceStr;
        ww.timeStamp = wwdata.timeStamp;
        ww.paySign = wwdata.sign;
        ww.package = wwdata.package;
        ww.signType=wwdata.signType;
        function onBridgeReady(){
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',ww,
            function(res){
              if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                _this.$toast("购买成功");
                var uri = '/v2/ugift/orderDetail?orderId='+id;
                location.href = encodeURI(uri);
              }
            }
          );
        }
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        }else{
          onBridgeReady();
        }
      },
    },

    created() {
      this.show = true;
      //this.getData();
      if(this.isWEIxin()){
        this.payment = 3;
        this.channel = 9;
      }else {
//        var u = navigator.userAgent;
//        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//        if(isIOS){
//          this.channel =2;
//        }
      }
    },

    mounted() {
      let userId = this.$store.state.userInfo.userId || '';
      console.log("userId",userId);
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  #main {
    .ugift-list {
      ul {
        padding-bottom: 50px;
        background: #f5f5f5;
        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #ffffff;
          border-top: 15px solid #f5f5f5;
          > div {
            padding: 0 20px;
          }
          .top {
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .order-code {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #797979;
              letter-spacing: 0;
            }
            .order-status {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #FF6C00;
              letter-spacing: 0;
              text-align: right;
            }
          }
          .mid {
            background: #F9F9F9;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            .img {
              width: 74px;
              height: 74px;
              background: #FFFFFF;
              @include border(#d6d6d6);
            }
            .info {
              width: calc(100% - 74px);
              height: 74px;
              padding-left: 15px;
              .name-price {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #424242;
                letter-spacing: 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .name {
                  flex: 1;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
              .company-num {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #666666;
                letter-spacing: 0;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                .company {
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  /* autoprefixer: off */
                  -webkit-box-orient: vertical;
                  /* autoprefixer: on */
                  padding-right: 5px;
                  margin-top: 5px;

                }
                .num {
                  color: #999999;
                }
              }
            }
          }
          .bot {
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            .total {
              margin-right: 5px;
            }
            .price {
              margin-right: 15px;
            }
            .butn {
              font-family: PingFangSC-Regular;
              font-size: 13px;
              color: #DEBA6C;;
              letter-spacing: 0;
              background: #333333;
              border-radius: 3px;
              padding: 3px 9px;
            }
            .pay-butn {
              font-family: PingFangSC-Regular;
              font-size: 13px;
              color: #FFFFFF;
              letter-spacing: 0;
              background: #333333;
              border-radius: 3px;
              padding: 3px 9px;
            }
          }
        }
      }
    }
  }

  #mask {
    width: 100%;
    height: 100%;
    background: rgba(127, 126, 125, 1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    .dialog {
      z-index: 901;
      width: 6rem;
      /*height: 3.4rem;*/
      background-color: #ffffff;
      border-radius: 0.2rem;
      padding: .7rem 0 .4rem 0;
      position: fixed;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .content {
        width: 6rem;
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.62rem 0.45rem 0 0.45rem;
        .close {
          width: 2.4rem;
          height: 0.7rem;
          border: 1px solid #333333;
          border-radius: 0.35rem;
          font-family: PingFangSC-Regular;
          font-size: 0.28rem;
          color: #333333;
          letter-spacing: 0;
          line-height: 0.7rem;
          text-align: center;
        }
        .sure {
          width: 2.4rem;
          height: 0.7rem;
          border: 1px solid #333333;
          border-radius: 0.35rem;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #DEBA6C;
          letter-spacing: 0;
          line-height: 0.7rem;
          text-align: center;
          background: #333333;
        }
      }

    }
  }
</style>

