<template>
  <div class="web-component" v-if="isWeb">
    <a :href="path" class="web-logo"></a>
    <div class="web-text"></div>
    <div class="web-nav">
      <div class="web-nav-wrapper">
        <a href="https://www.urwork.cn/hide">{{isEn ? field.privacyPolicy.en : field.privacyPolicy.ch}}</a>
        <a href="https://www.urwork.cn/law">{{isEn ? field.legalNotices.en : field.legalNotices.ch}}</a>
        <a href="https://www.urwork.cn/contactus">{{isEn ? field.contactUs.en : field.contactUs.ch}}</a>
        <a href="https://www.urwork.cn/aboutus">{{isEn ? field.aboutUs.en : field.aboutUs.ch}}</a>
        <a href="https://www.urwork.cn/mallWelcome">{{isEn ? field.sellOnUrWork.en : field.sellOnUrWork.ch}}</a>
        <a href="https://www.urwork.cn/join">{{isEn ? field.joinUs.en : field.joinUs.ch}}</a>
      </div>
      <div class="web-nav-copyRight">
        <p>@2015-2016 优客工场  版权所有 京ICP备15021969号-1</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {getLocation, runEnv} from 'utils';
  import {website} from 'config/feature';

  export default {
    computed: {
      ...mapState({
        field: state => state.comparisonTable,
        isEn: state => state.languageEnUS
      })
    },
    data: () => {
      return {
        isWeb: false,        //  web页面
        path: 'javascript:;',             //  web首页路劲
      }
    },
    created() {
      const systemInfo = this.$systemInfo();
      if(!systemInfo.isMobile){
        this.isWeb = true;
      }

      let protocol = getLocation().protocol;
      let env = runEnv();
      this.path = protocol + website['www'][env.currentEnv];

    }
  }
</script>

<style lang="scss">
  /*-----------------PC端适配--------------------*/
  .desktop {
    .web-logo {
      display: block;
      width: 150px;
      height: 60px;
      position: fixed;
      top: 6%;
      left: 10%;
      background: url("../../assets/images/login/web-logo.png") no-repeat;
      background-size: 100% 100%;
    }
    .web-text {
      width: 427px;
      height: 120px;
      position: fixed;
      top: 35%;
      left: 18%;
      background: url("../../assets/images/login/web-text.png") no-repeat;
      background-size: 100% 100%;
    }
    .web-nav {
      position: fixed;
      bottom: 12%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      color: #FFFFFF;
      text-align: center;
      .web-nav-wrapper {
        margin-bottom: 10px;
      }
      a {
        color: #FFFFFF;
        margin-right: 7px;
        margin-left: 7px;
      }
    }
  }
  /*-----------------PC端适配--------------------*/
</style>
