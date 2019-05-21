<template>
  <header class="page-header"
    :class="{'is-fixed': isFixed, 'hide-header': hideHeader}"
    :style="computedStyle"
  >
    <div class="header-inner" :style="computedInnerStyle">
      <slot></slot>
    </div>
  </header>
</template>

<script>
  import {getDocumentRect} from 'utils/dom';

  /**
   * @property {boolean} props.isFixed      如果启用，头部则吸附在顶部，覆盖内容
   * @property {boolean} props.isHeadroom   页面上下滑动时会切换显示和隐藏
   * @property {boolean} props.hideTitle    如果为true，页面上下滑动时则只隐藏标题栏，否则隐藏整个header，isHeadroom为true时生效
   * @property {number}  props.offset       header隐藏时的偏移量，header的高度减去offset为实际top值，hideTitle等于true时无效
   * @property {boolean} props.tab          解决js css操作  造成scroll滑动(eg:隐藏了一个高度大于60 的dom )触发scrollHandle  默认true  传值需要再父组件通过事件 触发  当hide节点是传false  show时传true
   */
  export default {
    props: {
      isFixed: {
        type: Boolean,
        default: false
      },
      isHeadroom: {
        type: Boolean,
        default: true
      },
      hideTitle: {
        type: Boolean,
        default: false
      },
      offset: {
        type: Number,
        default: 0
      },
      tab: {
        type: Boolean,
        default: true
      },

    },
    data: () => {
      return {
        height: 0,
        hideHeader: false,
        oldScrollTop: 0
      }
    },
    computed: {
      computedStyle() {
        return this.height > 0 ? `height: ${this.height}px` : ''
      },
      computedInnerStyle() {
        return this.hideHeader && !this.hideTitle ? `top: ${-this.height + this.offset}px` : ''
      }
    },
    methods: {
      sendMsg: function () { //传参方法
        console.log('333')
        this.$emit('headCallBack', this.hideHeader); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
      },
      scrollHandle() {
        this.sendMsg();
        const {
          clientHeight,
          scrollTop
        } = getDocumentRect();

        if (scrollTop > clientHeight / 2) {
          let diff = scrollTop - this.oldScrollTop;
          if (diff >= 0) {
            this.hideHeader = true;
            this.oldScrollTop = scrollTop;
          } else {
            if (diff < -60&&this.tab) {
              this.hideHeader = false;
              this.oldScrollTop = scrollTop;
            }
          }
        } else {
          this.hideHeader = false;
        }
      }
    },
    updated() {
      this.$nextTick(() => {
        this.height = this.$el.firstChild.clientHeight;
      });
    },
    mounted() {
      this.height = this.$el.firstChild.clientHeight;
      if (this.isHeadroom && !this.isApp) {
        window.addEventListener('scroll', this.scrollHandle, false);
      }
    },
    destroyed() {
      if (this.isHeadroom && !this.isApp) {
        window.removeEventListener('scroll', this.scrollHandle, false);
      }
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
    &.hide-header {
      .header-inner {
        top: -45px;
      }
    }
  }
</style>
