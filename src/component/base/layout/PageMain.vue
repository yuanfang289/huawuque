<template>
  <main id="main">
    <page-loading v-if="!show"/>

    <div class="main-inner" v-if="show">
      <slot></slot>
    </div>

    <goto v-if="show" :native-back="nativeBack" :show-go-top="showGoTop" :show-go-back="showGoBack" @hide-goto="hideGotoHandler" />
  </main>
</template>

<script>
  import PageLoading from 'lib/loading/PageLoading';
  import ServerError from 'component/ServerError';
  import Goto from 'component/modules/Goto';

  /**
   * @property {boolean}  show        是否显示页面内容，默认显示loading动画
   * @property {boolean}  hasGoBack   是否有后退按钮
   * @property {boolean}  hasGoTop    是否有回到顶部按钮
   * @property {boolean}  nativeBack  是否使用APP原生后退
   */
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      hasGoBack: {
        type: Boolean,
        default: false
      },
      hasGoTop: {
        type: Boolean,
        default: false
      },
      nativeBack: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      /**
       * @type {boolean} showGoTop         是否显示返回顶部按钮
       * @type {boolean} showGoBack        是否显示后退按钮
       */
      return {
        showGoTop: false,
        showGoBack: false
      }
    },
    components: {
      PageLoading,
      ServerError,
      Goto
    },
    methods: {
      hideGotoHandler(opts) {
        this.showGoBack = opts.showGoBack;
      }
    },
    created() {
      this.showGoBack = this.hasGoBack;
      this.showGoTop = this.hasGoTop;
    }
  }
</script>
