<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>
    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>
    <page-main :show="show">
      <div class="banner">
        <template v-if="bannerList.length>0">
          <Swiper :bannerList="bannerList" :showDot="false" :paddingTop="66.67" :wrapperPadding="0"
                  :setInterval="0" :column="1" :transformScale="true" :autoPlay="false" :slideRadius="0"
                  :loop="false">
          </Swiper>
        </template>
      </div>
      <div class="info">
        <ul>
          <li class="li-info">
           <div class="name-icon">
             <p class="name">{{detail.name}}</p><span class="icon">活动优惠</span>
           </div>
            <div class="price-money">
              <p>产品价：<span>{{detail.price}}RMB</span></p>
            </div>
            <div class="price-point">
                <p v-if="vip">
                  <span class="p-point"><span class="vipicon"></span>{{detail.memberPoints}}积分</span>
                  <del>{{detail.points}}积分</del>
                </p>
                <p v-else="">
                  <!--<span class="p-point"><span class="vipicon"></span>3000积分</span>-->
                  <span class="p-poi">{{detail.points}}积分</span>
                </p>
            </div>
          </li>
          <li v-if="detail.identity==1" class="li-address" @click="openNamePicker()">
            <p>
              <span>选择企业</span>{{companyName}}
            </p>
            <div class="more"><i class="uricon-arrow-right"></i></div>
          </li>
          <li v-if="detail.consigneeAddress" class="li-address">
            <p>
              <span>收货地址</span>{{detail.consigneeAddress}}
            </p>
            <div class="more"><i class="uricon-arrow-right"></i></div>
          </li>
        </ul>
      </div>
      <div class="img-txt">
        <h3>礼品介绍</h3>
        <div v-if="detail.type==1" class="description" v-html="detail.productDetail.replace(/\r\n/g,'<br>')">

        </div>
        <div v-else="" class="description" v-html="detail.productDetail">

        </div>
      </div>
      <div class="kong"></div>

      <template v-if="detail.identity&&detail.identity==1">
        <div v-if="!userCompanyIdSelected.isboss" class="buy" @click="dialogFn(1)">
            <span>
              立即兑换
            </span>
        </div>
        <div v-else class="buy" @click="dialogFn1(1)">
            <span>
              立即兑换
            </span>
        </div>
      </template>
      <div v-else class="buy" @click="buy()">
          <span>
            立即兑换
          </span>
      </div>
    
    
      <transition name="fade">
          <div id="mask" v-show="dialog">
            <div class="dialog">
              <p class="tit">确认信息</p>
              <div class="content">
               使用{{detail.points}}企业积分，为“{{companyName}}”兑换“{{detail.name}}”
              </div>
              <div class="bot">
                <div class="close" @click="dialogFn(0)">
                  取消
                </div>
                <div class="sure" @click="buyByCompany()">
                  确认
                </div>
              </div>

            </div>
          </div>
      </transition>
      <transition name="fade1">
          <div id="mask1" v-show="dialog1">
            <div class="dialog">
              <p class="tit">
                只有企业管理员才能兑换<br>
                此礼品哦～
              </p>
              <div class="bot">
                <div class="close" @click="dialogFn1(0)">
                  我知道了
                </div>
              </div>
            </div>
          </div>
      </transition>
      <transition name="my-trans">
        <div id="mask2" v-show="prizeDiolog">
          <div class="diolog">
            <div class="content">
              <a class="click" @click="prizeDiologclosed()">
                <p>查看详情</p>
              </a>
              <h3>{{detail.name}}</h3>
            </div>
          </div>
        </div>
      </transition>
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
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {passport} from 'src/globalData';
  import {getScheme, setScheme} from 'nativeFix';
  import store from 'store';
  import Swiper from 'lib/swiper/Swiper';
  import DetailBanner from 'src/app/activity/modules/DetailBanner';
  import apiExchangeDetail from 'api/credit/apiExchangeDetail';
  import apiExchangeBycompany from 'api/credit/apiExchangeBycompany';
  import apiExchange from 'api/credit/apiExchange';
  import apiLotteryPayStatus from 'api/credit/apiLotteryPayStatus';

  import getCompanyList from 'api/mPackage/apiGetCompanyList';
  export default {
    components: {
      Swiper,
      DetailBanner
    },
    data: () => {
      return {
        show: false,
        title: '礼品兑换',
        isAPP: false,
        banners:[{}],
        detail:'',
        currentTime:'',
        vip:false,
        prizeDiolog:false,
        dialog:false,
        dialog1:false,
        companyName: '',
        companyNameTemp: '',
        companyId: 0,
        companyIdTemp: 0,//todo
        popPicker: false,
        slots: [{
          values: [],
          defaultIndex: 0
        }],
        companyList: [],
        noCompany: true,
        userCompanyIdSelected:{},
        userCompanyIdSelectedTemp:{}
      }
    },
    methods:{
      getCompList(res={}){
          // getCompanyList().then(res => {
            if (res) {
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
                this.userCompanyIdSelected = this.companyList[0];
                this.companyName = this.companyList[0].name;
                this.companyId = this.companyList[0].id;
                this.noCompany = false;
              } else {
                this.noCompany = true;
              }
            }
          // });
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
        this.popPicker = true;
        this.closeTouch();
      },
      nameChange(picker, values) {
        console.log("values", values,picker);
        if (values[0]) {
          this.userCompanyIdSelectedTemp = values[0];
          this.companyNameTemp = values[0].name;
          this.companyIdTemp = values[0].id;
        }
      },
      cancelPicker(){
        //this.$refs.namePicker.setValues([this.companyName]); this.$set(this.slots[0], 'defaultIndex',index)
        this.popPicker = false;
        this.openTouch();
        for (let [index, elem] of this.slots[0].values.entries()) {
          elem.name == this.companyName ?   this.$refs.namePicker.setSlotValue(index,this.userCompanyIdSelected):''
        }

        // this.companyNameTemp = this.companyName;
        // this.companyIdTemp = this.companyId;
        // this.userCompanyIdSelectedTemp = this.userCompanyIdSelected;


        console.log(this.userCompanyIdSelected)
      },
      confirmPicker(){
        this.companyName = this.companyNameTemp;
        this.companyId = this.companyIdTemp;
        this.userCompanyIdSelected = this.userCompanyIdSelectedTemp;
        this.popPicker = false;
        this.openTouch();
      },


      dialogFn(n){
        n ? this.dialog = true:this.dialog = false
      },
      dialogFn1(n){
        n ? this.dialog1 = true:this.dialog1 = false
      },
      buyByCompany(){
         this.dialogFn(0);
         this.companyBuy();
      },
      linkto(router) {
        this.$router.push(router);
      },
      prizeDiologclosed(){
        this.prizeDiolog = false;
        if(this.detail.type == 1){
          var url = 'http://m.urwork.cn/coupon/list';
          if(isApp()){
            this.$DANativeApi.navigateTo({
              url
            })
          }else{
            window.location.href = url;
          }
        }else if(this.detail.type == 2){
          this.$router.push('/v2/ugift');
        }
      },
      paystatus(n){
        apiLotteryPayStatus({
          "payNo":n
        },this.$store.state.userInfo.userId).then(res => {
//          console.log(res,'支付状态');
          if(res.retCode == 0){
//            this.$toast('兑换成功');
            this.prizeDiolog = true;
          }else{
            this.$toast(res.retMsg);
          }
        })
      },
      getDetail() {
        let _this = this;
        apiExchangeDetail({
          "id":this.$route.query.id
        },this.$store.state.userInfo.userId).then(res => {
          this.getCompList({"data":res.data.userCompanyList||{data:[]}})
          this.detail = res.data.pointsGoods;
          let arr = res.data.pointsGoods.imgUrl.split(',');
//          console.log(arr)
          arr.length ? this.banners = arr:this.banners = ['1']
          this.vip = res.data.vip;
//          console.log(this.detail);
          this.show = true;
        })
      },
      buy() {
        apiExchange({
          "goodsId":this.detail.id,
          "addressId":this.detail.addressId,
          "skuId":this.detail.skuId
        },this.$store.state.userInfo.userId).then(res => {
          if(res.retCode == 0){
            this.paystatus(res.data);
          }else{
            this.$toast(res.retMsg);
          }
        })
      },
       companyBuy() {
        apiExchangeBycompany({
          "goodsId":this.detail.id,"addressId":this.detail.addressId,"skuId":this.detail.skuId
        },this.$store.state.userInfo.userId,this.userCompanyIdSelected.companyId).then(res => {
          if(res.retCode == 0){
            this.paystatus(res.data);
          }else{
            this.$toast(res.retMsg);
          }
        })
      }
    },
    computed: {
      bannerList() {
        if(!this.banners) return;
        let list = [];
        let n = 0;
        this.banners.forEach(item => {
          if(item){
            n++
            list.push({
              linkUrl: 'javascript:void(0);',
              image: 'https://image.urwork.cn/'+item,
              id: n
            })
          }
        });
        return list;
      }
    },
    created() {
//      console.log(this.$route.query.id);
      this.getDetail();
      // this.getCompList();
      this.isAPP = isApp();
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  #main{
    .info{
      padding: 0 20px;
      border-bottom: 8px solid #f5f5f5;
      ul{
        li{
          border-bottom: 1px solid #ebebeb;
          &:last-child{
            border-bottom: none;
          }
        }
        .li-info{
          padding: 15px 0;
          .name-icon{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .name{
              font-family: PingFangSC-Semibold;
              font-size: 18px;
              color: #333333;
              letter-spacing: 0;
              text-align: left;
              font-weight: 600;
            }
            .icon{
              background-image: linear-gradient(-180deg, #FF6756 0%, #EE434B 100%);
              border-radius: 50px;
              font-family: PingFangSC-Regular;
              font-size: 10px;
              color: #FFFFFF;
              letter-spacing: 0;
              text-align: center;
              margin-left: 8px;
              padding: 0 5px;
            }
          }
          .price-money{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #999999;
            letter-spacing: 0;
            text-align: left;
            margin-top: 6px;
          }
          .price-point{
            margin-top: 7px;
            p{
              .p-poi{
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #F0484C;
                text-align: right;
                background: #FFFFFF;
                border: 1px solid #FD6255;
                border-radius:2px;
                padding: 0 5px;
              }
              .p-point{
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #F0484C;
                text-align: right;
                background: #FFFFFF;
                border: 1px solid #FD6255;
                border-left:none;
                border-radius:0 2px 2px 0;
                padding: 0 5px;
                padding-left: 30px;
                position: relative;
                .vipicon{
                  width: 27px;
                  height: 100%;
                  display: inline-block;
                  position: absolute;
                  top: 0;
                  left: 0;
                  background: url("https://assets.urwork.cn/image/credit/vip_icon.jpg") no-repeat;
                  background-size: 100%;
                }
              }
              del{
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #666666;
                text-align: right;
              }
            }
          }
        }
        .li-address{
          display: flex;
          align-items: center;
          justify-content: space-between;
          p{
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            color: #333333;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            span{
              height: 50px;
              display: inline-block;
              color: #bbbbbb;
              padding-right: 10px;
            }
          }
        }
      }
    }
    .img-txt{
      padding: 17px 20px;
      h3{
        font-size: 16px;
        font-weight: 700;
      }
      .description{
        margin-top: 15px;
      }
    }
    .kong{
      height: 60px;
    }
    .buy{
      width: 100%;
      height: 50px;
      position: fixed;
      bottom: 0;
      background: #f8f8f8;
      span{
        width: 100%;
        height: 100%;
        background: #e83324;
        border-radius: 2px;
        color: #ffffff;
        display: block;
        text-align: center;
        line-height: 50px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        letter-spacing: 0;
      }
    }
  }
  #mask2{
    width: 100%;
    height: 100%;
    background: rgba(23, 21, 20, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
    //display: none;
    .diolog{
      z-index: 901;
      width: 75vw;
      position: fixed;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .content{
        width: 75vw;
        height: 90vw;
        /*height: 6rem;*/
        background: url("https://assets.urwork.cn/image/credit/congratulations.jpg") no-repeat;
        background-size: 100% 100%;
        position: relative;
        /*display: flex;*/
        /*justify-content: center;*/
        /*flex-direction: column;*/
        /*align-items: center;*/
        .click{
          width: 2.6rem;
          height: 1rem;
          position: absolute;
          bottom: 5%;
          left: 51%;
          -webkit-transform: translate(-50%, -50%);
          -o-transform: translate(-50%, -50%);
          -moz-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          img{
            width: 100%;
            height: 100%;
          }
          p{
            font-size: 15px;
            width: 100%;
            height: 100%;
            color: #ffffff;
            line-height: 50px;
            text-align: center;
          }
        }
          h3{
            width: 70%;
            font-size: 16px;
            font-weight: 600;
            color: #333;
            text-align: center;
            position: absolute;
            bottom: 30%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行
          }
        p{
          font-size: 12px;
          color: #333;
          padding: 0 20px 10px;
          line-height: 20px;
        }
      }
    }
  }
  .my-trans-enter-active, .my-trans-leave-active {
    transition: all .4s ease-out;
  }
  .my-trans-enter {
    transform: translateY(500px);
    opacity: 0;
  }
  .my-trans-leave-active {
    transform: translateY(500px);
    opacity: 0;
  }


  .fade-enter-active, .fade-leave-active {
    transition: .3s ease-in-out;
    transform: translateY(0);
  }
  .fade-enter{
    transition: .3s ease-in-out;
    transform: translateY(100%);
  }
  .fade-leave-to{
    transition: .3s ease-in-out;
    transform: translateY(-100%);
  }

 #mask {
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
      padding: 25px 38px 25px 38px;
      position: fixed;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .tit{
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #1D1D1D;
        letter-spacing: 0;
        text-align: center;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .content {
        // width: 6.7rem;
        /*height: 2.2rem;*/
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        // .cancel {
        //   margin-bottom: 0.9rem;
        // }
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #666666;
        text-align: center;
      }
      .bot {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 25px;
        .close {
          width: 2.4rem;
          height: 35px;
          @include border(#333333) {
            border-radius: 35px;
          }
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          line-height: 35px;
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


  .fade1-enter-active, .fade1-leave-active {
    transition: .3s ease-in-out;
    transform: translateY(0);
  }
  .fade1-enter{
    transition: .3s ease-in-out;
    transform: translateY(100%);
  }
  .fade1-leave-to{
    transition: .3s ease-in-out;
    transform: translateY(-100%);
  }
   #mask1 {
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
      padding: 40px 38px 25px 38px;
      position: fixed;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .tit{
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #1D1D1D;
        letter-spacing: 0;
        text-align: center;
        font-weight: 600;
      }
      .content {
        // width: 6.7rem;
        /*height: 2.2rem;*/
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        // .cancel {
        //   margin-bottom: 0.9rem;
        // }
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #666666;
        text-align: center;
      }
      .bot {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 30px;
        .close {
          width: 150px;
          height: 35px;
          @include border(#333333) {
            border-radius: 35px;
          }
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          line-height: 35px;
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


