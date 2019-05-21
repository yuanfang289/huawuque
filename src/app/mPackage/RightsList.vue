<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show" style="height: 500px">
      <div class="rights">
        <div class="float-box">
          <ul>
            <template v-for="item in list">
              <li v-if="item.isRights" @click="linkto(item)">
                <img class="img" :src="item.couponType.image+'?imageMogr2/auto-orient/thumbnail/!320x220r/gravity/Center/crop/320x220/format/'+isWebp" onerror="javascript:this.src='https://assets.urwork.cn/image/g_def.png';">
                <div class="txt">
                  <p class="p">
                    <span class="price">{{item.couponType.discountTip}}</span>
                    <!--<span v-if="item.couponType.remainderQuantity == 0" class="left_num">已领完</span>-->

                    <span v-if="item.expireDays==0" class="left_num">已过期</span>
                    <span v-else="" class="left_num">剩余{{item.expireDays}}天</span>
                  </p>
                  <p class="name">{{item.couponType.couponName}}</p>
                </div>
                  <div class="btn_box" v-if="item.couponType.isPre==0||item.couponType.isPre==1||item.couponType.isPre==3">
                    <div v-if="item.couponType.obtained == 1" class="button_grey">
                      已领取
                    </div>
                    <template v-else="">
                      <div v-if="item.couponType.remainderQuantity == 0" class="button_grey">
                        已领完
                      </div>
                      <div v-else="" class="button">
                        立即领取
                      </div>
                    </template>
                  </div>
                  <div v-else="" class="btn_box">
                    <div class="button">
                      立即参与
                    </div>
                  </div>
              </li>

              <li v-else="">
                <img class="img" :src="item.couponType.image+'?imageMogr2/auto-orient/thumbnail/!320x220r/gravity/Center/crop/320x220/format/'+isWebp" onerror="javascript:this.src='https://assets.urwork.cn/image/g_def.png';">
                <div class="txt">
                  <p class="p">
                    <span class="price">{{item.couponType.discountTip}}</span>
                    <!--<span v-if="item.couponType.remainderQuantity == 0" class="left_num">已领完</span>-->
                    <span v-if="item.expireDays" class="left_num">剩余{{item.expireDays}}天</span>
                  </p>
                  <p class="name">{{item.couponType.couponName}}</p>
                </div>
                <div class="btn_box">
                  <div class="button_grey">
                    立即领取
                  </div>
                </div>
              </li>
              <!--<li @click="threeGo(item.path,item.name)">-->
                <!--<img class="img" :src="item.couponType.img">-->
                <!--<div class="txt">-->
                  <!--<p class="p">-->
                    <!--<span class="price">{{item.couponType.price}}</span>-->
                    <!--<span v-if="item.couponType.remainderQuantity == 0" class="left_num">已领完</span>-->
                    <!--<span v-else="" class="left_num">不限数量</span>-->
                  <!--</p>-->
                  <!--<p class="name">{{item.couponType.name}}</p>-->
                <!--</div>-->
                <!--<div class="btn_box">-->
                  <!--<div class="button">-->
                    <!--立即领取-->
                  <!--</div>-->
                <!--</div>-->
              <!--</li>-->
            </template>

          </ul>
        </div>
      </div>
      <!--<a href="q" class="ask-icon"></a>-->

      <div id="mask" v-show="dialog">
        <div class="dialog">
          <div class="content"  @click="tipsClick()">
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
  import apiSkuRightsList from 'api/mPackage/apiSkuRightsList';
  import apiTicket from 'api/user/apiTicket';
  import store from 'store';
  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        title: '权益',
        userId:'',
        list:'',
        skisTicketStatusList:'',
        clicktag:0,
        rights:'',
        checkTips:true,
        dialog:false,
        dialogName:'第三方',
        dialogUrl:'',
        skuId:''
      }
    },
    computed: {
      isWebp (){
        if(document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0){
          return 'webp'
        }else{
          return 'jpeg'
        }
      }
    },
    methods:{
      clicktagx () {
        if (this.clicktag == 0) {
          this.clicktag = 1;
          setTimeout(function () {this.clicktag = 0}, 500);
        }else{
//          this.$toast("请勿频繁点击！");
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
        this.clicktagx();
        let router = '/v2/membership/carddetail?code='+item.couponType.couponTypeCode+'_'+item.couponType.id+'_'+encodeURIComponent(item.couponType.couponName)+"_"+item.id;
        if(isApp()) {
          let url = getLocation().origin + router;
          this.$DANativeApi.navigateTo({
            url
          })
        } else {
          this.$router.push(router);
        }
      },
      getinfo() {
        apiSkuRightsList({
          skuId:this.skuId,
        }).then(res => {
            console.log(res)
          this.list = res;
            this.show = true;
        })
      },
      tipsClick() {
        this.checkTips = !this.checkTips;
      },
      closeDialog() {
        this.checkTips ?  localStorage.setItem(`${this.dialogName}`, '0') : localStorage.setItem(`${this.dialogName}`, '1');
        this.dialog = false;
        if(isApp()) {
          if(this.dialogUrl == 'https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0'){
            window.location.href = this.dialogUrl;
          }else{
            let url1 = this.dialogUrl;
            if(url1.indexOf("/v2/membership") > -1){
              url1 = getLocation().origin+this.dialogUrl;
            }
            this.$DANativeApi.navigateTo({
              url:url1
            })
          }
        } else {
          window.location.href = this.dialogUrl;
        }
      },
      dialogClick(n) {
        n == 1 ? this.dialog = true:this.closeDialog();
      },
      threeGo(url,name) {
        this.dialogName = name;
        this.dialogUrl = url;

        if(localStorage.getItem(this.dialogName) == 1){
          if(isApp()) {
            if(this.dialogUrl == 'https://act.you.163.com/act/static/3wEFM7OLOa.html?from=out_bd_youkugongchang_0'){
              window.location.href = this.dialogUrl;
            }else{
              let url1 = this.dialogUrl;
              if(url1.indexOf("/v2/membership") > -1){
                url1 = getLocation().origin+this.dialogUrl;
              }
              this.$DANativeApi.navigateTo({
                url:url1
              })
            }
          } else {
            window.location.href = this.dialogUrl;
          }
        }else{
          this.dialogClick(1);
        }
      }
    },
    created() {
        this.skuId = this.$route.query.skuId;
        isLogin({
          success: () => {
            this.getinfo();
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

    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .ask-icon{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: url("https://assets.urwork.cn/image/member/ask-icon.jpg") no-repeat;
    background-size: 100%;
    position: fixed;
    bottom: 10%;
    right: 10px;
  }
  .tit-icon1{
    background: url("https://assets.urwork.cn/image/member/tit-icon04.png") no-repeat;
    background-size: 100%;
  }
  .tit-icon2{
    background: url("https://assets.urwork.cn/image/member/tit-icon05.png") no-repeat;
    background-size: 100%;
  }
  .tit-icon3{
    background: url("https://assets.urwork.cn/image/member/tit-icon06.png") no-repeat;
    background-size: 100%;
  }
  .tit-icon4{
    background: url("https://assets.urwork.cn/image/member/tit-icon01.png") no-repeat;
    background-size: 100%;
  }
  .tit-icon5{
    background: url("https://assets.urwork.cn/image/member/tit-icon07.png") no-repeat;
    background-size: 100%;
  }
  #main{
    margin: 0 auto;
    .rights{
      background: #f9f9f9;
      max-width: 7.5rem;
      padding: 0px 10px;
      margin: 0 auto;
      border-bottom: 10px solid #f9f9f9;
      .float-box{
        border-radius: 5px;
        background: #ffffff;
        margin-bottom: 15px;
        >.tit{
          padding: 0 13px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #333333;
          letter-spacing: 0;
          display: flex;
          align-items: center;
          padding-top: 7px;
          .tit-icon{
            width: 30px;
            height: 30px;
            display: inline-block;
            border-radius: 50%;
            margin-right: 8px;
          }
          .tit-txt{
            line-height: 25px;
            border-bottom: 1px dotted #c2c2c2;
            flex: 1;
          }
        }
        ul{
          overflow: hidden;
          padding: 0 13px 20px 13px;
          a{
            &:nth-of-type(odd){
              float: left;
            }
            &:nth-of-type(even){
              float: right;
            }
          }
          li{
            width: 3.2rem;
            padding: 10px 0 0 0;
            position: relative;
            display: flex;
            flex-direction: column;
            padding-top: 25px;
            &:nth-of-type(odd){
              float: left;
            }
            &:nth-of-type(even){
              float: right;
            }
            .img{
              width: 100%;
              height: 2.2rem;
              display: inline-block;
              background: #FFFFFF;
              border-radius: 4px 4px 0 0;
            }
            .txt{
              flex: 1;
              display: flex;
              flex-direction: column;
              /*justify-content: space-around;*/
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              padding-right: 10px;
              .p{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 7px 0 5px 0;
                .left_num{
                  font-family: PingFangSC-Regular;
                  font-size: 11px;
                  color: #666666;
                  letter-spacing: 0;
                  text-align: right;
                }
                .price{
                  min-width: 55px;
                  height: 15px;
                  line-height: 15px;
                  text-align: center;
                  font-family: PingFangSC-Regular;
                  font-size: 10px;
                  color: #FFFFFF;
                  letter-spacing: 0;
                  background: #DEA34C;
                  border-radius: 2px;
                  padding: 0 3px;
                }
              }
              .name{
                height: 40px;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
                line-height: 20px;
                font-weight: 600;
                white-space: initial;
              }
            }
            .btn_box{
              width: 100%;
              margin: 0 auto;
              margin-top: 10px;
              text-align: center;
              .button{
                width: 130px;
                height: 28px;
                display: inline-block;
                line-height: 28px;
                text-align: center;
                border-radius: 14px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #F34311;
                /*border: 1px solid #F34311;*/
                position: relative;
                @include border(#F34311){
                  border-radius: 28px;
                }
                letter-spacing: 0;
              }
              .button_grey{
                width: 130px;
                height: 28px;
                display: inline-block;
                line-height: 28px;
                text-align: center;
                border-radius: 14px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #999999;
                letter-spacing: 0;
                @include border(#999999){
                  border-radius: 28px;
                }
              }
            }
          }
        }
      }
      .explain{
        margin-top: 10px;
      }
    }
    .ad{
      max-width: 7.5rem;
      height: 100%;
      margin: 0 auto;
      margin: 15px 0;
      img{
        width: 100%;
        height: 2.2rem;
        border-radius: 5px;
        display: inline-block;
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
        .txt{
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #333333;
          letter-spacing: 0;
          margin-top: 0.27rem;
        }
        .tips{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .select{
            width: 15px;
            height: 15px;
            display: inline-block;
            background: url("https://assets.urwork.cn/image/member/icon_checked.png") no-repeat;
            background-size: 100%;
            border-radius: 2px;
            margin-right: 7px;
            margin-top: 6px;
          }
          .no-select{
            width: 15px;
            height: 15px;
            display: inline-block;
            background: url("https://assets.urwork.cn/image/member/icon_nochecked.png") no-repeat;
            background-size: 100%;
            border-radius: 2px;
            margin-right: 7px;
            margin-top: 6px;
          }
          .p{
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

