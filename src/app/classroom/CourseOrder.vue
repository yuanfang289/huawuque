<template>
  <page-wrap :gray-bg="true" :hasDownloadBar="false">

    <div v-title>{{title}}</div>

    <page-header :isHeadroom="false" :isFixed="true">
      <topbar type="back" mode="fade" :nativeBack="true" :hideNativeTitleBar="true" :hideNavigationBarDelay="600">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <!--订单详情-->
      <div class="order_detail">
        <div class="course_detail">
            <div class="img">
              <img :src="mainData.imgUrl">
            </div>
            <div class="info">
              <h3>{{mainData.name}}</h3>
              <h4>{{mainData.title}}</h4>
              <h5>{{mainData.lessonsCnt}}节课</h5>
              <p>￥{{mainData.discountPrice}}</p>
            </div>
        </div>
        <div class="coupon">
          <div class="coupon_title">
            代金券
          </div>
          <div class="coupon_more">
            暂无代金券<span class="more"> <i class="uricon-arrow-right"></i> </span>
          </div>
        </div>
        <div class="payment">
            <ul>
              <li v-if="payment==1">
                <div class="pay alpay">
                  <span class="bg_img alimg"></span><p>支付宝支付</p>
                </div>
                <div class="select">

                </div>
              </li>
              <li v-if="payment==3">
                <div class="pay wxpay">
                  <span class="bg_img wximg"></span><p>微信支付</p>
                </div>
                <div class="select">

                </div>
              </li>
            </ul>
        </div>
        <div class="tips">
          <ul>
            <li>
              · 课程为虚拟内容服务，购买后不支持退换、转让、退款。
            </li>
            <li>
              · 购买后可在［我的课程］中查看收听。
            </li>
          </ul>
        </div>
      </div>
      <!--底部悬浮按钮-->
      <div class="kong"></div>
      <div class="footer">
        <button class="btn_grey">
             ￥{{mainData.discountPrice}}
        </button>
        <button class="btn" v-on:click="pay()">
          去支付
        </button>
      </div>
      <div class="form" v-html="form">

      </div>
    </page-main>

  </page-wrap>
</template>

<script>
  import {mapState} from 'vuex'
  import SubTitle from './modules/SubTitle';
  import toPage from 'nativeFix/component/toPage/toPage'
  import routePrefix from 'config/config';
  import apiClassGetSubjectByid from 'api/classroom/apiClassGetSubjectByid';
  import apiPayCourse from 'api/classroom/apiPayCourse';
//  import apiOpenid from 'api/classroom/apiOpenid';

  export default {
    data: () => {
      return {
        show: false,
        v2 : "",
        title:'确认订单',
        id:"",                  //  课程id
        mainData: {},           //  页面数据
        timer: {},              //  定时器
        updateTime: 30000,      //  规定的更新时间
        payment:1,              // 支付方式
        channel:4,            // 渠道
        productSpuId: 0,       //商品id
        form:'<form></form>'   //form表单
      }
    },
    components: {
      SubTitle,
      toPage
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
      }),
      subjectId() {
        //  课程ID
        return this.$route.params.id
      }
    },
    methods: {
      //设置cookie
      setCookie: function (name,value,expires,path,domain) {
//        var d = new Date();
//        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//        var expires = "expires=" + d.toUTCString();
//        console.info(cname + "=" + cvalue + "; " + expires);
//        document.cookie = cname + "=" + cvalue + "; " + expires;
//        console.info(document.cookie)
          var str=name+"="+escape(value);
          if(expires!=""){
            var date=new Date();
            date.setTime(date.getTime()+expires*24*3600*1000);//expires单位为天
            str+=";expires="+date.toGMTString();
          }
          if(path!=""){
            str+=";path="+path;//指定可访问cookie的目录
          }
          if(domain!=""){
            str+=";domain="+domain;//指定可访问cookie的域
          }
          document.cookie=str;

      },
      getSubjectByid() {
        apiClassGetSubjectByid({
          subjectId: this.id
        }).then(res => {
          this.mainData = res;
          this.productSpuId = res.productSpuId;
          this.setCookie('cart',this.productSpuId+'_1',0.1,'/','.urwork.cn');
          this.setCookie('cart',this.productSpuId+'_1',0.1,'/','.ucommune.com');
          this.show = true;
        })
      },
//      getOpenId(){
//        console.log('开始调取openid')
//        apiOpenid().then(res => {})
//        console.log('结束调取openid')
//      },
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
        var  wwdata = JSON.parse(data.payStr);
        console.log(wwdata,"返回的对象");
        var ww = {};
        var id = this.subjectId;
        var _this = this;
        ww.appId = wwdata.appId;
        ww.nonceStr = wwdata.nonceStr;
        ww.timeStamp = wwdata.timeStamp;
        ww.paySign = wwdata.sign;
        ww.package = wwdata.package;
        ww.signType=wwdata.signType;
        console.log(ww,"拼的对象");
        function onBridgeReady(){
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',ww,
            function(res){
              if(res.err_msg == "get_brand_wcpay_request:ok" ) {
//                alert("公众号支付成功!")
                _this.$toast("购买成功");
//                this.$router.push({name: 'courseDetail', params: {id: this.subjectId}})
                var uri = '/v2/classroom/courseDetail/'+id;
                location.href = encodeURI(uri);
              // location.href = '/v2/classroom/courseDetail/'+this.subjectId;
              } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。
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
      pay(){
        apiPayCourse({
          data: {"payWay":this.payment,"addressId":"0","isWorkstage":"2","channel":this.channel}
        }).then(res => {
              console.log('payyyyyyyy',res);
              if(this.payment==3){
                  console.log(res.payStr);
                this.webChatGZH(res);
              }else if(this.payment==1){
                this.form = res.payStr;
                console.log(res.payStr,'支付宝串')
                this.$nextTick(function () {
                  document.forms['alipaysubmit'].submit();
                })
              }else{
                  alert('暂不支持此种支付方式！')
              }

        })
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.v2 = routePrefix.routePrefix;
      this.getSubjectByid();
      if(this.isWEIxin()){
          this.payment = 3;
          this.channel = 9;
//          this.getOpenId();
      };
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  $main-margin:8px;
  .page-wrapper{
    background: #FAFAFA!important;
    padding-top: 45px;
  }
  .order_detail{
    padding: 0 15px 0 15px;
    &>div{
      margin-top: 10px;
    }
    .course_detail{
      height: 152px;
      background: #FFFFFF;
      box-shadow: 0 3px 5px 1px rgba(245,245,245,0.99);
      border-radius: 4px;
      padding: 17px 15px 17px 15px;
      display: flex;
      .img{
        width: 85px;
        height: 100%;
        display: inline-block;
        margin-right: 15px;
        img{
          width: 85px;
          height: 100%;
        }
      }
      .info{
        flex: 1;
        overflow:hidden;
        h3{
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          font-weight: 700;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        h4{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          margin-top: 4px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        h5{
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #7A808F;
          line-height: 19px;
          margin-top: 10px;
        }
        p{
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #FF4500;
          font-weight: 400;
          margin-top: 16px;
        }
      }
    }
    .coupon{
      height: 58px;
      background: #FFFFFF;
      box-shadow: 0 3px 5px 1px rgba(245,245,245,0.99);
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      .coupon_title{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
        font-weight: 400;
      }
      .coupon_more{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #666666;
        .more{
          margin-left: 10px;
        }
      }
    }
    .payment{
      ul{
        background: #FFFFFF;
        box-shadow: 0 3px 5px 1px rgba(245,245,245,0.99);
        border-radius: 4px;
        padding: 0 13px;
        li{
          height: 54px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          @include border-bottom(#e5e5e5);
          &:last-child{
            @include border-bottom(#fff);
          }
          .pay{
            height: 100%;
            display: flex;
            align-items: center;
            .bg_img{
              width: 23px;
              height: 23px;
              display: inline-block;
              background: blueviolet;
              margin-right: 10px;
            }
            .alimg{
              background: url("img/zhifubao.png") no-repeat;
              background-size: 100%;
            }
            .wximg{
              background: url("img/weixin.png") no-repeat;
              background-size: 100%;
            }
            p{
              height: 23px;
              line-height: 24px;
            }
          }
          .select{
            width: 21px;
            height: 21px;
            background: url("img/right.png") no-repeat;
            background-size: 100%;
          }
        }
      }
    }
    .tips{
      ul{
        li{

        }
      }
    }
  }
  .kong{
    height: 58px;
  }
  .footer{
    width: 100%;
    height: 58px;
    background: #f5f5f5;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    .btn{
      width: 49%;
      height: 100%;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      font-weight: 400;
      color: #333333;
      background: #FFCD01;
      border: none;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn_grey{
      background: transparent;
      font-size: 16px;
      color: #FF4500;
      letter-spacing: 0;
      padding-left: 10px;
    }
  }

</style>
