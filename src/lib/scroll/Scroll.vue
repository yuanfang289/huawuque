<template>
  <section ref="wrapper" class="scroll-wrapper">
    <div class="scroll-content">
      <div ref="listWrapper">
        <slot :list-data="data">
          <!--内容-->
        </slot>
      </div>

      <slot name="pullup"
            :pullUpLoad="pullUpLoad"
            :isPullUpLoad="isPullUpLoad"
      >
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-show="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-show="isPullUpLoad">
            <span class="pullUpIcon"></span>加载中...
          </div>
        </div>
      </slot>

    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll';
  import {getRect} from 'utils/dom';

  const DIRECTION_H = 'horizontal';
  const DIRECTION_V = 'vertical';

  /**
   * @property {array}   props.data               用来渲染scroll的数据，这个数据会通过slot返回，组件会通过watch data变化进行刷新操作
   * @property {boolean} props.listenScroll       滚动事件
   * @property {boolean} props.listenBeforeScroll 滚动开始之前
   * @property {string}  props.direction          初始化滚动方向 [scrollX | scrollY] 值
   * @property {number}  props.refreshDelay       数据变化时刷新延迟时间(毫秒)
   */

  export default {
    name: 'scroll',
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: DIRECTION_V
      },
      scrollbar: {
        type: null,
        default: false
      },
      pullUpLoad: {
        type: null,
        default: false
      },
      startY: {
        type: Number,
        default: 0
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      freeScroll: {
        type: Boolean,
        default: false
      },
      mouseWheel: {
        type: Boolean,
        default: false
      },
      bounce: {
        default: true
      },
      zoom: {
        default: false
      }
    },
    data() {
      return {
        beforePullDown: true,
        isRebounding: false,
        isPullingDown: false,
        isPullUpLoad: false,
        pullUpDirty: true,
        pullDownStyle: '',
        bubbleY: 0
      }
    },
    computed: {
      pullUpTxt() {
        const moreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more || '加载更多';
        const noMoreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore || '没有更多了';

        return this.pullUpDirty ? moreTxt : noMoreTxt
      },
    },
    mounted() {
      setTimeout(() => {
        this.initScroll()
      }, 20)
    },
    methods: {
      initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        if (this.$refs.listWrapper && this.pullUpLoad) {
          this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
        }

        let options = {
          probeType: this.probeType,
          click: this.click,
          scrollY: this.freeScroll || this.direction === DIRECTION_V,
          scrollX: this.freeScroll || this.direction === DIRECTION_H,
          scrollbar: this.scrollbar,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
          startY: this.startY,
          freeScroll: this.freeScroll,
          mouseWheel: this.mouseWheel,
          bounce: this.bounce,
          zoom: this.zoom
        };

        this.scroll = new BScroll(this.$refs.wrapper, options);

        if (this.listenScroll) {
          this.scroll.on('scroll', pos => {
            this.$emit('scroll', pos)
          })
        }

        if (this.listenBeforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScrollStart')
          })
        }

        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      destroy() {
        this.scroll.destroy()
      },
      forceUpdate(dirty) {
        if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false;
          this.scroll.finishPullUp();
          this.pullUpDirty = dirty;
          this.refresh()
        } else {
          this.refresh()
        }
      },
      _initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
          this.isPullUpLoad = true;
          this.$emit('pullingUp')
        })
      },
    },
    watch: {
      data() {
        setTimeout(() => {
          this.forceUpdate(true)
        }, this.refreshDelay)
      }
    }
  }

</script>

<style lang="scss">
  .scroll-wrapper {
    overflow: hidden;
    position: relative;
    height: 100%;

    .scroll-content {
      position: relative;
      z-index: 1;
    }
    .pullup-wrapper {
      width: 100%;
      padding: 10px 0;
      color: #999;
      font-size: 13px;
      text-align: center;

      span {
        line-height: 24px;
        vertical-align: middle;
      }

      .after-trigger .pullUpIcon {
        width: 24px;
        height: 24px;
        display: inline-block;
        margin-right: 10px;
        background: url('../../assets/images/interface/ajax-loading.gif') no-repeat;
        background-size: 100%;
      }
    }
  }
</style>
