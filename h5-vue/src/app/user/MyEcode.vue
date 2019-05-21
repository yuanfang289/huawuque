<template>
  <page-wrapb class="page-user-center">
    <div v-title>{{title}}</div>

    <page-header>
      <topbar :type="'back'">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <article style="display: none">{{des}}</article>
      <div class="personinfo">
        <div class="content">
          <img v-if="userInfo.headImageUrl" class="img" :src="userInfo.headImageUrl+'?imageMogr2/thumbnail/!140x140r/gravity/Center/crop/140x140'">
          <img v-else="" class="img" src="../../assets/images/def/pic_def.png" alt="">
        </div>
        <div class="info">
          <p class="txt">
            <span class="name">
              <span>{{userInfo.realname}}</span>
              <!--<i class="urimg-join"></i><i v-if="userInfo.member" class="urimg-vip"></i>-->
              <i v-if="cardType == 2" class="level-icon">超级会员</i>
              <i v-else="" class="level-icon">随心会员</i>
            </span>
            <span class="point">
              <a href="/v2/task">已获积分：{{totalnum}}</a>
            </span>
          </p>
        </div>
      </div>
      <div class="barcode" v-if="cardSn">
        <VueBarcode :value="cardSn.replace(/(.{4})/g, '$1 ')" :options="{ displayValue: false,width:(this.width*1.5)/375,height:65,fontSize:10, }"></VueBarcode>
        <p>{{cardSn.replace(/(.{4})/g, '$1 ')}}</p>
      </div>
      <div class="card">
        <div class="img">
          <!--<img :src="require('./img/membership/card.png')">-->
          <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
          <!--<div class="head-img">-->
            <!--<img v-if="userInfo.headImageUrl" :src="userInfo.headImageUrl">-->
            <!--<img v-else="" src="../../assets/images/def/pic_def.png" alt="">-->
          <!--</div>-->
        </div>
      </div>
      <p class="me">请向商家出示此码完成优客工场会员权益</p>
      <div class="logo">
        <img src="https://assets.urwork.cn/image/member/logo@3x.jpg">
      </div>
    </page-main>

  </page-wrapb>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import apiGetUcenter from 'api/user/apiGetUcenter';
  import apiGetCards from 'api/user/apiGetCards';
  import apiDetail from 'api/user/apiDetail';
  import QrcodeVue from 'qrcode.vue';
  import VueBarcode from '@xkeshi/vue-barcode'
  import store from 'store';
  export default {
    components: {
      QrcodeVue,
      VueBarcode
    },
    data: () => {
      return {
        show: false,
        title: '会员身份码',
        des:'我正在使用优鲜集，扫码关注他/她。与他/她一起享受精致办公生活！',
        value: 'https://m.urwork.cn/user/userDetail?userId=12111',
        size: 125,
        userInfo:'',
        headImg: '',
        mainHeight:'',
        cardSn:'',
        totalnum:'1',
        width:'375',
        cardType:'1'
      }
    },
    methods:{
      getUserInfo() {
        apiGetUcenter().then(res => {
            this.userInfo = res;
            this.des = res.realname+'正在使用优鲜集，扫码关注他/她。与他/她一起享受精致办公生活！';
            this.value = "https://m.urwork.cn/user/userDetail?userId="+this.$store.state.userInfo.userId;
            this.show = true;
        })
      },
      getinfoSn() {
        apiGetCards({
          "userId":this.$store.state.userInfo.userId,
          "pn":1,
          "ps":1
        }).then(res => {
          this.cardSn = res.list[0].cardSn;
          this.cardType = res.list[0].cardType;
          this.show = true;
        })
      },
      getbalance(){
        apiDetail({
          "userId":this.$store.state.userInfo.userId,
          "pn":1,
          "ps":1
        }).then(res => {
            console.log(res)
          this.totalnum = res.balance;
        })
      },
      share:function () {
        if(this.isLogin){
          if(this.isApp) {
            let _this = this;
            let url = "https://passport2.urwork.cn/passport/inviteRegister/"+this.userId;
            this.$DANativeApi.share({
              title: _this.title,
              desc: _this.desc,
              url: url,
              imgUrl: "http://img.urwork.cn/100ico.png",
              completion: function (res) {
                //app 分享成功之后的回调！！
              }
            });
          } else {
            let url = location.href+'/'+this.userId;
            this.$openApp(url);
          }
        }else{
          this.login();
        }
      }
    },
    created() {
      isLogin({
        success: () => {
          this.getUserInfo();
          this.getbalance();
          this.getinfoSn();
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
      this.mainHeight =  window.screen.height-document.getElementsByClassName("page-header")[0];
      document.getElementById("main").style.Height = '600px';
      this.des =  this.userInfo.realname+'正在使用优鲜集，扫码关注他/她。与他/她一起享受精致办公生活！';
      this.width = window.screen.width;
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  [class^=urimg-] {
    background: url('http://m.urwork.cn/assets/public/center/images/mark.png') no-repeat;
    width: 15px;
    height: 15px;
    display: inline-block;
    vertical-align: middle;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    background-size: cover;
  }
  /deep/ .page-user-center{
    background: #242629!important;
  }
  #main{
    padding: 45px 20px 28px 20px;
    /*background: #F2F2F2;*/
    /*height: 100vh;*/
    /deep/ .main-inner{
      background: #FFFFFF;
      border-radius: 15px;
      text-align: center;
      /*padding: 35px;*/
      .personinfo{
        height: 1.97rem;
        background: url("https://assets.urwork.cn/image/member/mycode-bg.jpg") no-repeat;
        background-size: 100%;
        .content{
          display: flex;
          justify-content: center;
          align-items: center;
          .img{
            width: 1.1rem;
            height: 1.1rem;
            display: inline-block;
            border-radius: 50%;
            margin-top: -0.55rem;
          }
        }
        .info{
          .txt{
            /*height: 1.1rem;*/
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 0 10px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            span{
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
            }
            .name{
              font-family: PingFangSC-Semibold;
              font-size: 20px;
              color: #FFFFFF;
              letter-spacing: 0;
              line-height: 27px;
              font-weight: 600;
              margin-top: 0.14rem;
              display: flex;
              align-items: center;
              justify-content: center;
              .urimg-join{
                width: 17px;
                height: 100%;
                /*background: url("");*/
              }
              .urimg-join {
                width: 21px;
                height: 20px;
                display: inline-block;
                margin-left: 4px;
                background-position: 0 0;
              }
              .urimg-vip {
                width: 21px;
                height: 20px;
                display: inline-block;
                margin-left: 4px;
                background-position: 0 -19px;
              }
              .level-icon{
                width: 50px;
                height: 15px;
                line-height: 17px;
                display: inline-block;
                background: url("https://assets.urwork.cn/image/member/level-bg.png") no-repeat;
                background-size: 100%;
                font-family: PingFangSC-Regular;
                font-size: 10px;
                color: #917238;
                letter-spacing: 0;
                font-weight: 100;
                margin-left: 5px;
              }
            }
            .point{
              margin-top: 0.16rem;
              a{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 0;
                line-height: 14px;
              }
            }
          }
        }
      }
      .card{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 35px 0 5px 0;
        .img{
          display: flex;
          justify-content: center;
          position: relative;
          .head-img{
            width: 50px;
            height: 50px;
            padding: 2px;
            background: #ffffff;
            overflow: hidden;
            border-radius: 50%;
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -25px;
            margin-top: -25px;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
      .barcode{
        margin-top: 15px;
        p{
          line-height: 0px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
        }
      }
      .me{
        text-align: center;
        padding: 0 0 30px 0;
        margin: 0 0.35rem;
        position: relative;
        font-size: 10px;
        color: #cccccc;
        margin-top: 5px;
        @include border-bottom(#e5e5e5);
      }
      .logo{
        width: 2rem;
        height: 1rem;
        display: inline-block;
        margin: 20px 0;
      }
    }
  }
</style>
