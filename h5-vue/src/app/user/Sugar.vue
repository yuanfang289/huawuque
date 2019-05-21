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
          <img src="https://assets.urwork.cn/image/member/sugar.jpg">
          <div class="kong">

          </div>
          <div class="contbox">
            <div class="cont">
              <p class="rights-code">会员权益码：
                <span id="code-url">{{rightsCode}}</span>
                <span class="copy-code" @click="copyCode()">复制</span>
              </p>
            </div>
          </div>
        </div>

        <div class="explain-box">
          <div class="explain">
            <h3><span class="mid_boder"></span>权益说明<span class="mid_boder"></span></h3>
            <ul>
              <li>
                <h5>活动详情</h5>
                丢糖五福新春礼盒 专属 60元大额优惠券
              </li>
              <li>
                <h5>活动截止时间</h5>
                即日起至2019年1月31日
              <li>
                <h5>领券规则</h5>
                1. 微信搜索公众号“野兽生活”，关注“野兽生活”<br>
                2. 左下角对话框输入“优客工场年货优惠”<br>
                3. 点击“弹出内容”，领取优惠券<br>
                4. 立即使用
              </li>
              <li>
                优惠券限量1000张，每人限领3张，先到先得
              </li>
              <span class="ss">*本活动最终解释权归野兽生活所有</span>
            </ul>
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
        title: '丢糖',
        rightsCode:"请稍后",
        code:'1'
      }
    },
    methods:{
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
      isLogin({
        success: () => {
          this.$route.query.first ==0 ? this.$toast('领取成功') : ''
          this.getinfo();
          this.value = "https://m.urwork.cn/v2/membership/confirm?userId="+this.$store.state.userInfo.userId
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
      this.code = this.$route.query.code;
    }
  }
</script>

<style lang="scss" scoped="">
  .kong{
    height: 50px;
  }
  #main{
    background: #A11A20;
    .ticket{
      text-align: center;
      position: relative;
      >img{
        display: inline-block;
      }
      .banner{
        position: relative;
        .contbox{
          width: 100%;
          padding: 0 21px;
          position: absolute;
          bottom: 0;
          .cont{
            height: 60px;
            display: flex;
            align-items: center;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #FFFFFF;
          /*  box-shadow: -2px 3px 15px 0 rgba(211,211,211,0.50);*/
            border-radius: 5px;
            .code{
              width: 100%;
              height: 100%;
              margin: 0 auto;
              padding: 15px;
              display: flex;
              justify-content: center;
            }
            .rights-code{
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #A41C22;
              letter-spacing: 0;
              text-align: center;
              .copy-code{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #A41C22;
                letter-spacing: 0;
                text-align: center;
                text-decoration-line: underline;
                margin-left: 5px;
              }
            }
            .tip{
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #999999;
              letter-spacing: 0;
              text-align: center;
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
         /* box-shadow: -2px 3px 15px 0 rgba(211,211,211,0.50);*/
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
          a{
            color: #007aff;
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
                background: #A41C22;
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


