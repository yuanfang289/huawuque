<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">

      <div class="content">
        <div class="package-info">
          <div class="package-name"><img src="https://assets.urwork.cn/image/mpackage/package-order.png"/>{{name}}
          </div>
          <div class="price-info">
            <div class="price-desc">
              <span class="price">{{price==0?'免费':'¥'+price}}</span>
              <span class="desc">{{price==0?'':'专享价'}}</span>
            </div>
            <div class="nums">
              <img @click="opt(-1);" :src="minusImg"/>
              <span>{{nums}}</span>
              <img @click="opt(1);" :src="plusImg"/>
            </div>
          </div>
        </div>
        <div v-if="price!=0||saleType==1" class="pay-chose">
          <span v-if="saleType==3||saleType==1" @click="chosePayType(2)" :class="{'pay-noChecked':orderType==1}">企业支付</span>
          <span v-if="saleType==2||saleType==1" @click="chosePayType(1)" :class="{'pay-noChecked':orderType==2}">个人支付</span>
        </div>
        <div class="dividers"></div>
        <div v-if="orderType==2" @click="openNamePicker()" class="company-info">
          <span>企业</span>
          <span>{{companyName}}<i class="uricon-arrow-right"></i></span>
        </div>
        <div class="dividers1"></div>
        <div v-if="!RUserId" class="referee">
          <span>推荐人手机号</span>
          <span><input type="text" class="input" ref="rtel" v-model="orderData['recommenderTel']" placeholder="输入推荐人手机号"></span>
        </div>
        <div v-if="RUserId" class="referee">
          <span>推荐人姓名</span>
          <span>{{userName}}</span>
        </div>
        <div class="dividers1"></div>
        <div v-if="price!=0" class="pay-method">
          <div class="txt">支付方式</div>
          <div v-if="!isWX" class="method-list" @click="chosePayment(1)">
            <span class="pay-method-name"><img src="https://assets.urwork.cn/image/mpackage/zfb.png">支付宝支付</span> <span
            :class="{'pay-check-box':true, 'pay-no-chose':payment==3,'pay-method-chose':payment==1}"></span>
          </div>
          <div v-if="isWX||isAPP" class="method-list" @click="chosePayment(3)">
            <span class="pay-method-name"><img src="https://assets.urwork.cn/image/mpackage/wx.png">微信支付</span> <span
            :class="{'pay-check-box':true, 'pay-no-chose':payment==1,'pay-method-chose':payment==3}"></span>
          </div>
        </div>

<div class="bottom-div">
  <div class="clause_to_agree">
    <span  :class="{'law_check':!law_agreed,'law_checked':law_agreed}" @click="action_law_checked()"></span>我已经阅读并同意 <a href='/v2/clause'>《优鲜集交易条款》</a></div>
  <div class="dividers2"></div>
        <div v-if="price!=0" class="package-submit">
          <div class="package-total">
            <span class="total-txt">总价</span>
            <span  class="total-price">¥{{total}}</span>
          </div>
          <div class="submit-but" @click="submit()">立即领取</div>
        </div>

  <div v-if="price==0" class="package-submit" style="justify-content:center;">
    <div class="submit-but" @click="submit()">立即领取</div>
  </div>
</div>
      </div>

      <div class="form" v-html="form"></div>
      <mt-popup v-model="popPicker" popup-transition="popup-fade" :closeOnClickModal="noCompany" position="bottom">

        <div v-if="noCompany" class="go-creat-com picker-toolbar"  style="width: 7.5rem;margin-top:  30px; margin-bottom:60px; text-align:  center;">
          <a v-if="!isAPP" href="/company/companyShort" style="text-align: center;background: #ffd53d;color: #333;border-radius: 25px;padding: 10px;"  class="creat-company">
            <i class="uricon-plus-w"></i>创建企业</a>
          <a v-if="isAPP"  href="urwork://company/create" style="text-align: center;background: #ffd53d;color: #333;border-radius: 25px;padding: 10px;"  class="creat-company">
            <i class="uricon-plus-w"></i>创建企业</a>
        </div>

        <mt-picker v-if="!noCompany" ref="namePicker" :slots="slots" value-key='name' :closeOnClickModal="false" @change="nameChange"
                   style="width: 7.5rem;" showToolbar>
          <div class="picker-toolbar">
            <span class="mint-datetime-action mint-datetime-cancel" @click="cancelPicker()">取消</span>
            <span class="mint-datetime-action mint-datetime-confirm" @click="confirmPicker()">确定</span>
          </div>
        </mt-picker>

      </mt-popup>

    </page-main>

  </page-wrap>
</template>

<script>
  import {mapState} from 'vuex'
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {passport} from 'src/globalData';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import newOrder from 'api/mPackage/apiNewOrder';
  import skuDetail from 'api/mPackage/apiSKUDetail';
  import orderDetail from 'api/mPackage/apiOrderDetail';
  import getCompanyList from 'api/mPackage/apiGetCompanyList';
  import aliPay from 'api/mPackage/apiAliPay';
  import WXPay from 'api/mPackage/apiWXPay';
  import appAliPay from 'api/mPackage/apiAPPAliPay';
  import appWXPay from 'api/mPackage/apiAPPWXPay';
  export default {
    components: {},
    data: () => {
      return {
        show: false,
        title: '确认订单',
        companyName: '',
        companyNameTemp: '',
        companyId: 0,
        companyIdTemp: 0,//todo
        popPicker: false,
        dialog: false,
        plusImg:'https://assets.urwork.cn/image/mpackage/plus.png',
        minusImg:'https://assets.urwork.cn/image/mpackage/minus.png',
        payData: {
          bizType: '',// Y 业务类型
          orderNo: '',//   Y 订单编号
          payable: '',// Y 支付金额
          productName: '',// Y 商品名称
          productBody: '',// Y 商品内容
          version: '',// Y 客户端版本号
          channel: 1,// Y 客户端类型
          returnUrl: '',// Y 跳转链接地址
        },
        orderData: {
          orderId: '', //Y 订单号 订单编号，如果是订单二次支付，则需要传此字段
          userId: '', //Y 用户ID
          skuId: '', //Y 商品ID，精确到具体的规格
          count: '', //Y 购买数量
          recommenderTel: '', //Y 推荐人手机号
          recommenderUserId: '', //Y 推荐人用户ID
          orderType: '', //Y 订单类型:1个人支付,2企业支付
          companyId: '', //Y 企业ID
          channel: 1, //Y 下单渠道，具体定义见枚举ClientType
        },

        skuId: 2,
        noCompany: true,
        userId: 0,
        orderId: 0,
        RUserId: 0,// 161996,
        userName: '',
        isWX: false,
        isAPP: false,
        info: {},
        orderInfo: null,
        name: '',
        nums: 1,
        maxNums:10,
        price: 0,
        isNew: true,//是否是新订单
        saleType:0,//1  全部       2  个人      3   企业
        orderType: 1,          //订单类型:1个人支付,2企业支付
        payment: 1,              // 支付方式 3  微信   1支付宝
        channel: 4,            // 渠道
        form: '<form></form>', //form表单
        slots: [{
          values: [],
          defaultIndex: 0
        }],
        companyList: [],
        paying:false,
        law_agreed:false,
        limitCount:0,
        hasBuyCount:0,
      }
    },
    computed: {

      total() {
        return this.price * this.nums;
      },
      ...mapState({
        isLogin: state => state.isLogin,
      }),
    },
    methods: {
      action_law_checked(){
          if(this.law_agreed){this.law_agreed=false;}else{
            this.law_agreed=true;
          }
      },
      closeTouch() {
        document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {passive: false})//阻止默认事件
        this.$DANativeApi.setIsRefresh({
          isRefresh: false
        })
      },
      openTouch() {
        document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {passive: false})//打开默认事件
        this.$DANativeApi.setIsRefresh({
          isRefresh: true
        })
      },
      openNamePicker(){
          if(!this.isNew){this.$toast("订单已生成,不能修改公司");return}
        this.popPicker = true;
        this.closeTouch();
      },
      nameChange(picker, values) {
        console.log("values", values);
        if (values[0]) {
          this.companyNameTemp = values[0].name;
          this.companyIdTemp = values[0].id;
        }

      },
      cancelPicker(){
        this.$refs.namePicker.setValues([this.companyName]);
        this.popPicker = false;
        this.openTouch();
      },
      confirmPicker(){
        this.companyName = this.companyNameTemp;
        this.companyId = this.companyIdTemp;
        this.popPicker = false;
        this.openTouch();
      },

      checkTel(){
        var tel = this.orderData['recommenderTel'];
        if (tel.trim()==''){return true;}
        var mobile = /^1[0-9]{10}$/;
        return mobile.test(tel);
      },

      opt(nums){

        if (!this.isNew) {
           this.plusImg='https://assets.urwork.cn/image/mpackage/plus1.png';
          return;
        }
        if(nums==1&&this.maxNums!=0&&this.nums>=this.maxNums){
          this.plusImg='https://assets.urwork.cn/image/mpackage/plus1.png';
          this.$toast("已到限购数量");
            return;
        }
        if (this.nums == 1 && nums == -1) {
          this.minusImg='https://assets.urwork.cn/image/mpackage/minus.png';
          return
        }
        this.nums = this.nums + nums;
        if(this.nums>1){
          this.minusImg='https://assets.urwork.cn/image/mpackage/minus1.png';
        }else{
          this.minusImg='https://assets.urwork.cn/image/mpackage/minus.png';
        }
        if(this.nums<10){
          this.plusImg='https://assets.urwork.cn/image/mpackage/plus.png';
        }else{
          this.plusImg='https://assets.urwork.cn/image/mpackage/plus1.png';
        }
      },
      chosePayType(type){
        this.orderType = type;
      },
      chosePayment(type){
        this.payment = type;
      },
      appPay(pr, pn, pw){
        /**
         * 支付
         * @param {String} paymentInfo 支付信息，微信支付或者支付宝支付所需要的信息字符串
         * @param {String} paymentNum 支付编号
         * @param {Number} payWay 支付方式，1支付宝  3微信
         * @param {Function} completion 支付完成的回调，res.data为 true 时支付成功，false 支付失败
         */
        this.$DANativeApi.payment({
          paymentInfo: pr,
          paymentNum: pn,
          payWay: pw,
          completion:(res)=>{
            if (res.data) {
              alert("支付成功");
              window.location.href='https://m.urwork.cn/v2/mPackage/orderList'+'?time='+((new Date()).getTime());
            } else {
              alert("支付失败!");
              setTimeout(function () {
                window.location.href='https://m.urwork.cn/v2/mPackage/orderList'+'?time='+((new Date()).getTime());
              }, 300)
            }
          }
        });

      },
      submit(){
          if(this.orderType==2&&!this.checkTel()){
            this.$toast("请输入正确的手机号");
            this.$refs['rtel'].focus();
            return;
          }
        this.orderData['userId'] = this.userId;
        if (this.RUserId) {
          this.orderData['recommenderUserId'] = this.RUserId;
        } else {
          this.orderData['recommenderUserId'] = null;
        }
        this.orderData['skuId'] = this.skuId;
        this.orderData['count'] = this.nums;
        this.orderData['orderType'] = this.orderType;
        this.orderData['companyId'] = this.companyId;
        this.orderData['channel'] = this.channel;


        if (this.isNew) {
          this.orderData.orderId = null;
        }
        if (this.orderType == 2 && this.noCompany) {
          this.popPicker = true;
          alert("请加入公司才能使用”企业支付“");
          return false;
        }
        if(!this.companyId&&this.orderType == 2){
          this.$toast("请选择企业");
          return false;
        }
        if(this.paying){return;}
        if(!this.law_agreed){
          this.$toast("请同意优鲜集交易条款");
          return;
        }
        this.paying=true;
        newOrder(this.orderData).then(res => {
          if (res.retCode === 0) {
            let orderInfo = res.data;
            if(orderInfo.payable==0){
              this.$toast("领取成功");
              var uri = '/v2/mPackage/orderList';
              location.href = encodeURI(uri);
              return
            }
            this.todoPay(orderInfo);
          } else {
            this.$toast(res.retMsg);
            this.paying=false;
          }

        });

      },
      todoPay(orderInfo){
        var data = {};
        data.bizType = orderInfo['bizType'];
        data.orderNo = orderInfo['orderNo'];
        data.payable = orderInfo['payable'];
        data.productName = orderInfo['productName'];
        data.productBody = orderInfo['productBody'];
        data.version = '1.0';
        data.channel = this.channel;
        data.returnUrl ='https://m.urwork.cn/v2/mPackage/orderList';
        if (this.payment == 1) {
          this.aliPay(data);
        } else {
          this.wxPay(data);
        }
      },

      aliPay(data){
        if (isApp()) {
          appAliPay(data).then(res => {
            if (res.retCode === 0) {
              console.log(res.data, '支付宝串')
              this.appPay(res.data, '', 1);
            } else {
              this.$toast("订单状态不可支付");
              this.paying=false;
            }
          });
        } else {
          aliPay(data).then(res => {
            if (res.retCode === 0) {
              this.form = res.data;
              console.log(res.data, '支付宝串')
              this.$nextTick(function () {
                document.forms['alipaysubmit'].submit();
                this.paying=false;
              })
            } else {
              this.$toast("订单状态不可支付");
              this.paying=false;
            }
          });
        }
      },

      wxPay(data) {
        if (isApp()) {
          appWXPay(data).then(res => {
            if (res.retCode === 0) {
              console.log(res.data, 'wx app 串')
              this.appPay(res.data, '', 3);
            } else {
              this.$toast("订单状态不可支付");
              this.paying=false;
            }
          });
        } else {
          WXPay(data).then(res => {
            if (res.retCode === 0) {
              var wwdata = JSON.parse(res.data);
              this.paying=false;
              var ww = {};
              var id = this.orderId;
              var _this = this;
              ww.appId = wwdata.appId;
              ww.nonceStr = wwdata.nonceStr;
              ww.timeStamp = wwdata.timeStamp;
              ww.paySign = wwdata.sign;
              ww.package = wwdata.package;
              ww.signType = wwdata.signType;
              function onBridgeReady() {
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', ww,
                  function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                      _this.$toast("购买成功");
                      //var uri = '/v2/mPackage/orderDetail?orderId=' + id;
                      var uri = '/v2/mPackage/orderList';
                      location.href = encodeURI(uri);
                    }else{
                      window.location.href='https://m.urwork.cn/v2/mPackage/orderList'+'?time='+((new Date()).getTime());
                    }
                  }
                );
              }

              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
              } else {
                onBridgeReady();
              }
            } else {
              this.$toast("订单状态不可支付");
              this.paying=false;
            }
          });
        }
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

      getOrderInfo(){
        orderDetail({orderId: this.orderId}).then(res => {
          if (res.retCode === 0) {
            this.orderInfo = res.data;
            this.price = this.orderInfo['price'];
            this.nums = this.orderInfo['count'];
            if(this.nums==1){
              this.minusImg='https://assets.urwork.cn/image/mpackage/minus.png';
            }
            this.name = this.orderInfo['name'];
            this.skuId = this.orderInfo['skuId'];
            this.orderType = this.orderInfo['orderType'];
            if(this.orderType==1){this.saleType=2}
            if(this.orderType==2){this.saleType=3}
            this.companyId = this.orderInfo['companyId'];
            this.isNew = false;
            this.orderData['orderId'] = this.orderId;
            this.getCompList();
          } else {
            if(res.retCode === 1){
              alert("订单不存！");
              location.href='https://m.urwork.cn/v2/mPackage/orderList';
            }
          }
        });
      },
      getCompList(){
        if (this.userId) {
          getCompanyList().then(res => {
            if (res.retCode === 0) {
              this.companyList = res.data;
              this.$set(this.slots[0], 'values', res.data);
              if (res.data.length > 0) {
                if(this.orderId){
                  for(let i=0;i<res.data.length;i++){
                    if(res.data[i].id==this.orderId){
                      this.$set(this.slots[0], 'defaultIndex',i);
                      break;
                    }
                  }
                }
                this.companyName = this.companyList[0].name;
                this.companyId = this.companyList[0].id;
                this.noCompany = false;
              } else {
                this.noCompany = true;
              }
            }
          });
        }
      },
    },
    created(){
      if(!this.isLogin){
        passport.toLogin();
      }
      this.userId = this.$store.state.userInfo.userId;
      let skuId = this.$route.query.skuId;
      let orderId = this.$route.query.orderId;
      if (this.isWEIxin()) {
        this.isWX = true;
        this.payment = 3;
      }
      this.isAPP = isApp();

      if (skuId) {
        let arr_user = skuId.split("_");
        this.skuId = arr_user[0];
        this.name = arr_user[1];
        this.price = arr_user[2];
        this.saleType= arr_user[3];
        if(this.saleType==2){
            this.orderType=1
        }
        if(this.saleType==3){
          this.orderType=2
        }
        this.hasBuyCount= arr_user[4];
        this.limitCount= arr_user[5];
        this.maxNums=this.limitCount;
        if(this.maxNums=1){
          this.plusImg='https://assets.urwork.cn/image/mpackage/plus1.png';
        }
        if (arr_user[6]) {
          this.RUserId = arr_user[6];
        }
        if (arr_user[7]) {
          this.userName = decodeURIComponent(arr_user[7]);
        }
        this.getCompList();
      } else if (orderId) {
        this.orderId = orderId;
        this.getOrderInfo();
      }
    },
    mounted(){
      this.show = true;
      document.addEventListener("visibilitychange", () => {
          if(document.visibilityState=='visible'){
            this.getCompList();
          }
      });
    },

  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .content {
    position: relative;
    height: 100%;
    width: 100%;
    padding-top: 0.3rem;
    .package-info {
      height: 2rem;
      width: 6.9rem;
      margin-left: 0.3rem;
      padding-top: 0.5rem;
      background: #FFFFFF;
      box-shadow: 0 0 40px 0 rgba(219, 219, 219, 0.50);
      border-radius: 4px;

      .package-name {
        height: 0.48rem;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #333333;
        margin-left: 0.2rem;
        img {
          padding-right: 0.10rem;
          height: 0.44rem;
          width: 0.44rem;
          padding-bottom: 0.09rem;
        }
      }
      .price-info {
        padding-left: 0.63rem;
        padding-top: 0.16rem;
        height: 0.56rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price-desc {

          .price {
            display: inline-block;
            font-family: PingFangSC-Semibold;
            font-size: 20px;
            color: #CC9C2D;
            height: 0.5rem;
            line-height: 0.56rem;
          }
          .desc {
            display: inline-block;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333333;
            height: 0.56rem;
            line-height: 0.56rem;
          }
        }
        .nums {
          padding-right: 0.4rem;
          img {
            width: 0.4rem;
            height: 0.4rem;
          }
          span {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            font-weight: 500;
            margin-left: 0.3rem;
            margin-right: 0.3rem;
          }
        }
      }

    }

    .pay-chose {
      margin-top: 0.6rem;
      margin-left: 0.4rem;
      height: 0.62rem;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      line-height: 0.62rem;
      span {
        display: inline-block;
        width: 1.96rem;
        height: 0.62rem;
        margin-right: 0.32rem;
        background: #FFFFFF;
        border-radius: 2px;
        line-height: 0.62rem;
        text-align: center;
        background: url("https://assets.urwork.cn/image/mpackage/checked-pay.png") no-repeat;
        background-size: 100%;
        color: #333333;
        font-weight: 500;
        //box-sizing: content-box;

      }
      .pay-noChecked {
        width: 1.96rem;
        height: 0.62rem;
        background: #FFFFFF;
        //@include border(#999999);
        // border: 1px solid #999999;
        color: #999999;
        border-radius: 2px;
        font-weight: 500;
        //box-sizing:border-box;
        background: url("https://assets.urwork.cn/image/mpackage/no-checked.png") no-repeat;
        background-size: 100%;
      }
    }

    .dividers {
      width: 6.7rem;
      margin-top: 0.4rem;
      margin-left: 0.4rem;
      position: relative;
      @include border-bottom(#E5E5E5);
    }
    .dividers1 {
      width: 100%;
      margin-top: 0.4rem;
      position: relative;
      @include border-bottom(#E5E5E5);
    }
    .dividers2 {
      width: 100%;
      //margin-top: 1.90rem;
      position: relative;
      @include border-bottom(#E5E5E5);
    }
    .company-info {
      padding-top: 0.4rem;
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      //height: 0.4rem;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      line-height: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      i {
        margin-left: 0.13rem;
        color: #999999;
      }
    }

    .referee {
      padding-top: 0.55rem;
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      //height: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        width: 2.34rem;
        height: 0.4rem;
        border: 0;
      }
      .input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color: #CCCCCC;
        ont-family: PingFangSC-Regular;
        font-size: 14px;
      }
      .input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #CCCCCC;
        ont-family: PingFangSC-Regular;
        font-size: 14px;
      }
      .input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #CCCCCC;
        ont-family: PingFangSC-Regular;
        font-size: 14px;
      }
      .input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #CCCCCC;
        ont-family: PingFangSC-Regular;
        font-size: 14px;
      }
    }

    .pay-method {
      padding-top: 0.4rem;
      padding-left: 0.4rem;
      margin-bottom: 1.90rem;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      .txt {
        color: #999999;;
        font-weight: 500;
      }
      .method-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 0.4rem;
        margin-top: 0.5rem;
        margin-bottom: 0.1rem;
        img {
          width: 0.42rem;
          margin-right: 0.21rem;
        }
      }
      .pay-method-name {
        display: inline-block;
        color: #333333;
        height: 0.42rem;
        line-height: 0.42rem;
      }
      .pay-check-box {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
      }
      .pay-method-chose {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        background: url("https://assets.urwork.cn/image/mpackage/checked.png") no-repeat;
        background-size:100%;
      }
      .pay-no-chose {
        @include border(#979797) {
          border-radius: 50%;
        }
      }
    }
    .bottom-div{
      position:fixed;
      width: 100%;
      bottom:0;
      .package-submit {
        background: #fff;
      padding-top: 0.15rem;
      padding-bottom: 0.15rem;
      padding-left: 0.5rem;
      padding-right: 0.4rem;
      box-sizing: content-box;
      height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: PingFangSC-Medium;
      .package-total {
        font-size: 16px;
        text-align: center;
        .total-txt {
          line-height: 0.8rem;
          padding-right: 0.1rem;
          color: #333333;
          font-weight: bold;
        }
        .total-price {
          text-align: center;
          line-height: 0.8rem;
          color: #FF4900;
        }
      }
      .submit-but {
        width: 3rem;
        height: 0.8rem;
        background: #FFCD00;
        border-radius: 2px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        font-weight: 500;
        text-align: center;
        line-height: 0.8rem;
      }

    }
    }

  }

  .clause_to_agree{
    margin-top:15px;
    margin-bottom:20px;
    font-family: PingFangSC-Medium;
    font-size: 13px;
    color: #333333;
    letter-spacing: 0;
    height:15px;
    line-height:15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .clause_to_agree a{
    font-family: PingFangSC-Medium;
    font-size: 13px;
    letter-spacing: 0;
    color:#157DFF;
  }
  .law_check{
    width:15px;
    height:15px;
    margin-right:5px;
    display:inline-block;
    background: url("https://assets.urwork.cn/image/app/law-check.png") no-repeat;
    background-size:100%;
  }
  .law_checked{
    width:15px;
    height:15px;
    margin-right:5px;
    display:inline-block;
    background: url("https://assets.urwork.cn/image/app/law-checked.png") no-repeat;
    background-size:100%;

  }
</style>


