<template>
  <div class="page-wrapper" :class="className">
    <server-error v-if="error" @refresh-page="refresh" />
    <slot v-else></slot>
  </div>
</template>

<script>
  import ServerError from 'component/ServerError';

  /**
   * @property {boolean}  error           接口请求报错时显示服务器错误组件
   * @property {boolean}  hasActionBar    是否有底部action控件
   */
  export default {
    components: {
      ServerError
    },
    props: {
      error: {
        type: Boolean,
        default: false
      },
      hasActionBar: {
        type: Boolean,
        default: false
      },
      grayBg: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      className() {
        let className = '';
        if (this.hasActionBar) {
          className = 'has-action-bar';
        }

        return className
      }
    },
    methods: {
      refresh() {

        // 500页面内，刷新按钮的事件，用来重新调用渲染页面的接口，达到刷新效果
        this.$emit('refresh-page');
      }
    },
    created() {

      if (this.grayBg) {
        this.$addClassName('body', 'gray-bg');
      }
    }
  }
</script>

<style lang="scss">
  .page-wrapper {
    min-height: 100%;

    &.has-action-bar {
      padding-bottom: 50px;
    }
  }

  /*-----------------PC端适配--------------------*/
  .desktop {
    .wrapper {
      position: relative;
      height: 100%;
      background: url("../../../assets/images/login/web-bg.jpg") no-repeat;
      background-size: 100% 100%;
    }
    .page-wrapper {
      background: #fff;
      width: 400px;
      min-height: auto;
      position: fixed;
      top: 20%;
      right: 16%;
      border-top: 6px solid #FFCD00;
      padding-bottom: 30px;
    }
    .page-header {
      .header-inner{
        position: absolute;
        .page-topbar {
          width: 400px;
          .navigate {
            display: none;
          }
        }
      }
    }
    .form-title-wrapper {
      padding: 0;
      .bubble-tip{
        bottom: -30px;
      }
    }
    .from-btn-group {
      padding-top: 40px!important;
    }
  }
  /*-----------------PC端适配--------------------*/
</style>
