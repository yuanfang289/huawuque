<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div class="ticket">
        <div class="banner">
          <img src="https://assets.urwork.cn/image/member/ik-title.png">
          <div class="contbox">
             <div class="item woman" @click="gotoUrl('http://m.ikang.com/?from=singlemessage&isappinstalled=0#/payPackage/payPackageDetail/NONEF1820602/ios')">
                <p>商务精英升级<br>慢病AI筛查(女)</p>
                <a>立即购买</a>
             </div>
             <div class="item man" @click="gotoUrl('http://m.ikang.com/?from=singlemessage&isappinstalled=0#/payPackage/payPackageDetail/NONEM1820600/ios')">
                <p>商务精英升级<br>慢病AI筛查(男)</p>
                <a>立即购买</a>
             </div>
          </div>
        </div>

        <div class="explain-box">
          <div class="explain">
            <h3><span class="mid_boder"></span>权益说明<span class="mid_boder"></span></h3>
            <ul>
              <li>
                <h5>活动时间</h5>
                2019.2.19-2019.3.31
              </li>
              <li>
                <h5>商品说明</h5>
                1. 该活动商品为爱康APP专属，最终解释权归爱康APP所有；<br>
                2. 如需了解更多商品，您可通过下载爱康APP及搜索m.ikang.com购买。
              </li>
              <li>
                <h5>客服电话</h5>
                <a style="color:#666666;" href="tel:4008100120">
                  400-810-0120
                </a>
              </li>
            </ul>
            <p class="extip">爱康集团官方APP，您的健康管家！</p>
          </div>
        </div>

        <!--<div class="kong"></div>-->
      </div>
    </page-main>
  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import apiGetTicketCode from 'api/user/apiGetTicketCode';
  import apiTicket from 'api/user/apiTicket';
  export default {
    components: {
    },
    data: () => {
      return {
        show: false,
        title: '爱康国宾',
        rightsCode:"请稍后",
        code:'1'
      }
    },
    methods:{
    gotoUrl(url){
        if(isApp()) {
                   this.$DANativeApi.navigateTo({
            url
          })
        } else {
         location.href=url;
        }
      },
      copyCode() {
        /*两种方法在电脑上都ok  手机端要区别*/
        var successful = ''
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {//区分iPhone设备
          window.getSelection().removeAllRanges();//这段代码必须放在前面否则无效
          var Url2=document.getElementById("code-url");//要复制文字的节点
          var range = document.createRange();
          // 选中需要复制的节点
          range.selectNode(Url2);
          // 执行选中元素
          window.getSelection().addRange(range);
          // 执行 copy 操作
          successful = document.execCommand('copy');
          // 移除选中的元素
          window.getSelection().removeAllRanges();
        }else{//安卓
          var Url2=document.getElementById("code-url").innerText;
          var oInput = document.createElement('input');
          oInput.value = Url2;
          document.body.appendChild(oInput);
          oInput.select(); // 选择对象
          successful = document.execCommand("Copy");// 执行浏览器复制命令
          oInput.className = 'oInput';
          oInput.style.display='none';
        }
        const text = successful ? '复制成功' : '复制失败';
        this.$toast(text);
      },
      getinfo() {
        apiGetTicketCode({
          "userId":this.$store.state.userInfo.userId,
          "couponType":this.$route.query.code
        }).then(res => {
          console.log(res,'11111111');
          this.rightsCode = res.ticketCode;
          this.show = true;
        })
      },
      received() {
        apiTicket({
          "couponType":this.$route.query.code,
        }).then(res => {
          this.getinfo();
        })
      }
    },
    created() {
      this.show = true;
      // isLogin({
      //   success: () => {
      //     this.$route.query.first ==0 ? this.$toast('领取成功') : ''
      //     this.getinfo();
      //     this.value = "https://m.urwork.cn/v2/membership/confirm?userId="+this.$store.state.userInfo.userId
      //   },
      //   fail: () => {
      //     if(this.isApp) {
      //       toLogin();
      //     }else{
      //       window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl='+location.href;
      //     }
      //   }
      // })
    },
    mounted() {
      this.code = this.$route.query.code;
    }
  }
</script>

<style lang="scss" scoped="">
  .kong{
    height: 50px;
  }
  #main{
    background: url("https://assets.urwork.cn/image/member/ik-bbg.png") no-repeat;
    .ticket{
      text-align: center;
      position: relative;
      >img{
        display: inline-block;
      }
      .banner{
        position: relative;
        padding: 25px 21px 0 21px;
        .contbox{
          width: 100%;
          overflow: hidden;
          height: 28vw;
          display: flex;
          justify-content: space-between;
          margin-top: -34px;
        //   position: absolute;
        //   bottom: 0;
        //   display: flex;
        //   align-items: center;
        //   justify-content: space-between;
          .item{
            width: 48%;
            height: 100%;
            float: left;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            p{
                font-family: PingFangSC-Medium;
                font-size: 15px;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
            }
            a{
                font-family: PingFangSC-Regular;
                font-size: 11px;
                letter-spacing: 0;
                text-align: center;
                background: #FFFFFF;
                margin-top: 10px;
                padding: 0 14px;
                height: 20px;
                line-height: 20px;
                border-radius: 10px;
            }
          }
         .woman{
            background: url("https://assets.urwork.cn/image/member/ik-nvbg.png") no-repeat;
            background-size: 100%;
            a{
                color: #FF8F84;
            }
         }
         .man{
            background: url("https://assets.urwork.cn/image/member/ik-nanbg.png") no-repeat;
              background-size: 100%;
            a{
               color: #9973F6;
            }
         }
        }
      }
      .explain-box{
        padding-bottom: 25px;
        .explain{
          background: #FFFFFF;
          border-radius: 20px 20px 0 0;
          text-align: left;
          margin: 15px 21px 0 21px;
          padding: 25px;
          background: #FFFFFF;
          box-shadow: -2px 3px 15px 0 rgba(211,211,211,0.50);
          border-radius: 5px;
          h3{
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #333333;
            letter-spacing: 0;
            font-weight: 600;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            span{
              width: 35px;
              height: 1px;
              background: #D9D9D9;
              margin: 0 8px;
            }
          }
          ul{
            li{
              font-family: PingFangSC-Regular;
              font-size: 0.24rem;
              color: #151515;
              letter-spacing: 0;
              margin-top: 0.3rem;
              position: relative;
              padding-left: 10px;
              &::before{
                display: inline-block;
                content:"";
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: #F0C298;
                margin-top: -5px;
                margin-right: 5px;
                position: absolute;
                left: 0;
                top: 12px;
              }
              h5{
                font-family: PingFangSC-Medium;
                font-size: 0.26rem;
                color: #333333;
                letter-spacing: 0;
                font-weight: 500;
                margin-bottom: 5px;
              }
              a{
                color: #007aff;
              }
            }
            .ss{
              display: inline-block;
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #999999;
              letter-spacing: 0;
              margin-top: 15px;
            }
          }
          .extip{
            font-family: PingFangSC-Medium;
            font-size: 13px;
            color: #333333;
            letter-spacing: 0;
            margin-top: 0.3rem;
            padding-left: 10px;
            font-weight: 500;
          }
        }
      }

      .received{
        position: absolute;
        top: 8.8rem;
        right: 0;
        width: 70px;
        height: 85px;
        background: url("./img/membership/received.png") no-repeat center;
        background-size: 100%;
      }
    }
  }
</style>


