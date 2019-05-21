<template>
  <page-wrap class="page-main">
    <title v-title>{{title}}</title>

    <!--<page-header>-->
      <!--<topbar :type="'back'">-->
        <!--<template slot="title">{{title}}</template>-->
      <!--</topbar>-->
    <!--</page-header>-->

    <page-header :isHeadroom="false">
      <topbar :type="'back'" :hideNativeTitleBar="true" :nativeBack="true" :nativeStatusBarStyle=1>
        <template slot="title">{{title}}</template>
        <template v-if="!hideShare" slot="actions"> <a v-if="isApp" href="javascript:void(0)" @click="sharePage()"></a></template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <template v-if="mainData.length == 1">
        <div v-if="status == 5"  class="main-header-1" >
          <p class="name">
            <span style="margin-left:30px;">{{data.spuName}}</span>
            <span class="question-img" @click="dialogClick(1)">

            </span>
          </p>
          <div class="price">
            <span class="zxj">专享价</span>
            <span class="mark">￥</span><span class="num">{{data.price}}</span>
          </div>
        </div>
        <div v-else="" class="main-header-2">
          <div class="buy-ed">
            <div class="name-type">
              <span class="name">{{data.spuName}}</span>
              <span class="type">{{data.skuName}}</span>
            </div>
            <div class="num-price">
              <span class="num">共1件</span><span class="price">实付：<em>￥{{data.price}}</em></span>
            </div>
          </div>
        </div>

      </template>
      <template v-else="">
        <div v-if="status == 5" class="main-header-3">
          <p class="name">
            <span style="margin-left:30px;">{{data.spuName}}</span>
            <span class="question-img" @click="dialogClick(1)">
              <!--<img src="https://assets.urwork.cn/image/mpackage/q-mark.png">-->
          </span>
          </p>
          <div class="price">
            <span class="zxj">专享价</span>
            <span class="mark">￥</span><span class="num">{{data.price}}</span>
          </div>
        </div>
        <div v-else="" class="main-header-2">
          <div class="buy-ed">
            <div class="name-type">
              <span class="name">{{data.spuName}}</span>
              <span class="type">{{data.skuName}}</span>
            </div>
            <div class="num-price">
              <span class="num">共1件</span><span class="price">实付：<em>￥{{data.price}}</em></span>
            </div>
          </div>
        </div>
        <div v-if="status == 5" class="tab">
          <div class="tab-type" @click="showMin()">
            <div class="haven">已选方案</div>
            <div><span class="type-txt">{{lateTime}}</span><span class="icon-right"><i class="uricon-arrow-right"></i></span></div>
          </div>
        </div>
      </template>
      <div v-bind:class="{ 'main-list': true, 'text-danger': mainData.length == 1&&status==5 }">
        <ul class="coupon-list">
          <li v-for="(item,index) in listCoupon">
            <div class="left">
              <template v-if="index%5==0">
                <img src="https://assets.urwork.cn/image/mpackage/couponbg1.jpg"/>
              </template>
              <template v-if="index%5==1">
                <img src="https://assets.urwork.cn/image/mpackage/couponbg2.jpg"/>
              </template>
              <template v-if="index%5==2">
                <img src="https://assets.urwork.cn/image/mpackage/couponbg3.jpg"/>
              </template>
              <template v-if="index%5==3">
                <img src="https://assets.urwork.cn/image/mpackage/couponbg4.jpg"/>
              </template>
              <template v-if="index%5==4">
                <img src="https://assets.urwork.cn/image/mpackage/couponbg5.jpg"/>
              </template>
            </div>
            <div class="right">
              <div class="name-price">
                <span class="name">{{item.couponName}}</span>
                <span class="price">￥<span>{{item.money}}</span></span>
              </div>
              <div class="date-num">
                <span v-if="item.isFixPeriod==1" class="date">有效期：{{item.floatDayCount}}天</span>
                <span v-else="" class="date">有效期：{{getMyDate(item.startDate)}}-{{getMyDate(item.endDate)}}天</span>
                <span class="num">x{{item.quantity}}张</span>
              </div>
              <div class="remake">
                <span v-if="item.isAllWorkstage == 1">适用范围：全国社区</span>
                <span v-else="">适用范围：部分社区</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="dotted-line" v-if="listCoupon.length!=0&&!(listGift1.length ==0&&data.isRights==0)">

        </div>
        <div class="ad-list">
            <ul>
              <li v-if="data.isRights == 1" @click="mylinkto('/v2/mPackage/rightslist?skuId='+skuId)">
                <div class="expl">
                  <p class="txt-t" v-if="data.rightsName">{{data.rightsName.split("_")[0]}}</p>
                </div>
                <div class="bg">
                  <p v-if="data.rightsName">{{data.rightsName.split("_")[1]}}</p>
                </div>
              </li>
              <li v-if="listGift1.length > 0" v-for="item in listGift1" @click="mylinkto('/v2/mPackage/giftContent?giftId='+item.giftId+'_'+encodeURIComponent(item.title))">
                <div class="expl">
                  <p class="txt-t">
                    <!--<span class="white-weight">8</span>-->
                    <span v-if="item.title">{{item.title.split("_")[0]}}</span>
                  </p>
                </div>
                <div class="bg">
                  <p v-if="item.title">{{item.title.split("_")[1]}}</p>
                </div>
              </li>
              <template v-if="listGift2.length > 0" v-for="item in listGift2">
                <li v-show="moreGift" @click="mylinkto('/v2/mPackage/giftContent?giftId='+item.giftId+'_'+encodeURIComponent(item.title))">
                  <div class="expl">
                    <p class="txt-t">
                      <!--<span class="white-weight">8</span>-->
                      <span v-if="item.title">{{item.title.split("_")[0]}}</span>
                    </p>
                  </div>
                  <div class="bg">
                    <p v-if="item.title">{{item.title.split("_")[1]}}</p>
                  </div>
                </li>
              </template>
            </ul>
            <!--<template v-if="moreShow">-->
              <!--<div v-show="!moreGift" class="more-down" @click="moreGiftFn()">-->
                <!--更多<span class="icon-down"><i class="uricon-arrow-right"></i></span>-->
              <!--</div>-->
              <!--<div v-show="moreGift" class="more-up" @click="moreGiftFn()">-->
                <!--收起<span class="icon-up"><i class="uricon-arrow-right"></i></span>-->
              <!--</div>-->
            <!--</template>-->
        </div>
      </div>
      <div class="kefu">
        <a href="tel:010-8765689">客服热线：010-8765689</a>
      </div>
      <div class="kong61"></div>
      <div v-if="status == 0" class="footer" @click="toPay(0)">
        <a href="javascript:void(0);">去支付</a>
      </div>
      <template v-if="status == 1">
        <div v-if="jihuo == 2" class="footer">
          <a href="javascript:void(0);">已激活</a>
        </div>
        <div v-else="" class="footer" @click="toOpen()">
          <a href="javascript:void(0);">激活</a>
        </div>
      </template>
      <div v-if="status == 2" class="footer">
        <a href="javascript:void(0);">已激活</a>
      </div>
      <div v-if="status == 4" class="footer">
        <a href="javascript:void(0);">已取消</a>
      </div>
      <div v-if="status == 6" class="footer">
        <a href="javascript:void(0);">已过期</a>
      </div>
      <template v-if="status==5">
        <div v-if="data.buyStatus == 1" class="footer">
          <a href="javascript:void(0);">身份不符不能购买</a>
        </div>
        <div v-if="data.buyStatus == 2" class="footer">
          <a href="javascript:void(0);">超限购数量不能购买</a>
        </div>
        <div v-else="" class="footer" @click="toPay(5)">
          <a href="javascript:void(0);">{{data.price==0?'立即领取':'立即开通'}}</a>
        </div>
      </template>

      <mt-popup v-model="popLate" popup-transition="popup-fade" :closeOnClickModal="false" position="bottom">
        <mt-picker ref="lateTimePicker" :slots="slotsLate" value-key='skuName' :closeOnClickModal="false"  @change="lateChange" style="width: 7.5rem;" showToolbar>
          <div class="picker-toolbar">
            <span class="mint-datetime-action mint-datetime-cancel" @click="cancelPicker()">取消</span>
            <span class="mint-datetime-action mint-datetime-confirm" @click="confirmPicker()">确定</span>
          </div>
        </mt-picker>
      </mt-popup>
      <transition name="fade">
      <div id="mask" v-show="dialog">
        <div class="dialog">
          <div class="content">
            <div class="explain">
              <div class="h3">
                <span class="line"></span>
                <span class="round"></span>
                <span class="txt">礼包详情</span>
                <span class="round"></span>
                <span class="line"></span>
              </div>
              <p v-html="this.data.context">
                <!--1、价值6000元（100元*60张）的全国会议室代金券；<br>-->
                <!--2、价值4000元（500元*8张）的全国场地代金券；<br>-->
                <!--3、线上推广福利：APPbanner广告3天（价值21000元）；<br>-->
                <!--4、全国电子屏广告7天，遍布全国80个社区，日曝光人次40000+；<br>-->
                <!--5、免费参加全国范围社区活动；<br>-->
                <!--6、享受优客工场企业会员全部八大权益（办公工具、在线效率、员工关怀福利、运动健康、媒体营销、新零售、娱乐、金融支持、出行酒店）。-->
              </p>
            </div>
          </div>
          <div class="bot" @click="dialogClick(0)">
            我知道了
          </div>
        </div>
      </div>
      </transition>

      <div id="mask2" v-show="dialog2">
        <div class="dialog">
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
      </div>
    </page-main>

  </page-wrap>
</template>

<script>
  import {mapState} from 'vuex'
  import store from 'store';
  import apiGiftDetail from 'api/mPackage/apiGiftDetail';
  import getOrderSkuDetail from 'api/mPackage/getOrderSkuDetail';
  import activeOrder from 'api/mPackage/apiActiveOrder';
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';

  import {passport} from 'src/globalData';
  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        isApp:isApp(),
        title: '礼包详情',
        popLate:false,
        slotsLate: [{
          values: [],
          defaultIndex:0
        }],
        lateTime:'',
        lateTimeTemp:'',
        lateTimeIndex:'',
        dialog:false,
        dialog2:false,
        spuId:'1',
        skuId:'1',
        mainData:[],
        data:'',
        listCoupon:[],
        listGift:[],
        listGift1:[],
        listGift2:[],
        status:'5',
        jihuo:'1',
        isRights:0,
        moreGift:true,
        moreShow:true,
        orderId:'0',
        orderDetailId:'0',
        shareUserId:'',
        shareUserName:'',
        hideShare:true
      }
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
      })
    },
    methods:{
     getMyDate(str) {
      var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate(),
        oTime = oYear +'-'+ oMonth.padStart(2,'0') +'-'+ oDay.padStart(2,'0')
        return oTime;
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
      toPay(n){
        let url = '/v2/mPackage/topay?skuId='+this.data.id+'_'+encodeURIComponent(this.data.skuName)+'_'+this.data.price+'_'+this.data.saleType+'_'+this.data.hasBuyCount+'_'+this.data.limitCount;
        if(this.shareUserId&&this.shareUserName){
          url = '/v2/mPackage/topay?skuId='+this.data.id+'_'+encodeURIComponent(this.data.skuName)+'_'+this.data.price+'_'+this.data.saleType+'_'+this.data.hasBuyCount+'_'+this.data.limitCount+'_'+this.shareUserId+'_'+encodeURIComponent(this.shareUserName);
        }
        if(n == 0){
          if(!this.isLogin){
            passport.toLogin();
          }else{
            var urll = getLocation().origin + '/v2/mPackage/toPay?orderId='+ this.orderId;
            if(this.isWEIxin()){
              location.href='/pay/redirect?retUrl='+encodeURIComponent(urll);
            }else {
                let linkUrl = '/v2/mPackage/toPay?orderId=' + this.orderId;
//              if (isApp()) {
//                  alert(urll);
//                this.$DANativeApi.navigateTo({
//                  urll
//                })
//              } else {
//                this.$router.push( '/v2/mPackage/toPay?orderId=' + this.orderId);
//              }
              this.mylinkto(linkUrl);
            }
          }
        }else{
          if(!this.isLogin){
            passport.toLogin();
          }else{
            var confirmUrl = location.origin+url;
            if(this.isWEIxin()){
              location.href='/pay/redirect?retUrl='+encodeURIComponent(confirmUrl);
            }else{
              this.mylinkto(url);
            }
          }
        }
      },
      toOpen(){
        this.dialog2=true;
      },
      dialogFn(n) {
        if(n ==0){
          this.dialog2 = false;
        }
        if(n==1){
          activeOrder({targetId:this.orderDetailId}).then(res=>{
            if(res.retCode==0){
              this.$toast("激活成功");
              this.mylinkto('/v2/mPackage/orderList');
            }else{
              this.$toast("激活失败");
            }
          })
          this.dialog2 = false;
        }
      },
      showMin(){
          this.popLate=true;
      },
      lateChange(picker, values) {
          if(values&&values!=""){
            this.lateTimeTemp = values[0].skuName;
            this.skuId = values[0].id;
          }
      },
      cancelPicker(){
          this.$refs.lateTimePicker.setValues([this.lateTime]);
          this.popLate=false;
      },
      confirmPicker(){
          this.lateTime=this.lateTimeTemp;
          this.popLate=false;
          this.getSku(this.skuId);
      },
      dialogClick(n) {
        n == 1 ? this.dialog = true:this.dialog = false;
      },
      getSku(skuid){
        let index = 0;
        this.slotsLate[0].values = [];
        this.mainData.map((obj,idx)=>{
          if(obj.id == skuid){
            this.data = obj;
            this.isRights = obj.isRights;
            index = idx;
          }
          this.slotsLate[0].values.push(obj);
        })
        this.$set(this.slotsLate[0],'defaultIndex',index)
        this.listCoupon = this.data.listCoupon;
        this.listGift = this.data.listGift;
        this.description = this.data.description;
        this.lateTime = this.data.skuName;
        this.isRights == 1 ? this.giftGroup(1):this.giftGroup(2);
        if(this.isRights == 1){
          if(parseInt(this.listGift1.length + this.listGift2.length) > 2){
            this.moreShow = true;
          }else{
            this.moreShow = true;
          }
        }else{
          if(parseInt(this.listGift1.length + this.listGift2.length) > 3){
            this.moreShow = true;
          }else{
            this.moreShow = true;
          }
        };
        this.show = true;
      },
      getDetail(skuid) {
        apiGiftDetail({skuId:this.skuId}).then(res=>{
            if(res.retCode == 0){
              this.show = true;
              this.mainData = res.data;
              this.mainData.map((obj,idx)=>{
                if(obj.focused == 1){
                  this.getSku(obj.id);
                }
              })
            }
        })
      },
      getDetailOrder(skuid) {
        getOrderSkuDetail({orderDetailId:this.orderDetailId}).then(res=>{
          if(res.retCode == 0){
            this.show = true;
            this.mainData = res.data;
            this.mainData.map((obj,idx)=>{
              if(obj.focused == 1){
                this.getSku(obj.id);
              }
            })
          }
        })
      },
      periodValidity(start,end){
          let time = end - start;
          let days = Math.round(time/86400000);
          return days;
      },
      moreGiftFn(){
         this.moreGift = !this.moreGift;
      },
      giftGroup(n){
          this.listGift1 = [];  this.listGift2 = [];
          this.listGift.map( (obj,idx)=> {
              idx <= n ? this.listGift1.push(obj):this.listGift2.push(obj)
          })
      },
      sharePage(){
        let _this = this;
        let url = getLocation().origin + '/v2/mPackage/detail?skuId='+this.spuId+'_'+this.skuId+'_'+this.data.price+'_'+this.$store.state.userInfo.userId+'_'+encodeURIComponent(this.$store.state.userInfo.realName);
        this.$DANativeApi.share({
          title: "优客工场会员礼包",
          desc: "会员权益重磅升级，优客工场会员专享",
          url: url,
          imgUrl: 'https://assets.urwork.cn/image/mpackage/share_icon.jpg',
          completion: function (res) {
              //app 分享成功之后的回调！！
          }
        });
      }
    },
    created() {
      if(this.$route.query.spuId){
        this.hideShare = true;//来自订单
        this.spuId = this.$route.query.spuId.split("_")[0];
        this.skuId = this.$route.query.spuId.split("_")[1];
        this.orderId = this.$route.query.spuId.split("_")[2]||0;
        this.orderDetailId = this.$route.query.spuId.split("_")[3]||0;
        this.status = this.$route.query.spuId.split("_")[4]||5;
        this.jihuo = this.$route.query.spuId.split("_")[5]||1;
      }
      if(this.$route.query.skuId){
        this.hideShare = false;//来自列表
        this.spuId = this.$route.query.skuId.split("_")[0];
        this.skuId = this.$route.query.skuId.split("_")[1];
        this.shareUserId = this.$route.query.skuId.split("_")[3];
        this.shareUserName = this.$route.query.skuId.split("_")[4];
      }
      isLogin({
        success: () => {
          this.hideShare ? this.getDetailOrder(this.skuId):this.getDetail(this.skuId);
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
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  /deep/ .page-topbar .actions{
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;
    padding-bottom: 3px;
    padding-right: 15px;
    font-size: 18px;
    text-align: center;
    line-height: 34px;
    a{
      width: 17px;
      height: 17px;
      background: url("https://assets.urwork.cn/image/mpackage/share-icon.png") no-repeat;
      background-size: 100%;
      display: inline-block;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: .3s ease-in-out;
    transform: translateY(0);
  }
  .fade-enter{
    transition: .3s ease-in-out;
    transform: translateY(-100%);
  }
  .fade-leave-to{
    transition: .3s ease-in-out;
    transform: translateY(100%);
  }
  .kong61{
    height: 61px;
  }
  .page-main{
    background-color: #f8f8f8;
  }
  #main{
    .main-header-1{
      width: 100%;
      height: 3.02rem;
      background: url("https://assets.urwork.cn/image/mpackage/bac.png") no-repeat;
      background-size: 100%;
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name{
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 20px;
        margin-top: -0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .question-img{
          width: 16px;
          height: 16px;
          display: inline-block;
          background: url("https://assets.urwork.cn/image/mpackage/q-mark.png") no-repeat;
          background-size: 100%;
          margin-left: 10px;
        }
      }
      .price{
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        .zxj{
          font-family: PingFangSC-Regular;
          font-size: 13px;
        }
        .mark{
          font-family: PingFangSC-Semibold;
          font-size: 17px;
          font-weight: 500;
        }
        .num{
          font-family: PingFangSC-Semibold;
          font-size: 25px;
          font-weight: 500;
        }
      }
    }
   .main-header-2{
     width: 100vw;
     height: 3.02rem;
     background: url("https://assets.urwork.cn/image/mpackage/new-bgc.png") no-repeat;
     background-size: 100%;
     padding: 0 15px;
     padding-top: 0.6rem;
     .buy-ed{
       height: 2.2rem;
       background: #ffffff;
       border-radius: 5px;
       padding: 0 15px;
       .name-type{
         height: 1.2rem;
         display: flex;
         align-items: center;
         justify-content: flex-start;
         border-bottom: 1px dotted #d8d8d8;
         .name{
           font-family: PingFangSC-Medium;
           font-size: 17px;
           color: #333333;
           letter-spacing: 0;
           font-weight: 600;
           overflow: hidden;
           text-overflow: ellipsis;
           display: -webkit-box;
           -webkit-line-clamp:2;
           /* autoprefixer: off */
           -webkit-box-orient: vertical;
           /* autoprefixer: on */
           .question-img{
             width: 16px;
             height: 16px;
             display: inline-block;
             background: url("https://assets.urwork.cn/image/mpackage/q-mark.png") no-repeat;
             background-size: 100%;
             margin-bottom: -2px;
           }
         }
         .type{
           font-family: PingFangSC-Regular;
           font-size: 12px;
           color: #FF6D2F;
           letter-spacing: 0;
           margin-left: 5px;
           position: relative;
           @include border(#FF6D2F){
             border-radius: 2px;
           }
         }
       }
       .num-price{
         height: 1rem;
         display: flex;
         align-items: center;
         justify-content: space-between;
         font-family: PingFangSC-Regular;
         font-size: 13px;
         color: #333333;
         letter-spacing: 0;
         .price{
           em{
             font-size: 18px;
             font-weight: 600;
             color: #333333;
           }
         }
       }
     }
   }
    .main-header-3{
      width: 100vw;
      height: 2.8rem;
      background: url("https://assets.urwork.cn/image/mpackage/bac.png") no-repeat;
      background-size: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-top: 28px;
      .name{
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        .question-img{
          width: 16px;
          height: 16px;
          display: inline-block;
          background: url("https://assets.urwork.cn/image/mpackage/q-mark.png") no-repeat;
          background-size: 100%;
          margin-left: 10px;
        }
      }
      .price{
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .zxj{
          font-family: PingFangSC-Regular;
          font-size: 0.26rem;
        }
        .mark{
          font-family: PingFangSC-Semibold;
          font-size: 0.34rem;
          font-weight: 500;
        }
        .num{
          font-family: PingFangSC-Semibold;
          font-size: 0.5rem;
          font-weight: 500;
          margin-bottom: 5px;
        }
      }
    }
    .tab{
      text-align: center;
      margin-top: -0.55rem;
      padding: 0 15px;
      .tab-type{
        width: 100%;
        height: 0.86rem;
        line-height: 0.86rem;
        background: #FFFFFF;
        box-shadow: 0 2px 7px 0 rgba(160,160,160,0.15);
        border-radius: 5px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #999999;
        letter-spacing: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        .haven{
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #666666;
          letter-spacing: 0;
        }
        .type-txt{
          font-family: PingFangSC-Semibold;
          font-size: 15px;
          color: #333333;
          letter-spacing: 0;
          font-weight: 600;
          margin-right: 13px;
        }
        .icon-right{
          font-size: 10px;
        }
        /* ul{
           width: 100%;
           height: 100%;
           display: flex;
           align-items: center;
           justify-content: space-evenly;
           li{
             height: 100%;
             border-bottom: 1px solid transparent;
           }
           .checked{
             border-bottom: 1px solid #FFD53D;
           }
         }*/
      }
    }
    .main-list{
      background: #ffffff;
      background: #FFFFFF;
      box-shadow: 0 0 20px 0 rgba(206,206,206,0.50);
      border-radius: 5px;
      margin:15px;
      >ul{
        padding: 15px 15px 5px 15px;
        li{
          width: 100%;
          height: 2.2rem;
          background: url("https://assets.urwork.cn/image/mpackage/new-coupon1.png") no-repeat;
          background-size: 100%;
          display: flex;
          margin-bottom: 15px;
          .left{
            width: 35%;
            height: 100%;
            padding: 13px;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .right{
            width: 65%;
            padding: 0 10px 0 18px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .name-price{
              display: flex;
              justify-content: space-between;
              height: 34px;
              line-height: 34px;
              .name{
                width: 60%;
                font-family: PingFangSC-Semibold;
                font-size: 17px;
                color: #333333;
                letter-spacing: 0;
                font-weight: 600;
                margin-top: -1px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }
              .price{
                font-family: PingFangSC-Semibold;
                font-size: 15px;
                color: #CC9C2D;
                letter-spacing: 0;
                text-align: center;
                span{
                  font-size: 23px;
                }
              }
            }
            .date-num{
              font-family: PingFangSC-Regular;
              font-size: 12px;
              letter-spacing: 0;
              display: flex;
              justify-content: space-between;
              .date{
                color: #FF6D2F;
              }
              .num{
                color: #999999;
              }
            }
            .remake{
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #999999;
              letter-spacing: 0;
              margin-top: 10px;
              span{
                background: #ffffff;
                padding: 0 3px;
              }
            }
          }
        }
      }
      .dotted-line{
        position: relative;
        @include border-bottom(#C2C2C2,20,dashed);
        margin-bottom: 20px;
      }
      .ad-list{
        overflow: hidden;
        >ul{
          padding: 0 15px;
          li{
            height: 1.7rem;
            margin-bottom: 15px;
            position: relative;
            .expl{
              width: 1.64rem;
              height: 1.18rem;
              background: #DECBA4;
              box-shadow: 0 2px 6px 0 rgba(198,176,133,0.56);
              border-radius: 4px;
              position: absolute;
              left: 0;
              top: 50%;
              -webkit-transform: translate(0,-50%);
              -o-transform: translate( 0,-50%);
              -moz-transform: translate(0,-50%);
              -ms-transform: translate(0,-50%);
              transform: translate(0,-50%);
              .txt-t{
                font-family: PingFangSC-Semibold;
                font-size: 15px;
                color: #FFFFFF;
                letter-spacing: 0;
                line-height: 1.18rem;
                font-weight: 600;
              }
              .txt-n{
                display: flex;
                text-align: center;
                justify-content: center;
                font-family: PingFangSC-Regular;
                font-size: 15px;
                color: #ffffff;
                .white-weight{
                  font-family: DINAlternate-Bold;
                  font-size: 37px;
                  font-weight: 600;
                  margin-right: 4px;
                  padding-top: 4px;
                }
              }
            }
            .bg{
              width: 88.9%;
              height: 100%;
              background: url("https://assets.urwork.cn/image/mpackage/new-coupon2.png") no-repeat;
              background-size: 100%;
              border-radius: 5px;
              float: right;
              p{
                text-align: left;
                padding-left: 37.333%;
                font-family: PingFangSC-Semibold;
                font-size: 17px;
                line-height: 1.7rem;
                color: #333333;
                letter-spacing: 0;
                font-weight: 400;
              }
            }
            p{
              width: 100%;
              text-align: center;
              font-size: 14px;
              color: #333333;
            }
            div{
              display: flex;
              text-align: center;
              justify-content: center;
              font-family: PingFangSC-Regular;
              font-size: 15px;
              color: #666666;
              .gold-weight{
                font-family: DINAlternate-Bold;
                font-size: 37px;
                color: #D3A845;
                font-weight: 600;
                margin-right: 4px;
              }
            }
          }
        }
        .more-down{
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #999999;
          margin-bottom: 15px;
          .icon-down{
            margin-left: 4px;
            transform:rotate(90deg);
            -ms-transform:rotate(90deg); 	/* IE 9 */
            -moz-transform:rotate(90deg); 	/* Firefox */
            -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
            -o-transform:rotate(90deg); 	/* Opera */
          }
        }
        .more-up{
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #999999;
          margin-bottom: 15px;
          .icon-up{
            margin-left: 4px;
            transform:rotate(-90deg);
            -ms-transform:rotate(-90deg); 	/* IE 9 */
            -moz-transform:rotate(-90deg); 	/* Firefox */
            -webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
            -o-transform:rotate(-90deg); 	/* Opera */
          }
        }
      }
    }
    .kefu{
      padding: 25px 0;
      text-align: center;
      a{
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #B8B8B8;
        letter-spacing: 0;
        text-align: center;
        border-bottom: 1px solid #b8b8b8;
      }
    }
    .footer{
      width: 100%;
      height: 61px;
      background: #ffffff;
      padding: 10px 15px;
      position: fixed;
      bottom: 0;
      a{
        width: 100%;
        height: 100%;
        background: #FFD53D;
        border-radius: 2px;
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .text-danger{
      margin-top: -1rem!important;
  }
  #mask {
    width: 100%;
    height: 100%;
    background: rgba(191,191,191,0.50);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1900;
    .dialog {
      z-index: 1901;
      width: 6.7rem;
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
          /*font-weight: 600;*/
        }
        .explain{
          .h3{
            font-family: PingFangSC-Semibold;
            font-size: 15px;
            color: #333333;
            letter-spacing: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            span{
              display: inline-block;
            }
            .txt{
              margin: 0 7px;
            }
            .line{
              width: 30px;
              height: 1px;
              background: #BCA049;
            }
            .round{
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background: #BCA049;
              margin: 0 8px;
            }
          }
          p{
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #666666;
            letter-spacing: 0;
            text-align: justify;
            line-height: 23px;
            overflow: scroll;
            max-height: 6rem;
          }
        }
      }
      .bot {
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #097FFF;
        letter-spacing: 0;
        margin-top: 15px;
        /* padding-top: 10px; */
        border-top: 1px solid #f4f4f4;
        width: 2.4rem;
        height: 0.7rem;
        line-height: 0.7rem;
        border: 1px solid #666666;
        border-radius: 0.35rem;
        font-size: 14px;
        color: #333333;
        margin: 0.25rem auto;
      }

    }
  }
  #mask2 {
    width: 100%;
    height: 100%;
    background: rgba(127, 126, 125, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    .dialog {
      z-index: 901;
      width: 6.7rem;
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

