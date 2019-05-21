<template>

  <topbar-back
    v-if="type === 'back'"
    :class="computedClass"
  >
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <template slot="actions">
      <slot name="actions"></slot>
    </template>
  </topbar-back>

</template>

<script>
  import TopbarBack from 'component/topbar/TopbarBack';

  /**
   *
   * @property props.type           组件类型 {back: '后退按钮'}
   * @property props.theme          组件主题 {def: '默认', white: '白底灰色按钮',
   *                                         trans: '透明白色按钮', transDef: '透明灰色按钮'}
   */
  export default {
    components: {
      TopbarBack
    },
    props: {
      type: {
        default: 'back',
        validator(value) {
          return ['back'].indexOf(value) !== -1
        }
      },
      theme: {
        default: 'def',
        validator(value) {
          return ['def', 'white', 'trans', 'transDef'].indexOf(value) !== -1
        }
      }
    },
    /**
     * @property {boolean}   fadein          标题栏是否已渐入
     * @property {boolean}   fadeStatus      当前标题栏渐入状态，预防频繁触发自定义事件
     */
    data: () => {
      return {
        fadein: false,
        fadeStatus: false
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

        return className
      }
    },
    mounted() {
      if (this.theme === 'def') {
        this.$addClassName('.page-header .header-inner', 'has-border');
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
    }
  }
</style>
