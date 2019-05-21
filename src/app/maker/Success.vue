<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div class="maker">
        <div class="info">

          <div class="icon"></div>
          <div class="title">报名成功</div>
          <div class="text">工作人员将会尽快联系您</div>
          <!--div class="bless">恭喜您获得<br>
            价值<span>100元</span>的优鲜集礼包
          </div>
          <div class="receive" @click="receive()">立即领取</div-->
        </div>
      </div>
      <div id="mask" v-show="dialog">
        <div class="dialog">
          <div class="close" @click="close()"></div>
          <div class="title">礼包领取成功</div>
          <div class="coupon">
            <div class="left">
              <div class="price"><span>¥</span>50</div>
              <div class="name">会议室代金券</div>
            </div>
            <div class="right">
              <div class="but" @click="useCoupon()">立即使用</div>
            </div>
          </div>
          <div class="coupon">
            <div class="left">
              <div class="price"><span>¥</span>50</div>
              <div class="name">会议室代金券</div>
            </div>
            <div class="right">
              <div class="but" @click="useCoupon()">立即使用</div>
            </div>
          </div>
          <div class="text">红包已放入账户<span>{{mobile}}</span><br>登录优鲜集 App 即可使用</div>

        </div>


      </div>
    </page-main>

  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import {getScheme, setScheme} from 'nativeFix';
  import apiReceive from 'api/maker/apiReceive';
  export default {
    components: {},
    data: () => {
      return {
        show: false,
        title: '报名成功',
        dialog: false,
        userId: 0,
        mobile: '',
        isDone:false,
      }
    },
    methods: {

      getData(){
        this.userId = this.$route.query.userId;
        this.mobile = this.$route.query.mobile;
        if(!this.userId||!this.userId.trim()||!this.mobile||!this.mobile.trim()){
          let url = getLocation().origin + '/v2/marker';
          if (isApp()) {
            this.$DANativeApi.navigateTo({
              url
            })
          } else {
            location.href=url;
          }
        }
      },
      receive(){
        if(this.isDone){
          this.$toast("优惠券已经领取");return
        }
        this.$showLoading();
        apiReceive({userId: this.userId}).then(res => {
          this.$hideLoading();
          if ( res === 0) {
            this.dialog=true;
            this.isDone=true;
          } else {
            if(res===1){this.$toast("活动优惠券已发放");}else{this.$toast("领取优惠券失败");}
          }
        });
      },
      useCoupon(){
        var url='https://m.urwork.cn/appDownload';
        if (isApp()) {
          this.$DANativeApi.navigateTo({
            url
          })
        } else {
          location.href=url;
        }
      },
      close(){
        this.dialog=false;
      }
    },

    created() {
      this.show = true;
      this.getData();

    },

    mounted() {
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  #main {
    .maker {
      height: 100%;
      width: 100%;
      padding-top: 0.7rem;

      .info {
        position: relative;
        padding-top: 1.1rem;
        height: 9.1rem;
        width: 6.4rem;
        margin: 0 auto;
        //background: url("https://assets.urwork.cn/image/maker/bc.png") no-repeat;
        background-size: 100%;
        .icon {
          height: 2.08rem;
          width: 2.08rem;
          margin: 0 auto;
          background: url("https://assets.urwork.cn/image/maker/enroll_success.png") no-repeat;
          background-size: 100%;
        }
        .title {
          height: 0.5rem;
          width: 100%;
          margin-top: 0.27rem;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #000000;
          letter-spacing: 0;
          text-align: center;
        }
        .text {
          width: 100%;
          margin-top: 0.1rem;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666666;
          letter-spacing: 0;
          text-align: center;
        }
        .bless {
          width: 100%;
          margin-top: 1.8rem;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #646464;
          letter-spacing: 0;
          text-align: center;
          span {
            font-family: PingFangSC-Semibold;
            font-size: 15px;
            color: #000000;
            line-height: 20px;
          }
        }
        .receive {
          width: 2rem;
          height: 0.6rem;
          margin: 0 auto;
          margin-top: 0.4rem;
          border: 0.01rem solid #FF7733;
          border-radius: 50px;
          font-family: PingFangSC-Medium;
          font-size: 13px;
          color: #FF7733;
          text-align: center;
          line-height: 0.6rem;
        }
      }
    }
    #mask {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1900;
      .dialog {
        z-index: 1901;
        position: relative;
        width: 6rem;
        height: 7.86rem;
        margin: 0 auto;
        margin-top: 2rem;
        padding-top: 1.15rem;
        background: url("https://assets.urwork.cn/image/maker/gift_bc.png") no-repeat;
        background-size: 100%;
        .close {
          width: 0.46rem;
          height: 0.46rem;
          position: absolute;
          background: url("https://assets.urwork.cn/image/maker/close.png") no-repeat;
          background-size: 100%;
          top: 0.60rem;
          right: 0.2rem;
        }
        .title {
          height: 0.75rem;
          width: 100%;
          margin-bottom: 0.5rem;
          font-family: PingFangSC-Medium;
          font-size: 27px;
          font-weight: 500;
          color: #FF5F10;
          letter-spacing: 0;
          text-align: center;
        }
        .coupon {
          height: 1.5rem;
          width: 5.2rem;
          margin: 0 auto;
          background: url("https://assets.urwork.cn/image/maker/bc_but.png") no-repeat;
          background-size: 100%;
          margin-bottom: 0.3rem;
          .left {
            height: 100%;
            width: 2.0rem;
            margin-left: 0.4rem;
            padding-top: 0.26rem;
            font-family: PingFangSC-Semibold;
            .price {
              line-height: 0.5rem;
              font-weight:500;

              font-size: 25px;
              color: #FFFFFF;
              span {
                font-size: 16px;
                color: #FFFFFF;
              }
            }
            .name {
              font-family: PingFangSC-Regular;
              font-size: 13px;
              color: #FFFFFF;
            }
            float: left;
          }

          .right {
            height: 100%;
            width: 2.6rem;
            .but {
              width: 1.6rem;
              height: 0.54rem;
              margin: 0 auto;
              margin-top: 0.5rem;
              background: #FADE92;
              border-radius: 0.27rem;
              color:#be4100;

              text-align: center;
              line-height: 0.54rem;

            }
            float: right;
          }
        }
        .text {
          margin-top: 0.6rem;
          width: 100%;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #DD845A;
          text-align: center;
          line-height: 16px;
        }

      }
    }
  }
</style>

