<template>
  <div class="page-wrapper" :class="className">
    <div v-if="nativeApp && !isApp">
      <download-app></download-app>
    </div>
    <template v-else>
      <server-error v-if="error" @refresh-page="refresh" />
      <slot v-else></slot>
      <download-bar v-if="!isApp" :show="showDownloadBar && !hasActionBar" @hide-downloadbar="hideDownloadBar" />
    </template>
  </div>
</template>

<script>
  import {isApp} from 'nativeFix';
  import storage from 'utils/storage';
  let {hasStorageByName} = storage;

  import DownloadBar from 'component/modules/DownloadBar';
  import ServerError from 'component/ServerError';
  import DownloadApp from 'nativeFix/component/downloadApp/downloadApp';

  /**
   * @property {boolean}  error           接口请求报错时显示服务器错误组件
   * @property {boolean}  hasDownloadBar  是否有下载栏
   * @property {boolean}  hasActionBar    是否有底部action控件
   * @property {boolean}  nativeApp       此功能必须在APP内使用
   */
  export default {
    components: {
      DownloadBar,
      ServerError,
      DownloadApp
    },
    props: {
      error: {
        type: Boolean,
        default: false
      },
      hasDownloadBar: {
        type: Boolean,
        default: true
      },
      hasActionBar: {
        type: Boolean,
        default: false
      },
      grayBg: {
        type: Boolean,
        default: false
      },
      nativeApp: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      /**
       * @type {boolean} showDownloadBar   是否显示底部下载栏
       * @type {boolean}  isApp            TODO 原生APP补丁
       */
      return {
        showDownloadBar: false,
        isApp: false
      }
    },
    computed: {
      className() {
        let className = '';
        if (this.hasActionBar) {
          className = 'has-action-bar';
        } else
        if (this.hasDownloadBar) {
          className = 'has-download-bar';
        }

        if (!this.showDownloadBar) {
          className = '';
        }
        return className
      }
    },
    methods: {
      refresh() {

        // 500页面内，刷新按钮的事件，用来重新调用渲染页面的接口，达到刷新效果
        this.$emit('refresh-page');
      },
      hideDownloadBar() {
        this.showDownloadBar = false;
      }
    },
    created() {

      // TODO 原生APP补丁
      this.isApp = isApp();

      this.showDownloadBar = this.hasDownloadBar && !hasStorageByName('hideDownloadBar');

      if (this.grayBg) {
        this.$addClassName('body', 'gray-bg');
      }else {
        this.$removeClassName('body', 'gray-bg');
      }
    }
  }
</script>

<style lang="scss" scoped="">
  .page-wrapper {
    min-height: 100%;
    background: #F7F7F7;
    &.has-download-bar {
      padding-bottom: 50px;
      .is-app & {
        padding-bottom: 0;
      }
    }
  }
</style>
