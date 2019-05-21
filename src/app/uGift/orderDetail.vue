<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>
    <main id="main" class="station-main">
      <div class="banner">
        <div class="txt">
          <img v-if="data['orderStatus']===1" src="https://assets.urwork.cn/image/ugift/icon_payment.png">
          <img v-if="data['orderStatus']===0" src="https://assets.urwork.cn/image/ugift/icon_topay.png">
          <img v-if="data['orderStatus']===4||data['orderStatus']===6" src="https://assets.urwork.cn/image/ugift/icon_cancelpay.png">
          <!--orderStatus	Y	int	订单状态，数值类型 （0 待支付； 1已支付； 4已取消； 6 超时未支付取消）-->
          <span v-if="data['orderStatus']===0" class="pay-status">待支付</span>
          <span v-if="data['orderStatus']===1" class="pay-status">已支付</span>
          <span v-if="data['orderStatus']===4" class="pay-status">已取消</span>
          <span v-if="data['orderStatus']===6" class="pay-status">未支付取消</span>
        </div>
      </div>
      <div class="date">
        <div class="point-box">
          <div class="point">
            <div class="p">
              <p class="name"><span class="title">{{data['memberPackageName']}}</span><span
                class="total">共{{data['packageCount']}}个</span></p>
              <p class="company"><span>{{data['companyName']}}</span><span
                v-if="data['orderStatus']===1" class="left">剩余{{to_active_num}}个待激活</span></p>
              <p v-if="isOtherPay!=3" class="price">￥{{data['totalAmount']}}</p>
              <p v-if="isOtherPay==3" class="price">{{data['totalAmount']}}积分</p>
            </div>
          </div>
        </div>
        <div class="all-gift" v-if="data['orderStatus']!=6&&data['orderStatus']!=4&&data['orderStatus']!=0">
          <h4>全部礼包</h4>
          <ul id="gCodeList" :class="{show:showList,close:!showList}">
            <template v-for="(item,index) in data['packageList']">
              <li v-if="item['packageStatus']==1" v-show="index>2?false||showList:true" class="fr">
                <p class="name">{{data['memberPackageName']}}（{{isCompany ? '公司' : '个人'}}包）</p>
                <span v-if="item.packageStatus==1" class="butn" @click="listCode(item.packageId)">激活礼包</span>
              </li>
              <li v-if="item['packageStatus']==2" v-show="index>2?false||showList:true" class="tb">
                <p class="name">{{data['memberPackageName']}}（{{isCompany ? '公司' : '个人'}}包）</p>
                <p class="coupon">
                <span>
                  剩余{{item['remainNum']}}张代金券可用
                </span>
                  <span class="more-coupon" @click="listCode(item.packageId)">
                      <em>查看代金券</em>
                      <i class="uricon-arrow-right"></i>
                </span>
                </p>
              </li>
            </template>

          </ul>
          <p v-if="packageNum>3" id="gCodeListB" :class="{'look-all':!showList,'look-part':showList}" @click="showAll()">{{showTitle}}<span> <i
            class="uricon-arrow-right"></i></span></p>
        </div>
      </div>

      <div v-if="data['orderStatus']==4&&refundInfo&&refundInfo.refundStatus==5" class="gc-return">
        <h4 class="tit">退款失败</h4>
        <ul>
          <li>
            <p>退款失败</p>
          </li>
          <li>
            <p>如有疑问，请联系客服400-1188-891</p>
          </li>

        </ul>
      </div>

      <div v-if="data['orderStatus']==4&&refundInfo&&refundInfo.refundStatus==6" class="gc-return">
        <h4 class="tit">退款中</h4>
        <ul>
          <li>
            <p>申请退款后，礼包中的代金券将从您的账户收回，退款奖在三个工作日内退还至您的付款账户。</p>
          </li>
          <li>
            <p>如有疑问，请联系客服400-1188-891</p>
          </li>

        </ul>
      </div>

      <div v-if="data['orderStatus']==4&&refundInfo&&refundInfo.refundStatus==2" class="gc-return">
        <h4 class="tit">退款成功</h4>
        <ul>
          <li>
            <p><span>退款时间</span>{{refundInfo.refundTime}}</p>
          </li>
          <li>
            <p>如有疑问，请联系客服400-1188-891</p>
          </li>

        </ul>
      </div>

      <div class="explain">
        <h4 class="tit">订单信息</h4>
        <ul>
          <li>
            <p><span>订单编号</span>{{data['orderId']}}</p>
          </li>
          <li v-if="isOtherPay!=3">
            <p><span>订单金额</span>¥{{data['payAmount']}}</p>
          </li>
          <li v-if="isOtherPay==3">
            <p><span>订单积分</span>{{data['payAmount']}}</p>
          </li>
          <li>
            <p><span>订单手机</span>{{data['buyerMobile']}}</p>
          </li>
          <li>
            <p><span>下单时间</span>{{data['createTimeTxt']}}</p>
          </li>
          <li v-if="data['payTime']">
            <p><span>支付时间</span>{{data['payTimeTxt']}}</p>
          </li>

        </ul>
      </div>
      <div style="padding:20px 30px 20px 30px;background-color:#F5F5F5;font-family: PingFangSC-Regular;font-size: 13px;color: #999999;text-align: center;line-height:18px">
        如需使用礼包内的代金券，请点击“激活礼包”，代金券将会存入您的账户并开始计算有效期。<br><br>
        订单内的代金劵全部尚未使用时，可以申请线上退款。如需退款请点击“申请退款”，退款费用会按照原路径退回您的付款账户。<br>
        如需开具发票请联系社区运营或拨打客服电话。<br><br>
        如有任何疑问欢迎拨打客服电话400-1188-891
      </div>
      <div :class="{'kong':data['orderStatus']===0||(data['orderStatus']===1&&data['canRefund']),'kong60':(data['orderStatus']===4||data['orderStatus']===6||!data['canRefund'])}">

      </div>
      <div class="fixed">

        <div class="customer">
          <a href='tel:400-1188-891'>
         <span></span>
          </a>
        </div>

        <div v-if="data['orderStatus']===1&&data['canRefund']&&isOtherPay!=3" class="refund">
          <a href="javascript:void(0)" v-if="data['orderStatus']===1&&data['canRefund']" @click="open_return_div()">
            申请退款
          </a>
        </div>
        <div v-if="data['orderStatus']===0" class="sure">
          <a href="javascript:void(0)" @click="open_cancel_div(orderId)">
            取消订单
          </a>
          <a class="pay" href="javascript:void(0)" @click="toPay(orderId)">
            立即支付
          </a>
        </div>
        <div class="form" v-html="form"></div>
      </div>
    </main>

    <transition name="my-trans">
    <div v-show="showPop" class="pop-back">
      <div class="pop-colse" @click="closePop()"></div>

      <div class="pop-title">{{codeList.memberPackageName}}</div>
      <div :class="{'code-list_div_no_active':curr_isActive,'code-list_div':!curr_isActive}">
      <template v-if="curr_isActive" v-for="item in codeList.listCoupon">
        <template v-for='item1 in item.count?item.count:1'>
        <div class="pop-content">
          <div :class="{'pop-item-used':item.status==1||item.status==3,'pop-item-no-used':item.status==0}"> <!-- pop-item-no-used-->
            <div class="gc-left">
              <div class="gc-value">
                <div class="gc-number">¥ <span class="gc-number-txt">{{item.couponBatch.money}}</span></div>
                <div class="gc-desc" v-if="!item.limitQuantity">无限额使用</div>
                <div class="gc-desc" v-if="item.limitQuantity&&item.limitQuantity>0">满{{item.limitQuantity}}元可用</div>
              </div>
            </div>
            <div :class="{'gc-right':true,'gc-expire':item.status==3||item.status==2}"><!--已经使用 去掉 gc-expire   公司 加 gc-right-company-->
              <div :class="{'gc-desc':!isCompany, 'gc-company-desc':isCompany}"><!--change    gc-company-desc-->
                <div class="gc-name">{{item.couponBatch.couponName}}</div>
                <div class="gc-property"><template v-if="!item.couponBatch.isAllWorkstage">限指定场区可用</template><template v-if="item.couponBatch.isAllWorkstage">全国场区可用</template><br>
                  {{item.startDate}}-{{item.endDate}}
                </div>
                <div v-show="isCompany" class="gc-company">{{codeList.companyName}}...公司员工专用</div> <!--个人 hide-->
              </div>
            </div>
          </div>
        </div>
        </template>
      </template>
      <template v-if="!curr_isActive" v-for="item in codeList.listCouponBatch">
        <template v-for='item1 in item.count?item.count:1'>
        <div class="pop-content">
          <div class="pop-item-no-used"> <!--pop-item-used pop-item-no-used-->
            <div class="gc-left">
              <div class="gc-value">
                <div class="gc-number">¥ <span class="gc-number-txt">{{item.money}}</span></div>
                <div class="gc-desc" v-if="!item.limitQuantity">无限额使用</div>
                <div class="gc-desc" v-if="item.limitQuantity&&item.limitQuantity>0">满{{item.limitQuantity}}元可用</div>
              </div>
            </div>
            <div class="gc-right "><!--已经使用 去掉 gc-expire   公司 加 gc-right-company-->
              <div :class="{'gc-desc':!isCompany, 'gc-company-desc':isCompany}"><!--change    gc-company-desc-->
                <div class="gc-name">{{item.couponName}}</div>
                  <div class="gc-property" ><template v-if="!item.isAllWorkstage">限指定场区可用</template><template v-if="item.isAllWorkstage">全国场区可用</template><br>
                    有效期{{item.expiration}}个月
                  </div>
                  <div v-show="isCompany" class="gc-company">{{codeList.companyName}}...公司员工专用</div> <!--个人 hide-->
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
      </div>
      <div v-if="!curr_isActive" class="gc-active-but" @click="open_active_div()">激活礼包</div>


    </div>
    </transition>

    <div id="mask" v-show="dialog">
      <div v-show="activeDiv" class="dialog">
        <div class="content">
          <p>确认要激活使用U礼包嘛？</p>
          <span>礼包中的代金券将存入您的{{isCompany ? '公司' : '个人'}}账户</span>
        </div>
        <div class="bot">
          <div class="close" @click="action(false)">
            我想想
          </div>
          <div class="sure" @click="action(true)">
            确认激活
          </div>
        </div>

      </div>


      <div v-show="returnDiv" class="dialog">
        <div class="content">
          <p>亲，确认要进行U礼包退款嘛？</p>
        </div>
        <div class="bot">
          <div class="close" @click="returnOrder(false)">
            我想想
          </div>
          <div class="sure" @click="returnOrder(true)">
            确认退款
          </div>
        </div>

      </div>

      <div v-show="cancelDiv" class="dialog">
        <div class="content">
          <p>亲，确认要取消此订单嘛？</p>
        </div>
        <div class="bot">
          <div class="close" @click="cancelOrder(false)">
            我想想
          </div>
          <div class="sure" @click="cancelOrder(true)">
            确认取消
          </div>
        </div>

      </div>
    </div>
  </page-wrap>
</template>

<script>
  import apiOrderDetail from 'api/uGifts/apiOrderDetail';
  import apiGCodeList from 'api/uGifts/apiGCodeList';
  import apiRefundOrder from 'api/uGifts/apiRefundOrder';
  import apiPutCoupon from 'api/uGifts/apiPutCoupon';
  import apiPay from  'api/uGifts/apiPay';
  import apiCancelOrder from  'api/uGifts/apiCancelOrder';
  export default {
    components: {},
    data: () => {
      return {
        show: false,
        title: '订单详情',
        orderId: 0,
        data: {},
        showTitle: '查看全部',
        isCompany: false,    //是否是公司
        payed: true,         //是不是已经付款
        showList: false,   //是否全部显示礼包列表
        showPop: false,     //优惠券列表
        activeStatus: true, //当前展示的优惠券是否激活
        dialog: false,      //对话框背景
        activeDiv: false, //激活对话框

        cancelDiv: false, //取消订单对话框
        returnDiv: false,  //退款对话框


        curr_p_id: 0,
        curr_isActive: false,
        codeList: [],

        refunding: false,

        to_active_num:0,
        refundInfo:{},

        packageNum:0,

        payment:1,              // 支付方式
        channel:4,            // 渠道
        form:'<form></form>',   //form表单
        paying:0,
        showTopTitle:true,

        isOtherPay:0,

      }
    },
    methods: {
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
      toPay(orderId){
        let data={};
        //data.channelCode =this.channel;
        data.payUser
        data.channel =this.channel;
        data.payType=this.payment;
        data.orderId=orderId;
        data.returnUrl= encodeURIComponent('https://m.urwork.cn/v2/ugift/orderDetail?orderId='+orderId);
        apiPay(data).then(res=>{
            if(this.paying){
                return
            }
          this.paying=1;
          if(res){
            if(this.payment==3){
              this.webChatGZH(res);
            }else if(this.payment==1){
              this.form = res.payRequest;
              console.log(res.payStr,'支付宝串')
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
      open_active_div(){
        this.dialog = true;
        this.activeDiv = true;
      },
      open_return_div(){
        if (this.refunding) {
          this.$toast("申请退款中...");
          return;
        }
        this.dialog = true;
        this.returnDiv = true;
      },
      open_cancel_div(){
        this.dialog = true;
        this.cancelDiv = true;
      },
      action(flag){
        if (flag) {
          apiPutCoupon({memberPackageInfoId:this.curr_p_id},1).then(res=>{
            if (res>0||res=== 0) {
              this.$toast("激活成功");
              this.initDate();
              this.closePop();
              // setTimeout(() => {
             
              // }, 800);
            } else {
              this.$toast("激活失败");
              this.closePop();
              // setTimeout(() => {
              //   location.reload();
              // }, 800);
            }
          });
        }
        this.dialog = false;
        this.activeDiv = false;
      },

      returnOrder(flag){
        if (flag) {
          if (this.refunding) {
            this.$toast("申请退款中...");
            return;
          }
          this.$showLoading();
          this.refunding = true;
          apiRefundOrder({orderId: this.orderId}).then(res => {
            if (res === 0) {
              this.$toast("申请退款成功");
                this.initDate();
                this.closePop();
              // setTimeout(() => {
              //   location.reload();
              // }, 800);

            } else {
              this.$toast("申请退款失败");
              this.closePop();
              // setTimeout(() => {
              //   location.reload();
              // }, 800);
            }
            this.refunding = false;
            this.$hideLoading();
          })
        }
        this.dialog = false;
        this.returnDiv = false;
      },

      cancelOrder(flag){
        if (flag) {
          apiCancelOrder({orderId: this.orderId}).then(res => {
              this.$toast("取消订单成功");
              this.initDate();
              this.closePop();
            // setTimeout(() => {
            //   location.reload();
            // }, 800);
          })
        }
        this.dialog = false;
        this.cancelDiv = false;
      },

      listCode(packageId){
        this.curr_p_id = packageId;
        this.data.packageList.map(item => {
          if (item.packageId == packageId) {
            this.codeList = item.codeList;
            this.curr_isActive = item.isActive;
            this.curr_p_id = packageId;
          }
        })
        this.showPop = true;
        this.$DANativeApi.setIsRefresh({
          isRefresh: false
        })
        this.$DANativeApi.showNavigationBar({
          isShow: false
        });
      },
      showAll(){
        this.showList = !this.showList;
        if (!this.showList) {
          this.showTitle = '查看全部';

        } else {
          this.showTitle = '收起';
          this.$nextTick(() => {
//            var p = document.getElementById('gCodeListB');
//            document.getElementsByTagName('html')[0].scrollTop =p.scrollHeight;
          })
        }
      },

      padDate (val) {
        val = val < 10 ? '0' + val : val;
        return val
      },
      formatDate (val,type=1) {
        var value = new Date(val);
        var year = value.getFullYear();
        var month = this.padDate(value.getMonth() + 1);
        var day = this.padDate(value.getDate());
        var hour = this.padDate(value.getHours());
        var minutes = this.padDate(value.getMinutes());
        var seconds = this.padDate(value.getSeconds());
        if(type==2){
            let year_t=year+"";
          return year_t.substring(2) + '/' + month + '/' + day ;
        }
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;

      },
      initDate(){
        this.orderId = this.$route.query.orderId;
        apiOrderDetail({orderId: this.orderId}).then(res => {
          res.createTimeTxt = this.formatDate(res.createTime);
          if(res.payTime){
            res.payTimeTxt = this.formatDate(res.payTime);
          }
          if (res.packageType == 2) {
            this.isCompany = true;
          }
          if (res.orderStatus === 4) {
              if(res.refundInfo){
                res.refundInfo.refundTime=this.formatDate(res.refundInfo.refundTime);
              }

            this.refundInfo=res.refundInfo;
          }
          //apiGCodeList
          let packageList = res.packageList;
           this.isOtherPay=res.isOtherPay;
          this.data = res;
          if(packageList&&packageList.length>0){
              this.packageNum=packageList.length;
          packageList.map((item, index) => {
            if(item.packageStatus==1){
              this.to_active_num =this.to_active_num+1;
            }
            apiGCodeList({memberPackageInfoId: item.packageId}).then(res => {
              if (res) {
                if(res.companyName&&res.companyName.length>9){
                  res.companyName=res.companyName.substring(0, 9);
                }
                if (res.listCoupon) {
                    let list=res.listCoupon;
                    list.map(item1=>{
                      item1.startDate = this.formatDate(item1.startDate,2);
                      item1.endDate = this.formatDate(item1.endDate,2);
                    })

                  this.$set(this.data.packageList[index], 'isActive', true);
                }
                if (res.listCouponBatch) {
                  this.$set(this.data.packageList[index], 'isActive', false);
                }
                this.$set(this.data.packageList[index], 'codeList', res);
              }

            })
          })
          }
        });
      },
      closePop(){
        this.$DANativeApi.setIsRefresh({
          isRefresh: true
        })
        this.$DANativeApi.showNavigationBar({
          isShow: true
        });
        this.showPop = false;
      }
    },
    created() {
      this.show = true;
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
      this.initDate();
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .kong {
    height: 120px;
    background: #f5f5f5;
  }
  .kong60 {
    height: 60px;
    background: #f5f5f5;
  }

  #main {
    background: #ffffff;
    .banner {
      width: 100vw;
      height: 100px;
      background-image: linear-gradient(#EE434B 0%, #FF6756 94%);
      padding: 17px 20px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      .txt {
        display: flex;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        span {
          font-family: PingFangSC-Semibold;
          font-size: 18px;
          color: #FFFFFF;
          letter-spacing: 0;
          margin-left: 10px;
        }
      }
    }
    .date {
      padding-bottom: 20px;
      margin-top: -40px;
      border-bottom: 8px solid #f5f5f5;
      .point-box {
        width: 100%;
        padding: 0 20px;
        /*  <!--position: absolute;-->
          <!--top: -40px;-->*/
        display: flex;
        align-items: center;
        justify-content: space-between;
        .point {
          width: 100%;
          padding: 15px 15px;
          min-height: 100px;
          background: #F6F3ED;
          border: 1px solid #D4BB8A;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          .p {
            width: 100%;
            min-height: 70px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-around;
            .name {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-family: PingFangSC-Semibold;
              font-size: 16px;
              color: #333333;
              letter-spacing: 0;
              .title{
                white-space: nowrap;  /*强制span不换行*/
                display: inline-block;  /*将span当做块级元素对待*/
                width: 4.70rem;  /*限制宽度*/
                overflow: hidden;  /*超出宽度部分隐藏*/
                text-overflow: ellipsis;  /*超出部分以点号代替*/
              }

              .total {
                height: 21px;
                line-height: 21px;
                display: inline-block;
                background-image: linear-gradient(172deg, #E9CB82 0%, #BFA265 100%);
                box-shadow: 0 3px 5px 0 rgba(235, 207, 151, 0.67);
                border-radius: 11px 11px 0 11px;

                font-family: PingFangSC-Semibold;
                font-size: 12px;
                color: #917238;
                letter-spacing: 0;
                padding: 0 6px;
              }
            }
            .company {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #333333;
              letter-spacing: 0;
              margin-top: 6px;
              margin-bottom: 12px;
              .left {
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #917238;
                letter-spacing: 0;
                text-align: right;
              }
            }
            .price {
              font-family: PingFangSC-Semibold;
              font-size: 16px;
              color: #FF4500;
              letter-spacing: 0;
            }
          }
        }

      }
      .all-gift {
        padding: 20px 20px 0 20px;
        h4 {
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #333333;
          letter-spacing: 0;
          text-align: left;
          margin-bottom: 10px;
        }

        > ul {

          li {
            background: #FFFFFF;
            border: 1px solid #D4BB8A;
            border-radius: 4px;
            margin-bottom: 15px;
            /*&:last-of-type{*/
            /*margin-bottom: 0px;*/
            /*}*/
            .name {
              font-family: PingFangSC-Semibold;
              font-size: 16px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              color: #333333;
              width: 4.70rem;
              letter-spacing: 0;
            }
            .butn {
              width: 80px;
              height: 30px;
              display: inline-block;
              text-align: center;
              line-height: 30px;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #666666;
              letter-spacing: 0;
              background: #FFFFFF;
              position: relative;
              @include border(#D4BB8A) {
                border-radius: 30px;
              }
            }
          }
          .fr {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 19px 15px;
          }
          .tb {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            padding: 15px;
            .coupon {
              width: 100%;
              margin-top: 1px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              span {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #FF4500;
                letter-spacing: 0;
              }
              .more-coupon {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #666666;
                letter-spacing: 0;
                i {
                  margin-top: 2px;
                  font-size: 10px;
                }
              }
            }
          }
        }
        .look-all {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #999999;
          letter-spacing: 0;
          text-align: center;
          > span {
            margin-left: 4px;
            i {
              font-size: 10px;
              transform: rotate(90deg);
              -ms-transform: rotate(90deg); /* IE 9 */
              -moz-transform: rotate(90deg); /* Firefox */
              -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
              -o-transform: rotate(90deg); /* Opera */
            }
          }
        }
        .look-part {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #999999;
          letter-spacing: 0;
          text-align: center;
          > span {
            margin-left: 4px;
            i {
              font-size: 10px;
              transform: rotate(-90deg);
              -ms-transform: rotate(-90deg); /* IE 9 */
              -moz-transform: rotate(-90deg); /* Firefox */
              -webkit-transform: rotate(-90deg); /* Safari 和 Chrome */
              -o-transform: rotate(-90deg); /* Opera */
            }
          }
        }
      }
    }
    .gc-return {
      padding: 20px;
      background: #ffffff;
      border-bottom: 0.16rem solid #f5f5f5;
      .tit {
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #333333;
        letter-spacing: 0;
        text-align: left;
        padding-bottom: 0.24rem;
        position: relative;
        @include border-bottom(#e5e5e5);
      }
      ul {
        padding-top: 0.14rem;
        li {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          text-align: left;
          line-height: 35px;
          span {
            color: #666666;
            padding-right: 0.30rem;
          }
        }
      }
    }

    .explain {
      margin-top: 8px;
      background: #ffffff;
      padding: 15px 20px 20px 20px;
      .tit {
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #333333;
        letter-spacing: 0;
        text-align: left;
        padding-bottom: 15px;
        position: relative;
        @include border-bottom(#e5e5e5);
      }
      ul {
        padding-top: 7px;
        li {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          text-align: left;
          line-height: 35px;
          span {
            color: #666666;
            padding-right: 0.30rem;
          }
        }
      }
    }
    .fixed {
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 99;
      .customer {
        width: 100%;
        padding: 0 20px 15px 20px;
        overflow: hidden;
        span {
          width: 40px;
          height: 40px;
          display: inline-block;
          background: #FFFFFF;
          background: url("https://assets.urwork.cn/image/ugift/icon_kefu.png") no-repeat;
          background-size: 100%;
          float: right;
        }
      }
      .refund {
        width: 100%;
        height: 60px;
        padding: 11px 15px;
        line-height: 60px;
        background: #F5F5F5;
        text-align: center;
        a {
          width: 100%;
          height: 100%;
          display: inline-block;
          background: #FFFFFF;
          border-radius: 2px;
          position: relative;
          @include border(#CCCCCC);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .sure {
        width: 100%;
        height: 60px;
        padding: 11px 15px;
        line-height: 60px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        a {
          width: calc(50% - 5px);
          height: 100%;
          display: inline-block;
          background: #FFFFFF;
          border-radius: 2px;
          position: relative;
          @include border(#CCCCCC);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pay {
          background: #333333;
          border-radius: 2px;
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #DEBA6C;
          letter-spacing: 0;
          position: relative;
          @include border(#333333);
        }
      }
    }
  }

  .pop-back {
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    min-height: 667px;
    z-index: 999;
    background-color: #fff;
    .pop-colse {
      width: 0.32rem;
      height: 0.32rem;
      margin-left: 0.56rem;
      margin-top: 0.39rem;
      background-image: url("../../static/images/pop-close.png");
      background-repeat: no-repeat;
      background-size: 0.32rem 0.32rem;
    }
    .pop-title {
      font-family: PingFangSC-Semibold;
      font-size: 25px;
      color: #333333;
      letter-spacing: 0;
      text-align: left;
      padding-left: 0.40rem;
      padding-top: 0.63rem;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .pop-content {
      padding-top: 0.50rem;
      .pop-item-used {
        width: 6.70rem;
        height: 2.30rem;
        margin-left: 0.40rem;
        background-image: url("https://assets.urwork.cn/image/ugift/ucode-back-gray.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        .gc-left {
          width: 2.04rem;
          height: 2.30rem;
          float: left;
          .gc-value {
            /*padding-left: 0.41rem;*/
            padding-top: 0.55rem;
            text-align: center;
            .gc-number {
              font-family: PingFangSC-Regular;
              font-size: 17px;
              color: #FFFFFF;
              height: 0.78rem;
              display: inline-block;
              text-align: center;
              line-height: 0.78rem;
              margin-bottom: 0.04rem;
              .gc-number-txt {
                font-size: 28px;
              }
            }
            .gc-desc {
              font-family: PingFangSC-Regular;
              font-size: 11px;
              text-align: center;
              color: #FFFFFF;
              height: 15px;
              margin-left: 0.06rem;
            }
          }
        }
        .gc-right {
          width: 4.66rem;
          height: 2.30rem;
          padding-left: 0.31rem;
          padding-top: 0.4rem;
          float: right;
          background-image: url("https://assets.urwork.cn/image/ugift/ucode-used.png");
          background-repeat: no-repeat;
          background-size: 1.04rem 0.95rem;
          -moz-background-size: 1.04rem 0.95rem;
          background-position: 100% 0;
          .gc-company-desc {
            .gc-name {
              font-family: PingFangSC-Semibold;
              font-size: 12px;
              color: #333333;
              padding-bottom: 0.06rem;
            }
            .gc-property {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #ADADAD;
              margin-bottom: 0.16rem;
            }

            .gc-company {

              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #999999;
              width: 4.05rem;
              border-top: solid #E5E5E5 0.01rem;
              padding-top: 0.13rem;
              padding-bottom: 0.14rem;
            }
          }
          .gc-desc {
            .gc-name {
              font-family: PingFangSC-Semibold;
              font-size: 16px;
              color: #333333;
              padding-bottom: 0.20rem;
            }
            .gc-property {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #ADADAD;
            }
          }
        }
        .gc-right-company {
          padding-top: 0.36rem;
        }
        .gc-expire {
          background-image: url("https://assets.urwork.cn/image/ugift/ucode-expire.png");
          background-repeat: no-repeat;
          background-size: 1.04rem 0.95rem;
          -moz-background-size: 1.04rem 0.95rem;
          background-position: 100% 0;
        }
      }

      .pop-item-no-used {
        width: 6.70rem;
        height: 2.30rem;
        margin-left: 0.40rem;
        background-image: url("https://assets.urwork.cn/image/ugift/ucode-back-gold.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        .gc-left {
          width: 2.04rem;
          height: 2.30rem;
          float: left;
          .gc-value {
            /*padding-left: 0.41rem;*/
            padding-top: 0.55rem;
            text-align: center;
            .gc-number {
              font-family: PingFangSC-Regular;
              font-size: 17px;
              color: #FFFFFF;
              height: 0.78rem;
              display: inline-block;
              text-align: center;
              line-height: 0.78rem;
              margin-bottom: 0.04rem;
              .gc-number-txt {
                font-size: 28px;
              }
            }
            .gc-desc {
              font-family: PingFangSC-Regular;
              font-size: 11px;
              color: #FFFFFF;
              text-align: center;
              width: 100%;
              height: 0.30rem;
              margin-left: 0.06rem;
            }
          }
        }
        .gc-right {
          width: 4.66rem;
          height: 2.30rem;
          padding-left: 0.31rem;
          padding-top: 0.4rem;
          float: right;
          .gc-company-desc {
            .gc-name {
              font-family: PingFangSC-Semibold;
              font-size: 16px;
              color: #333333;
              padding-bottom: 0.06rem;
            }
            .gc-property {
              font-family: PingFangSC-Regular;
              height: 0.66rem;
              font-size: 12px;
              color: #ADADAD;
              margin-bottom: 0.16rem;
            }

            .gc-company {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #999999;
              width: 4.05rem;
              line-height:12px;
              border-top: solid #E5E5E5 0.01rem;
              padding-top: 0.13rem;
              padding-bottom: 0.14rem;
            }
          }
          .gc-desc {
            .gc-name {
              font-family: PingFangSC-Semibold;
              font-size: 16px;
              color: #333333;
              padding-bottom: 0.20rem;
            }
            .gc-property {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #ADADAD;
            }
          }
        }
        .gc-right-company {
          padding-top: 0.36rem;
        }
      }
    }

    .gc-active-but {
      position: fixed;
      width: 4.9rem;
      height: 0.90rem;
      left: 1.30rem;
      bottom: 0.6rem;
      background: #333333;
      border-radius: 1.00rem;

      font-family: PingFangSC-Regular;
      font-size: 0.32rem;
      color: #DEBA6C;
      letter-spacing: 0;
      text-align: center;
      line-height: 0.90rem;;
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


  .my-trans-enter-active, .my-trans-leave-active {
    transition: all .4s ease-out;
  }

  .my-trans-enter {
    transform: translateY(700px);
    opacity: 0;
  }

  .my-trans-leave-active {
    transform: translateY(700px);
    opacity: 0;
  }

  .code-list_div{
    overflow: scroll;max-height:calc(100% - 4.2rem)
  }
  .code-list_div_no_active{
    overflow: scroll;max-height:calc(100% - 2.5rem)
  }
</style>

