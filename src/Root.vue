<template>
  <div id="app" class="wrapper">
    <page-loading v-if="tokenChecking && !serverError" />
    <server-error v-if="serverError" @refresh-page="refresh" />
    <router-view :key="$route.fullPath" v-if="!tokenChecking && !serverError"></router-view>
  </div>
</template>

<script>
  import {badiuStatistics, growingIOStatistics} from 'src/statistics';
  import { mapState } from 'vuex';
  import {isApp} from 'src/nativeFix';
  import {getQueryParams} from 'utils';

  import ServerError from 'component/ServerError';
  import PageLoading from 'lib/loading/PageLoading';

  export default {
    components: {
      ServerError,
      PageLoading
    },
    computed: {
      ...mapState({
        tokenChecking: state => state.tokenChecking,
        tokenChecked: state => state.tokenChecked,
        serverError: state => state.serverError
      })
    },
    watch: {
      tokenChecked(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {

          // 初始化GrowingIO统计
          growingIOStatistics(this.$store.state.userInfo);
        }
      }
    },
    methods: {
      refresh() {

        // 500页面内，刷新按钮的事件，用来重新调用渲染页面的接口，达到刷新效果
        this.$showLoading();
        this.$store.dispatch('isLoginUser')
          .then(() => {
            this.$store.dispatch('serverErrorResumed');
            this.$hideLoading();
            this.$router.replace(location.pathname);
          })
          .catch(() => {
            this.$store.dispatch('serverError');
            this.$hideLoading();
            this.$toast('请检查网络，或稍后重试');
          })
      },
      deviceHack() {
        const systemInfo = this.$systemInfo();

        if (systemInfo.isMobile) {
          this.$addClassName('html', 'mobile');
        } else {
          this.$addClassName('html', 'desktop');
        }

        if (systemInfo.isAndroid) {
          this.$addClassName('html', 'android-device');
        } else
        if (systemInfo.isIos) {
          this.$addClassName('html', 'ios-device');
        }

        if (systemInfo.isQQ || systemInfo.isWechat || systemInfo.isQQBrowser) {
          this.$addClassName('html', 'tencent-browser');
        }
        if (systemInfo.isIphoneX) {
          this.$addClassName('html', 'iphone-x');
        }

        if (isApp()) {
          this.$addClassName('html', 'is-app');
        }
      },
      // 当前网站语言
      getLanguage() {
        let {lang} = getQueryParams();
        let languageEnUs = (this.$cookies.get('languageEnUs') === 'true' ? true : false) || false;

        // 如果retUrl不存在，且cookies有记录
        if (!lang && languageEnUs !== undefined) {
          this.$store.dispatch('setLanguageEnUs', languageEnUs);
          return
        }

        if (lang !== undefined) {
          // 如果lang参数存在
          let isEnUs = lang === 'en_US';
          this.$store.dispatch('setLanguageEnUs', isEnUs);
        } else {
          // 如果lang参数不存在，且cookies有记录
          if (languageEnUs !== undefined) {
            this.$store.dispatch('setLanguageEnUs', languageEnUs);
          }
        }
      }
    },
    created() {
      this.deviceHack();
      this.getLanguage();

      // 百度统计
      badiuStatistics();
    }
  }
</script>

<style lang="scss">
  .wrapper {
    height: 100%;
  }
</style>
