<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <!--<page-header>-->
      <!--<topbar :type="'back'" :hideShareBtn="true">-->
        <!--<template slot="title">{{title}}</template>-->
      <!--</topbar>-->
    <!--</page-header>-->

    <page-main :show="show">
      <div class="ticket">
        <img src="https://assets.urwork.cn/image/activity/library.png">
        <!--<div class="kong"></div>-->
        <!--<div class="cont">-->
          <!--<a href="https://m.urwork.cn//goDownload?url=urwork%3A%2F%2Fbook" class="btn">-->
            <!--下载优鲜集-->
          <!--</a>-->
        <!--</div>-->
      </div>
    </page-main>
  </page-wrap>
</template>

<script>
  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';
  import QrcodeVue from 'qrcode.vue';
  import apiGetTicketCode from 'api/user/apiGetTicketCode';
  import apiTicket from 'api/user/apiTicket';
  export default {
    components: {
      QrcodeVue
    },
    data: () => {
      return {
        show: false,
        title: '内有书屋上线啦！',
        value: 'https://m.urwork.cn',
        size: 160,
        rightsCode:false,
        code:'1'
      }
    },
    methods:{

    },
    created() {
      this.show = true;
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped="">
  .kong{
    height: 90px;
  }
  #main{
    .ticket{
      text-align: center;
      position: relative;
      >img{
        display: inline-block;
      }
      .cont{
        width: 100%;
        height: 60px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        bottom: 30px;
        .btn{
          width: 160px;
          height: 40px;
          display: inline-block;
          line-height: 40px;
          border-radius: 20px;
          background: #FFCD00;
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #000000;
          letter-spacing: 0;
          font-weight: 700;
        }
      }
    }
  }
</style>


