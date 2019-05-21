<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <!--<page-header>-->
      <!--<topbar :type="'back'" :hideShareBtn="true">-->
        <!--<template slot="title">{{title}}</template>-->
      <!--</topbar>-->
    <!--</page-header>-->

    <page-main :show="show">
      <div class="card">
        <div class="img">
          <img class="img" :src="require('./img/membership/green-right.png')">
          <h3>优鲜集会员</h3>
          <!--<p>万科 & 优客</p>-->
          <span>该用户可享受优惠</span>
          <!--<div class="btn" @click="closedWin()">-->
              <!--完成-->
          <!--</div>-->
        </div>
      </div>
    </page-main>

  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import QrcodeVue from 'qrcode.vue';
  import store from 'store';
  export default {
    components: {
      QrcodeVue
    },
    data: () => {
      return {
        show: false,
        title: '优惠码确认',
        value: 'https://m.urwork.cn/user/userDetail?userId=160262',
        size: 300
      }
    },
    methods:{
       closedWin() {
//         window.opener = null;
//         window.open('','_self');
//         window.close();
//         window.location.href="about:blank";
//         window.close();

         window.history.go(-1);  //返回上一页
         window.history.back(); //返回上一页
       }
    },
    created() {
      this.show = true;
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped="">
  #main{
    .card{
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding: 15px;
      padding-top: 30%;
      .img{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img{
          width: 80px;
          height: 80px;
          margin-top: 65px;
          margin-bottom: 25px;
        }
        h3{
          font-family: PingFangSC-Semibold;
          font-size: 25px;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
          margin-bottom: 5px;
        }
        p{
          font-family: PingFangSC-Medium;
          font-size: 15px;
          color: #666666;
          letter-spacing: 0;
          text-align: center;
          line-height: 27px;
        }
        span{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666666;
          letter-spacing: 0;
          line-height: 14px;
        }
        .btn{
          width: 3.6rem;
          height: 0.9rem;
          line-height: 0.9rem;
          border-radius: 0.45rem;
          ont-family: PingFangSC-Regular;
          font-size: 16px;
          border: 1px solid #69B788;
          color: #69B788;
          letter-spacing: 0;
          text-align: center;
          margin-top: 125px;
        }
      }
    }
    .me{
      text-align: center;
    }
  }
</style>

