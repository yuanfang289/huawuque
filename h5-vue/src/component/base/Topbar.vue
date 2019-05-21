<template>

  <topbar-back
    v-if="(!isApp || hideNativeTitleBar) && type === 'back'"
    :nativeBack="nativeBack"
    :class="computedClass"
  >
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <template slot="actions">
      <slot name="actions"></slot>
    </template>
  </topbar-back>

  <topbar-menu
    v-else-if="(!isApp || hideNativeTitleBar) && type === 'menu'"
    :class="computedClass"
  >
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <template slot="actions">
      <slot name="actions"></slot>
    </template>
  </topbar-menu>

  <topbar-wrap
    v-else-if="(!isApp || hideNativeTitleBar) && type === 'backclose'"
    :nativeBack="nativeBack"
    :class="computedClass"
  >
    <template slot="navigate">
      <slot name="navigate"></slot>
    </template>
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <template slot="actions">
      <slot name="actions"></slot>
    </template>
  </topbar-wrap>

</template>

<script>
  import {getDocumentRect} from 'utils/dom';
  import {isApp} from 'nativeFix';
  import TopbarBack from 'component/topbar/TopbarBack';
  import TopbarMenu from 'component/topbar/TopbarMenu';
  import TopbarWrap from 'component/topbar/TopbarWrap';
  import getSystemInfo from 'vendor/systemInfo/systemInfo';

  /**
   *
   * @property props.nativeBack     是否使用APP原生后退
   * @property props.type           组件类型 {back: '后退按钮', menu: '导航菜单', search: '搜索框'}
   * @property props.theme          组件主题 {def: '默认', white: '白底灰色按钮',
   *                                         trans: '透明白色按钮', transDef: '透明灰色按钮'}
   *
   * @property props.mode           组件模式 {fade: '滚动时切换背景色(theme: def和theme: transDef时无效)'}
   * @property props.offset         触发fadein的偏移量
   *
   * TODO 原生APP补丁
   * @property {boolean}  props.hideNativeTitleBar       隐藏原生标题栏，默认同时隐藏状态栏
   * @property {boolean}  props.showNativeStatusBar      显示原生状态栏(不占位)
   * @property {number}   props.nativeStatusBarStyle     原生状态栏样式{1: 灰色字, 2: 白色字}
   * @property {boolean}  props.hideShareBtn             隐藏原生标题栏分享按钮，默认显示
   */
  export default {
    components: {
      TopbarBack,
      TopbarMenu,
      TopbarWrap
    },
    props: {
      nativeBack: {
        type: Boolean
      },
      type: {
        default: 'back',
        validator(value) {
          return ['back', 'menu', 'search','backclose'].indexOf(value) !== -1
        }
      },
      theme: {
        default: 'def',
        validator(value) {
          return ['def', 'white', 'trans', 'transDef'].indexOf(value) !== -1
        }
      },
      mode: {
        default: '',
        validator(value) {
          return ['', 'fade'].indexOf(value) !== -1
        }
      },
      offset: {
        type: Number,
        default: 20
      },
      hideNativeTitleBar: {
        type: Boolean,
        default: false
      },
      hideNavigationBarDelay: {
        type: Number,
        default: 600
      },
      showNativeStatusBar: {
        type: Boolean,
        default: false
      },
      nativeStatusBarStyle: {
        type: Number,
        default: 2
      },
      hideShareBtn: {
        type: Boolean,
        default: false
      }
    },
    /**
     * @property {boolean}   fadein          标题栏是否已渐入
     * @property {boolean}   fadeStatus      当前标题栏渐入状态，预防频繁触发自定义事件
     */
    data: () => {
      return {
        fadein: false,
        fadeStatus: false,
        isApp: false
      }
    },
    computed: {
      computedClass() {
        let className = 'topbar-theme-def';

        if (this.theme === 'trans') {
          className = 'topbar-theme-trans';
        }
        if (this.theme === 'white') {
          className = 'topbar-theme-white';
        }
        if (this.theme === 'transDef') {
          className = 'topbar-theme-trans-def';
        }

        if (this.mode === 'fade' && this.fadein) {
          className += ' fadein';
        }

        if (this.isApp && !this.showNativeStatusBar) {
          className += ' hide-native-status-bar';
        }

        return className
      }
    },
    methods: {
      scrollHandle() {
        const {
          scrollTop
        } = getDocumentRect();

        if (scrollTop > this.offset) {
          if (this.fadein !== (this.fadeStatus = true)) {
            this.$addClassName('.page-header .header-inner', 'has-border');

            if (this.mode === 'fade' && this.theme === 'trans') {

              // TODO 原生APP补丁，设置原生状态栏样式
              if (this.isApp) {
                this.$DANativeApi.setStatusBarStyle({
                  style: 1
                });
              }
            }

            // 渐入时触发自定义事件
            this.$emit('topbar-fadein');
          }
          this.fadein = true;
        } else {
          if (this.fadein !== (this.fadeStatus = false)) {
            this.$removeClassName('.page-header .header-inner', 'has-border');

            if (this.mode === 'fade' && this.theme === 'trans') {

              // TODO 原生APP补丁，设置原生状态栏样式
              if (this.isApp) {
                this.$DANativeApi.setStatusBarStyle({
                  style: 2
                });
              }
            }

            // 渐出时触发自定义事件
            this.$emit('topbar-fadeout');
          }
          this.fadein = false;
        }
      }
    },
    created() {

      this.isApp = isApp();
      let systemInfo = getSystemInfo();

      // TODO 原生APP补丁，如果是App，且隐藏了标题栏，初始化原生标题栏设置
      if (this.isApp && this.hideNativeTitleBar) {
        let isShowStatusBarView = this.showNativeStatusBar;
        setTimeout(() => {
          this.$DANativeApi.showNavigationBar({
            isShow: false,
            isShowStatusBarView
          });
          this.$DANativeApi.setStatusBarStyle({
            style: this.nativeStatusBarStyle
          });
        },systemInfo.isAndroid ? 0 : this.hideNavigationBarDelay)

      }

      // TODO 原生APP补丁，隐藏原生分享按钮
      if (this.isApp && this.hideShareBtn) {
        this.$DANativeApi.showShareButton({
          isShow: false
        })
      }
    },
    mounted() {
      if (this.theme === 'def') {
        this.$addClassName('.page-header .header-inner', 'has-border');
      }

      if (this.mode === 'fade' && this.theme !== 'def' && this.theme !== 'transDef') {
        window.addEventListener('scroll', this.scrollHandle, false);
      }
    },
    destroyed() {
      if (this.mode === 'fade' && this.theme !== 'def' && this.theme !== 'transDef') {
        window.removeEventListener('scroll', this.scrollHandle, false);
      }

      // TODO 原生APP补丁， 还原原生标题栏设置
      if (this.isApp && this.hideNativeTitleBar) {
        this.$DANativeApi.showNavigationBar({
          isShow: true,
          isShowStatusBarView: true
        });
        this.$DANativeApi.setStatusBarStyle({
          style: 1
        });
      }

      // TODO 原生APP补丁，显示原生分享按钮
      if (this.isApp && this.hideShareBtn) {
        this.$DANativeApi.showShareButton({
          isShow: true
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  $font-color: #666;
  $bgc: #f9f9f9;

  .page-topbar {
    position: relative;
    min-height: 45px;

    &.hide-native-status-bar {
      padding-top: 20px;
      .iphone-x & {
        padding-top: 44px;
      }
    }

    .navigate {
      position: absolute;
      left: 8px;
      bottom: 7px;
      z-index: 10;
      width: 34px;
      height: 34px;
      font-size: 18px;
      text-align: center;
      line-height: 34px;

      .action {
        display: block;
        width: 100%;
        height: 100%;
        color: $font-color;
        transition: .1s;
      }
    }

    .title {
      position: relative;
      z-index: 1;
      @include text-overflow;
      width: 100%;
      padding: 7px 80px 8px;
      font-size: 18px;
      font-weight: bold;
      line-height: 30px;
      text-align: center;
      opacity: 0;
      transition: .1s;
    }

    .actions {
      @include clearfix;
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 10;
      padding-bottom: 7px;
      padding-right: 6px;
      font-size: 18px;
      text-align: center;
      line-height: 34px;

      .action {
        float: left;
        width: 34px;
        height: 34px;
        margin-left: 2px;
        color: $font-color;
      }
    }

    // Theme
    &.topbar-theme-def {
      background-color: $bgc;
      .title {
        opacity: 1;
      }
    }

    &.topbar-theme-white {
      background-color: #fff;
    }

    &.topbar-theme-trans {
      .navigate, .actions {
        .action {
          color: #fff;
        }
      }

      &.fadein {
        .navigate, .actions {
          .action {
            color: $font-color;
          }
        }
      }
    }
    &.fadein {
      background-color: $bgc;
      .title {
        opacity: 1;
      }
    }
  }
</style>
