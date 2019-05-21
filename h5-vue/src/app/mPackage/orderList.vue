<template>
  <page-wrap class="page-user-center" style="background: #f3f3f3">
    <title v-title>{{title}}</title>

    <!--<page-header>-->
      <!--<topbar :type="'back'" :hideShareBtn="true">-->
        <!--<template slot="title">{{title}}</template>-->
      <!--</topbar>-->
    <!--</page-header>-->
    <page-header>
      <topbar :theme="'white'" :type="'backclose'" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle=1>
        <template slot="navigate">
          <a href="javascript:;" slot="navigate" class="xzyaction" @click.prevent="backHandler"><i class="uricon-arrow-left"></i></a>
        </template>
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div class="package-list">
        <ul>
          <package-list :apiFn="apiFn"
                        :pageSize="20"
                        :queryData="{}"
          >
            <template slot-scope="{item}">
              <li>
                <div class="top">
                  <span class="order-code">订单号{{item.orderId}}</span>
                  <!--status 订单状态 0待付款,1待激活,2已激活,4已取消,6已过期-->
                  <span v-if="item.status==0" class="order-status">待付款</span>
                  <span v-if="item.status==1" class="order-status">待激活</span>
                  <span v-if="item.status==4" class="order-status">已取消</span>
                  <span v-if="item.status==6" class="order-status">已过期 </span>

                </div>
                <div v-if="item.status==1" class="alert">激活订单中任意礼包，订单将不可退款</div>
                <template v-for="(item1,index1) in item.orderDetails">
                <div @click="toDetail(item1.spuId,item1.skuId,item.orderId,item1.orderDetailId,item.status,item1.status)" :class="{'mid':true,'mid-second':index1==item.orderDetails-1}">
                  <div class="info">
                    <span class="order-name"><img src="https://assets.urwork.cn/image/mpackage/package-order.png"/>{{item1.name}}</span>
                    <span class="order-price">{{item1.price==0?'免费':'¥'+item1.price}}</span>
                  </div>
                  <div v-if="item1.status==1&&item.status==1" class="active">
                    <span class="active-txt">将于{{item1.autoActiveTimeStr}}自动激活 </span><span @click.stop=" toActive(item1.orderDetailId)" class="active-but">立即激活</span>
                  </div>
                  <!--v-if="item1.status==2"-->
                  <div v-if="item1.status==2" class="active">
                    <span></span><span class="actived">已激活</span>
                  </div>
                  <div v-if="index1<item.orderDetails-1" class="dividers"></div>
                </div>
                </template>
                <div class="bot">
                  <span class="txt">共{{item.orderDetails.length}}件 实付：</span>
                  <span class="item-price">¥{{item.totalAmount}}</span>
                  <span  v-if="item.status==0&&item.totalAmount!=0" class="but-cancel" @click.stop=" toCancel(item.orderId)">取消订单</span>
                  <span   v-if="item.status==0" class="but-pay"   @click.stop=" toPay(item.orderId)">立即支付</span>
                  <span  v-if="item.status==1&&item.totalAmount!=0" class="but-return" @click.stop=" toRefund(item.orderId)">申请退款</span>
                </div>
              </li>


            </template>
          </package-list>

        </ul>
      </div>

      <div id="mask" v-show="dialog">
        <div class="dialog" v-if="toActiveDiv">
          <div class="content">
            <p>是否现在激活？</p>
            <span>确认要激活当前礼包吗？</span>
            <span>礼包中的代金券奖存入您的个人帐户</span>
            <span>各项权益将即时生效</span>
          </div>
          <div class="bot">
            <div class="close" @click="dialogFn(0)">
              再等等
            </div>
            <div class="sure" @click="dialogFn(1)">
              立即激活
            </div>
          </div>

        </div>
        <div class="dialog" v-if="toCancelDiv">
          <div class="content">
            <p class="cancel">真的要取消当前订单吗？</p>
          </div>
          <div class="bot">
            <div class="close" @click="dialogFn(0)">
              再想想
            </div>
            <div class="sure" @click="dialogFn(2)">
              立即取消
            </div>
          </div>

        </div>
        <div class="dialog" v-if="toRefundDiv">
          <div class="content">
            <p class="cancel">真的要申请退款吗？</p>
          </div>
          <div class="bot">
            <div class="close" @click="dialogFn(0)">
              再想想
            </div>
            <div class="sure" @click="dialogFn(3)">
              申请退款
            </div>
          </div>

        </div>
        <div class="form" v-html="form"></div>
      </div>
    </page-main>

  </page-wrap>
</template>

<script>
  import {mapState} from 'vuex'
  import apiOrderList from 'api/mPackage/apiOrderList';
  import PackageList from 'component/list/PackageList';
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  import activeOrder from 'api/mPackage/apiActiveOrder';
  import refundOrder from 'api/mPackage/apiOrderRefund';
  import cancelOrder from 'api/mPackage/apiCancelOrder';

  export default {
    components: {
      PackageList
    },
    data: () => {
      return {
        show: false,
        title: '会员礼包订单',
        dialog: false,
        data: [],
        pageSize: 20,
        currentPageNo: 0,
        totalPages: -1,
        apiFn: apiOrderList,
        payment: 1,              // 支付方式 3  微信   1支付宝
        channel: 4,            // 渠道
        form: '<form></form>', //form表单
        paying: 0,
        orderId: 0,
        toActiveDiv:false,
        toCancelDiv:false,
        toRefundDiv:false,
        currOrderId:0,
        currDetailId:0,
      }
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
      }),
    },
    methods: {
      backHandler(){
        window.location.href =getLocation().origin + '/v2/mPackage/list'+'?time='+((new Date()).getTime());
      },
      isWEIxin() {
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return true;
        } else {
          return false;
        }
      },
      dialogFn(n) {
        if(n ==0){
          this.dialog = false;
        }
        if(n==1){
          activeOrder({targetId:this.currDetailId,channel:4}).then(res=>{
              if(res.retCode==0){
                this.$toast("激活成功");
                window.location.href =getLocation().origin + '/v2/mPackage/orderList'+'?time='+((new Date()).getTime());
              }else{
                this.$toast("激活失败");
              }
          })
            this.dialog = false;
        }
        if(n==2){
          cancelOrder({targetId:this.currOrderId,channel:4}).then(res=>{
            if(res.retCode==0){
              this.$toast("取消成功");
              window.location.href =getLocation().origin + '/v2/mPackage/orderList'+'?time='+((new Date()).getTime());
            }else{
              this.$toast("取消失败");
            }
          })
            this.dialog = false;
        }
        if(n==3){
          refundOrder({targetId:this.currOrderId,channel:4}).then(res=>{
            if(res.retCode==0){
              this.$toast("退款成功");
              window.location.href =getLocation().origin + '/v2/mPackage/orderList'+'?time='+((new Date()).getTime());
            }else{
              this.$toast("退款失败");
            }
          })
            this.dialog = false;
        }

      },
      getData(){
        apiOrderList({currentPageNo: this.currentPageNo}).then(res => {
//            this.data=res.result;
//            this.totalPages=res.totalRecord;
          this.show = true;
        })
      },
      toPay(id){

          if(!this.isLogin){
            passport.toLogin();
          }else{
            var url = getLocation().origin + '/v2/mPackage/toPay?orderId=' + id;
            if(this.isWEIxin()){
              location.href='/pay/redirect?retUrl='+encodeURIComponent(url);
            }
            if (isApp()) {
              this.$DANativeApi.navigateTo({
                url
              })
            } else {
              this.$router.push( '/v2/mPackage/toPay?orderId=' + id);
            }
          }


      },
      toDetail(spuId,skuId,orderId,orderDetailId,status,cstatus){
          let param="spuId="+spuId+"_"+skuId+"_"+orderId+'_'+orderDetailId+"_"+status+'_'+cstatus;
        let url = getLocation().origin + '/v2/mPackage/Detail?' +param;
        if (isApp()) {
          this.$DANativeApi.navigateTo({
            url
          })
        } else {
          this.$router.push('/v2/mPackage/Detail?' +param);
        }
      },
      toRefund(id){
          this.dialog=true;
          this.toActiveDiv=false;
          this.toCancelDiv=false;
          this.toRefundDiv=true;
          this.currOrderId=id;
      },
      toActive(id){
        this.dialog=true;
        this.toActiveDiv=true;
        this.toCancelDiv=false;
        this.toRefundDiv=false;
        this.currDetailId=id;
      },
      toCancel(id){
        this.dialog=true;
        this.toActiveDiv=false;
        this.toCancelDiv=true;
        this.toRefundDiv=false;
        this.currOrderId=id;
      },
    },

    created() {
      this.show = true;
      //this.getData();

    },

    mounted() {
      let userId = this.$store.state.userInfo.userId || '';
      console.log("userId", userId);
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  /deep/ .page-topbar .title{
    opacity: 1;
  }
  #main {
    .package-list {
      margin-top: 0.16rem;
      ul {
        li {
          width: 7.5rem;
          min-height: 3.44rem;
          background: #FFFFFF;
          margin-bottom: 0.16rem;

          .top {
            height: 0.9rem;
            padding-right: 0.4rem;
            padding-left: 0.4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            .order-code {
              color: #797979;
              line-height: 0.9rem;
            }
            .order-status {
              color: #FF6C00;
              text-align: right;
              line-height: 0.9rem;
            }
          }
          .alert {
            height: 0.54rem;
            width: 100%;
            padding-left: 0.4rem;
            background: #FFF5E3;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #FF6C00;
            line-height: 0.54rem;
          }
          .mid {
            background: #F9F9F9;
            min-height: 1.6rem;
            padding-right: 0.4rem;
            padding-left: 0.4rem;
            padding-top: 0.4rem;
            padding-bottom: 0.4rem;
            .info {
              display: flex;
              align-items: center;
              justify-content: space-between;
              color: #333333;
              font-size: 14px;
              background: #F9F9F9;
              font-weight: 500;
              .order-name {
                font-family: PingFangSC-Regular;
                text-align: center;
                line-height: 0.4rem;
                img {
                  padding-right: 0.11rem;
                  height: 22px;
                  width: 22px;
                  padding-bottom: 0.09rem;
                }
              }
              .order-price {
                font-family: PingFangSC-Medium;
                text-align: right;
                line-height: 0.4rem;;
              }
            }
            .active {
              position: relative;
              height: 0.54rem;
              margin-top: 0.24rem;
              line-height: 0.54rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-family: PingFangSC-Regular;
              .active-txt {
                padding-left: 0.48rem;
                font-size: 12px;
                color: #666666;
              }
              .actived{
                font-size: 14px;
                color: #999999;
                text-align: right;
              }
              .active-but {
                display: inline-block;
                width: 1.4rem;
                height: 0.54rem;
                font-size: 13px;
                color: #FF6C00;
                background: #FFFFFF;
                @include border(#FF6C00) {
                  border-radius: 5px;
                }
                line-height: 0.54rem;
                text-align: center;
              }
            }
          }
          .mid-second {
            padding-top: 0rem;
          }
          .dividers {
            width: 6.7rem;
            padding-bottom: 0.38rem;
            position: relative;
            @include border-top(#D8D8D8, 20, dashed);
          }
          .bot {
            padding-right: 0.4rem;
            padding-left: 0.4rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            padding-bottom: 0.2rem;
            padding-top: 0.2rem;
            .item-txt {
              letter-spacing: 0;
            }
            .item-price {
              font-family: PingFangSC-Semibold;
              letter-spacing: 0;
              //padding-right: 0.3rem;
              font-weight: 500;
            }
            .but-return, .but-cancel {
              width: 1.4rem;
              height: 0.54rem;
              margin-left: 0.3rem;
              display: inline-block;
              @include border(#999999) {
                border-radius: 5px;
              }
              color: #666666;
              letter-spacing: 0;
              line-height: 0.54rem;
              text-align: center;
              //margin-right: 0.3rem;

            }
            .but-pay {
              width: 1.4rem;
              height: 0.54rem;
              display: inline-block;
              margin-left: 0.3rem;
              background: #FFFFFF;
              @include border(#FF6C00) {
                border-radius: 5px;
              }

              font-family: PingFangSC-Regular;
              font-size: 13px;
              color: #FF6C00;
              letter-spacing: 0;
              line-height: 0.54rem;
              text-align: center;
            }

          }
        }
      }
    }
  }

  #mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    .dialog {
      z-index: 901;
      width: 6.7rem;
      opacity: 1;
      //height: 3.4rem;
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
        width: 6.7rem;
        /*height: 2.2rem;*/
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p {
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #333333;
          text-align: left;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .cancel {
          margin-bottom: 0.9rem;
        }
        span {
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #666666;
          text-align: center;
        }
      }
      .bot {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.40rem 0.75rem 0 0.75rem;
        .close {
          width: 2.4rem;
          height: 0.7rem;
          @include border(#333333) {
            border-radius: 35px;
          }
        ;

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
          border-radius: 35px;
          //@include border(#333333);

          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #FFFFFF;
          letter-spacing: 0;
          line-height: 0.7rem;
          text-align: center;
          background: #333333;
        }
      }
    }
  }
</style>

