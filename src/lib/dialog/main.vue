<template>
  <transition name="fade">
    <section v-if="show" class="xy-dialog" :class="mask ? 'has-mask' : ''" :style="realZIndex">
      <div class="dialog-body">
        <div class="dialog-content">{{content}}</div>

        <div class="dialog-actions">
          <div class="border-top"></div>
          <a href="javascript:;" v-if="!confirmRight" @click.prevent="confirmHandler" class="dialog-btn confirm">{{confirmText}}</a>
          <a href="javascript:;" v-if="type === 'confirm'" @click.prevent="cancelHandler" class="dialog-btn cancel">{{cancelText}}</a>
          <a href="javascript:;" v-if="confirmRight" @click.prevent="confirmHandler" class="dialog-btn confirm">{{confirmText}}</a>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
  export default {
    name: 'xy-dialog',
    data: () => {
      /**
       *
       * @property {string}   data.type           框类型  ['alert', 'confirm']
       * @property {string}   data.content        内容
       * @property {boolean}  data.mask           遮罩
       * @property {boolean}  data.confirmRight   确认按钮显示位置
       * @property {string}   data.cancelText     取消按钮文本
       * @property {string}   data.confirmText    确认按钮文本
       * @property {number}   data.zIndex         z-index值
       * @property {function} data.callback       确认、取消回调函数
       */
      return {
        show: true,
        type: 'alert',
        content: '',
        mask: true,
        confirmRight: true,
        cancelText: '取消',
        confirmText: '确认',
        zIndex: 1200,
        callback: null
      }
    },
    computed: {
      realZIndex() {
        return `z-index: ${this.zIndex}`
      }
    },
    methods: {
      cancelHandler() {
        this.callbackHandler(false);
      },
      confirmHandler() {
        this.callbackHandler(true);
      },
      callbackHandler(confirm) {
        this.show = false;

        let res = {
          confirm
        };
        typeof this.callback === 'function' && this.callback(res);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .xy-dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    &.has-mask {
      background-color: rgba(0, 0, 0, .4);
    }
    .dialog-body {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 260px;
      overflow: hidden;
      transform: translate(-50%, -50%);
      transform-origin: center;
      background-color: #fff;
      border-radius: 10px;
    }

    .dialog-content {
      padding: 20px;
      color: #333;
      font-size: 17px;
      font-weight: bold;
      line-height: 25px;
      text-align: center;
    }

    .border-top {
      position: absolute;
      top: 0;
      left: 10px;
      right: 10px;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        border-top: 1px solid #e5e5e5;
        content: "";
        transform: scale(.5);
        transform-origin: 0 0;
      }
    }
    .dialog-actions {
      position: relative;
      display: flex;

      .dialog-btn {
        position: relative;
        flex: 1;
        display: block;
        height: 44px;
        padding: 0 15px;
        box-sizing: border-box;
        color: #007AFF;
        font-size: 17px;
        font-weight: 400;
        text-align: center;
        line-height: 44px;

        &.cancel {

        }

        &:nth-of-type(2) {
          &::before {
            position: absolute;
            top: 50%;
            left: 0;
            height: 40px;
            border-left: 1px solid #e5e5e5;
            content: "";
            transform: scale(.5) translateY(-50%);
            transform-origin: 0 0;
          }
        }
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
