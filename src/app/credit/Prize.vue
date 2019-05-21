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
         <h3>中奖啦!!!</h3>
         <p>请您在{{m}}分{{s}}秒内确认订单</p>
      </div>
      <div class="date">
        <div class="point-box">
          <div class="point">
            <div class="p">
              <p class="name-phone">花无缺 <span class="phone-num">15003873382</span></p>
              <p class="address">北京朝阳区道家村一号楼优客工场</p>
            </div>
            <div class="more">
              <i class="uricon-arrow-right"></i>
            </div>
          </div>
        </div>
        <div class="goods-info">
          <div class="img">
            <img src="https://image.urwork.cn/1ac095df-f2c6-4787-804c-089f1df42993.jpg">
          </div>
          <div class="name-point">
            <h4 class="name">乐迪小书架</h4>
            <p class="point">18000积分</p>
          </div>
          <span>x2</span>
        </div>
      </div>
      <div class="explain">
        注意：<br>
        1、请您在10分钟确认礼品收货地址，否则将视为放弃礼品，且
        不退还积分；<br>
        2，我们将在15个工作日内寄出礼品
      </div>
      <div class="sure">
        <a href="javascript:void(0)">
          确认
        </a>
      </div>
    </main>
  </page-wrap>
</template>

<script>
  import apiLotteryAward from 'api/credit/apiLotteryAward';           //得到的奖品信息
  export default {
    components: {

    },
    data: () => {
      return {
        show: false,
        title: '恭喜中奖',
        m:'5',
        s:'0'
      }
    },
    methods:{
      getdetail() {
        apiLotteryAward({
          "id":this.$route.query.id
        }).then(res => {
          this.show = true;
        })
      }
    },
    created() {
      this.getdetail();
    },
    mounted() {
      setInterval( ()=> {
        let xh = 0;
        let xm = this.m;
        let xs = this.s;
        let ts = 3600*xh*1000+xm*60*1000+xs*1000;
        let leftTime = ts-1000;
        var h, m, s;
        if(leftTime >= 0) {
          h = Math.floor(leftTime / 1000 / 60 / 60);
          m = Math.floor(leftTime / 1000 / 60 % 60);
          s = Math.floor(leftTime / 1000 % 60);
          if(s < 10) {
            s = "0" + s;
          }
//          if(m < 10) {
//            m = "0" + m;
//          }
          if(h < 10) {
            h = "0" + h;
          }
          h = h;
          m = m;
          s = s;
        } else {
          h = '00';
          m = '00';
          s = '00';
        }
        this.m = m;
        this.s = s;
      }, 1000);
    }
  }
</script>

<style lang="scss" scoped="">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";
  #main{
    background: #F5F5F5;
    .banner{
      width: 100vw;
      height: 138px;
      background-image: linear-gradient(#EE434B 0%, #FF6756 94%);
      background: url("https://assets.urwork.cn/image/credit/prize.jpg") no-repeat;
      background-size: cover;
      padding: 14px 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      h3{
        font-family: JSaoEr;
        font-size: 20px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: left;
        margin-top: 18px;
      }
      p{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: left;
        margin-top: 3px;
      }
    }
    .date{
      background-color: #ffffff;
      height: 187px;
      /*padding: 0 20px;*/
      padding-bottom: 7px;
      position: relative;
      .point-box{
        width: 100%;
        padding: 0 20px;
        position: absolute;
        top: -15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .point{
          width: 100%;
          height: 83px;
          padding: 0 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FFFFFF;
          box-shadow: 0 3px 8px 0 rgba(208,211,213,0.58);
          border-radius: 4px;
          .p{
            line-height: 24px;
            .name-phone{
              font-family: PingFangSC-Regular;
              font-size: 15px;
              color: #333333;
              letter-spacing: 0.94px;
              text-align: left;
            }
            .address{
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #666666;
              letter-spacing: 0.75px;
              text-align: left;
            }
          }
          .more{

          }
        }

      }
      .goods-info{
        padding:90px 20px 20px 20px;
        display: flex;
        align-items: inherit;
        justify-content: space-between;
        .img{
          width: 80px;
          height: 80px;
          img{
            width: 80px;
            height: 80px;
          }
        }
        .name-point{
          flex: 1;
          text-align: left;
          padding-left: 10px;
          .name{
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #333333;
            letter-spacing: 0;
            text-align: left;
            margin-top: 5px;
          }
          .point{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #FF2F00;
            letter-spacing: 0;
            text-align: left;
            margin-top: 5px;
          }
        }
        span{
          padding-top: 5px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #3F3F3F;
          letter-spacing: 1px;
          text-align: left;
          line-height: 25px;
        }
      }
    }
    .explain{
      margin-top: 8px;
      background: #ffffff;
      padding: 20px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #666666;
      letter-spacing: 0;
      line-height: 20px;
    }
    .sure{
      width: 100%;
      background: #ffffff;
      padding-top: 65px;
      text-align: center;
      a{
        width: 200px;
        height: 45px;
        display: inline-block;
        line-height: 45px;
        text-align: center;
        border-radius: 22.5px;
        background-image: linear-gradient(-180deg, #FF6756 0%, #EE434B 100%);
        border-radius: 100px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #FFFFFF;
      }
    }
  }
</style>

