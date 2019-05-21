<template>
  <transition name="fade">
    <div ref="toast" class="xy-toast" :class="mask ? 'has-mask' : ''" v-if="show">
      <div class="xy-toast-text">{{content}}</div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Toast',
    data: () => {
      /**
       * @property {string}  data.text      提示文本
       * @property {number}  data.duration  显示持续时间
       * @property {boolean} data.mask      是否使用遮罩防止点击穿透
       * @property {string}  data.icon      icon className(TODO: 未开发)
       * @property {string}  data.image     使用图片代替icon(TODO: 未开发)
       */
      return {
        show: true,
        content: '',
        duration: 2000,
        mask: true,
        icon: '',
        image: ''
      }
    },
    methods: {
      hide() {
        this.timer = window.setTimeout(() => {
          this.show = false;
        }, this.duration);
      },
      destroy() {
        clearTimeout(this.timer);
        this.$refs.toast && this.$refs.toast.remove();
      }
    },
    mounted() {
      this.hide()
    }
  }
</script>

<style lang="scss" scoped>
  .xy-toast {
    position: fixed;
    top: 20%;
    left: 50%;
    z-index: 2000;
    word-break: break-all;

    &:not(.has-mask) {
      max-width: 80%;
      padding: 10px;
      background-color: rgba(0, 0, 0, .6);
      border-radius: 4px;
      color: #fff;
      transform: translate(-50%, -50%);
      transform-origin: 0 0;
    }
    &.has-mask {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      .xy-toast-text {
        position: absolute;
        top: 50%;
        left: 50%;
        max-width: 80%;
        padding: 10px;
        background-color: rgba(0, 0, 0, .6);
        border-radius: 4px;
        color: #fff;
        transform: translate(-50%, -50%);
        transform-origin: 0 0;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
