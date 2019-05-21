<template>
  <transition name="mask-fade">
    <div v-if="show || showMask" @click="hide" class="mask" :style="'z-index: ' + (zIndexNum || zIndex)"></div>
  </transition>
</template>

<script>
    export default {
      name: 'MaskLayer',
      props: {
        show: {
          type: Boolean,
          default: false
        },
        /**
         * @type {number} zIndex 遮罩层的z-index值
         * @default 1000
         */
        zIndex: {
          type: Number,
          default: 1000
        },
      },
      data: () => {
        return {
          zIndexNum: null,
          showMask: false
        }
      },
      methods: {
        hide() {
          this.showMask = false;
          this.$emit('hide-mask');
          typeof this.onHide === 'function' && this.onHide(this._uid);
          this.$removeClassName('html', 'mask-show');
        }
      },
      mounted() {
        if (this.show) {
          this.$addClassName('html', 'mask-show');
        }
      }
    }
</script>

<style lang="scss">
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.3);
  }
  .mask-show {
    overflow: hidden !important;
  }
  .mask-fade-enter-active, .mask-fade-leave-active {
    transition: .3s ease-in-out;
  }
  .mask-fade-enter, .mask-fade-leave-to {
    opacity: 0;
  }
</style>
