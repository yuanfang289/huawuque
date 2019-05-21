<template>
  <div class="notice-list">
    <transition class="notice-inner" name="slide" mode="out-in">
      <div :key="item.id">
        <p>{{item.text}}</p>
      </div>
    </transition>
  </div>
</template>

<script>
  /**
   * @property {Array}   noticeList        数据列表 text： 通知文本 linkUrl：通知链接
   * @property {Number}  interval          停留间隔
   */
  export default {
    props: {
      noticeList: {
        type: Array,
        default: []
      },
      interval: {
        type: Number,
        default: 2500
      }
    },
    data() {
      return {
        number: 0,
      }
    },
    computed: {
      item() {
        return {
          id: this.number,
          text: this.noticeList[this.number].title,
        }
      }
    },
    mounted() {
      this.startMove()
    },
    methods: {
      startMove() {
        setTimeout(() => {
          if (this.number === this.noticeList.length - 1) {
            this.number = 0;
          } else {
            this.number += 1;
          }
          this.startMove();
        }, this.interval)
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/mixins";

  .notice-list {
    overflow: hidden;
    p {
      font-size: 13px;
      color: #666666;
      width: 100%;
      @include text-overflow;
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.1s linear;
  }
  .slide-leave-to {
    transform: translateY(-20px);
  }
  .slide-enter {
    transform: translateY(20px);
  }
</style>
