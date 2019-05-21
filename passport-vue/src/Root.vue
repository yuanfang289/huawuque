<template>
  <div id="app" class="wrapper">
    <page-loading v-if="tokenChecking" />
    <router-view :key="$route.fullPath" v-else></router-view>

  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {getQueryParams} from 'utils';
  import storage from 'utils/storage';
  let {setStorage, removeStorageByName} = storage;

  import PageLoading from 'lib/loading/PageLoading';

  export default {
    components: {
      PageLoading
    },
    computed: {
      ...mapState({
        tokenChecking: state => state.tokenChecking,
      })
    },
    methods: {
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
      },

      // 当前网站语言
      getLanguage() {
        let {retUrl} = getQueryParams();
        let languageEnUs = (this.$cookies.get('languageEnUs') === 'true' ? true : false) || false;

        // 如果retUrl不存在，且本地存储有记录
        if (!retUrl && languageEnUs !== undefined) {
          this.$store.dispatch('setLanguageEnUs', languageEnUs);
          return
        }

        if (retUrl) {
          let {lang} = getQueryParams(retUrl.split('?')[1]);

          // 如果lang参数存在
          if (lang !== undefined) {
            let isEnUs = lang === 'en_US';
            this.$store.dispatch('setLanguageEnUs', isEnUs);
            return
          }

          // 如果lang参数不存在，且本地存储有记录
          if (languageEnUs !== undefined) {
            this.$store.dispatch('setLanguageEnUs', languageEnUs);
          }
        }
      },
      setRetUrl() {
        let {retUrl} = getQueryParams();
        if (retUrl && retUrl.length) {
          setStorage('retUrl', retUrl, true);
        } else {
          removeStorageByName('retUrl', true);
        }
      }
    },
    created() {
      this.deviceHack();
      this.getLanguage();
      this.setRetUrl();
    },
  }
</script>
