<template>
  <header class="page-header"
    :class="{'is-fixed': isFixed}"
    :style="computedStyle"
  >
    <div class="header-inner">
      <slot></slot>
    </div>
  </header>
</template>

<script>
  import {getDocumentRect} from 'utils/dom';

  /**
   * @property {boolean} props.isFixed      如果启用，头部则吸附在顶部，覆盖内容
   */
  export default {
    props: {
      isFixed: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {
        height: 0
      }
    },
    computed: {
      computedStyle() {
        return this.height > 0 ? `height: ${this.height}px` : ''
      }
    },
    updated() {
      this.$nextTick(() => {
        this.height = this.$el.firstChild.clientHeight;
      });
    },
    mounted() {
      this.height = this.$el.firstChild.clientHeight;
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/mixins";

  .page-header {
    .header-inner {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 900;
      width: 100%;
      transition: top .2s;

      &.has-border {
        @include border-bottom($border-def, 899);
      }
    }
    &.is-fixed {
      height: 0 !important;
    }
  }
</style>
