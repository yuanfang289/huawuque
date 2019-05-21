<template>
  <div class="slide-wrapper" ref="slideWrapper" :style="{overflow:column === 0 ? 'hidden' : 'visible'}">
    <div class="slide" ref="slide">
      <div class="slide-group" :class="transformScale ? 'slide-group-scale' : ''" ref="slideGroup">
        <div v-for="(item, index) in bannerList" :key="item.id">
          <div
            :class="{'swiper-content': !isUserDefined}"
            :style="{
            paddingTop: isUserDefined ? 0 : paddingTop + '%',
            marginRight: column > 0 ? setInterval + 'px' : 0,
            borderRadius: slideRadius + 'px'}"
          >
            <slot name="user" :$index="index">
              <a :href="item.linkUrl">
                <Img v-if="imgRender" :src="item.image" :isLazy="isLazy"/>
              </a>
            </slot>
          </div>
        </div>
      </div>
      <div v-if="showDot" class="dots">
        <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import {getRect, setStyle} from 'utils/dom';

  /**
   * @property {Boolean}   props.isLazy                 是否使用懒加载，由于懒加载会造成最后一张图片显示不出来，所以轮播图默认都不需要懒加载。
   * @property {Boolean}   props.isUserDefined          是否为自定义内容
   * @property {array}   props.bannerList               banner数据列表,linkUrl图片跳转路径，image图片路径
   * @property {number}   props.paddingTop              banner图的高宽比，非自定义时必填
   * @property {number}   props.column                  一屏展示的列数。当设置了列数，默认为使用两边显示的swiper组件
   * @property {number}   props.rightMargin             右边距，可用于露出后一项的一小部分
   * @property {number}   props.setInterval             设置每个滑动块之间的间隔
   * @property {number}   props.initPageIndex           初始化指定页面的页数
   * @property {function}   props.scrollEndCallback     滑动结束后的回调函数
   * @property {boolean} props.loop                     是否支持循环
   * @property {boolean} props.autoPlay                 是否自动轮播
   * @property {string}  props.interval                 播放间隔时间
   * @property {boolean}  props.showDot                 是否显示指示点
   * @property {boolean}  props.transformScale          是否需要缩放效果
   * @property {number}  props.slideRadius              圆角
   * @property {number}  props.click                    是否可以点击
   * @property {number}  props.threshold                可滚动到下一个的阈值
   * @property {number}  props.speed                    滑动速度
   * @property {string}  props.eventPassthrough         是否支持原生事件
   */


  export default {
    name: "slide",
    props: {
      isLazy: {
        type: Boolean,
        default: false
      },
      isUserDefined: {
        type: Boolean,
        default: false
      },
      bannerList: {
        type: Array,
        default() {
          return []
        }
      },
      paddingTop: {
        type: Number,
        default: 53.333
      },
      column: {
        type: Number,
        default: 0
      },
      rightMargin: {
        type: Number,
        default: 32
      },
      setInterval: {
        type: Number,
        default: 8
      },
      initPageIndex: {
        type: Number,
        default: 0
      },
      scrollEndCallback: {
        type: Function
      },
      loop: {
        type: Boolean,
        default: false
      },
      autoPlay: {
        type: Boolean,
        default: false
      },
      interval: {
        type: Number,
        default: 4000
      },
      showDot: {
        type: Boolean,
        default: false
      },
      transformScale: {
        type: Boolean,
        default: false
      },
      slideRadius: {
        type: Number,
        default: 5
      },
      click: {
        type: Boolean,
        default: true
      },
      threshold: {
        type: Number,
        default: 0.3
      },
      speed: {
        type: Number,
        default: 400
      },
      eventPassthrough: {
        type: String,
        default: 'vertical'
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0,
        slideWidth:0,
        imgRender:false            //  图片开始渲染
      }
    },
    mounted() {
      this.update();
      window.addEventListener('resize', () => {
        if (!this.slide || !this.slide.enabled) {
          return
        }
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          if (this.slide.isInTransition) {
            this._onScrollEnd();
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this.refresh()
        }, 60)
      })
    },
    activated() {
      if (!this.slide) {
        return
      }
      this.slide.enable();
      let pageIndex = this.slide.getCurrentPage().pageX;
      this.slide.goToPage(pageIndex, 0, 0);
      this.currentPageIndex = pageIndex;
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      this.slide.disable();
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      this.slide.disable();
      clearTimeout(this.timer)
    },
    methods: {
      update() {
        //  刷新swiper
        if (this.slide) {
          this.slide.destroy()
        }
        this.$nextTick(() => {
          this.init()
        })
      },
      refresh() {
        this._setSlideWidth(true);
        this.slide.refresh()
      },
      prev() {
        //  上一页
        this.slide.prev()
      },
      next() {
        //  下一页
        this.slide.next()
      },
      init() {
        clearTimeout(this.timer);
        this.currentPageIndex = this.initPageIndex;
        this._setSlideWidth();
        if(this.loop) {
          this.$addClassName(this.children[this.currentPageIndex],'slide-active');
        }
        if (this.showDot) {
          this._initDots()
        }
        this.$nextTick(() => {
          this._initSlide();
        });
        if (this.autoPlay) {
          this._play()
        }
      },
      _setSlideWidth(isResize) {
        //  设置silde宽度
        this.children = this.$refs.slideGroup.children;
        let width = 0;
        let bodyWidth = getRect(document.body).width;
        this.slideWidth = this.column > 0 ? (bodyWidth - this.rightMargin) / this.column : this.$refs.slide.clientWidth;

        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          this.$addClassName(child, 'slide-item');
          child.style.width = this.slideWidth + 'px';
          width += this.slideWidth;
        }
        if (this.loop && !isResize) {
          width += 2 * this.slideWidth;
        }
        this.$refs.slideGroup.style.width = width + 'px';

        //  当宽度设置完毕后内部图片开始渲染，防止计算不到尺寸
        this.imgRender = true;

        //  设置父容器overflow:hidden
        if(this.column > 0){
          setStyle(this.$refs.slideWrapper.parentNode, {
            overflow:'hidden'
          });
        }
      },
      _initSlide() {
        //  初始化swiper
        let stepX = this.column > 0 ? this.slideWidth : this.$refs.slide.clientWidth;
        //  stepX    X轴滑动步数(间隔)   默认为$refs.slide的容器宽度   swiper具体参数可见bscroll.esm.js
        this.slide = new BScroll(this.$refs.slide, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: this.threshold,
            speed: this.speed,
            stepX: stepX
          },
          bounce: false,
          stopPropagation: true,
          click: this.click,
          probeType: 3,
          eventPassthrough: this.eventPassthrough,
          bindToWrapper: true
        });
        if(this.initPageIndex){
          //  初始化到指定页
          this.slide.goToPage(this.initPageIndex);
        }
        this.slide.on('scrollEnd', this._onScrollEnd);
        this.slide.on('touchEnd', () => {
          if (this.autoPlay) {
            this._play()
          }
        });
        this.slide.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd() {
        let pageIndex = this.slide.getCurrentPage().pageX;
        this.currentPageIndex = pageIndex;
        if(this.loop) {
          for(let i = 0;i < this.children.length;i ++) {
            this.$removeClassName(this.children[i],'slide-active');
          }
          this.$addClassName(this.children[pageIndex + 1],'slide-active');
        }
        typeof this.scrollEndCallback === 'function' && this.scrollEndCallback(pageIndex);
        if (this.autoPlay) {
          this._play()
        }
      },
      _initDots() {
        //  初始化指示点
        this.dots = new Array(this.children.length)
      },
      _play() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.slide.next()
        }, this.interval)
      }
    },
    watch: {
      loop() {
        this.update()
      },
      autoPlay() {
        this.update()
      },
      speed() {
        this.update()
      },
      threshold() {
        this.update()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .slide-wrapper {
    position: relative;
    overflow: hidden;
  }

  .slide {
    min-height: 1px;
    .slide-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
    }
    .slide-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      .swiper-content{
        position: relative;
        background: #f5f5f5 url("#{$placehold_img}") no-repeat center;
        background-size: 25%;
        overflow: hidden;
        a {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }
      }
    }
    .slide-group-scale {
      .slide-item{
        transform: scaleY(0.95);
        transform-origin: center;
        transition: transform .1s linear;
      }
      .slide-active {
        transform: scaleY(1.0);
        transform-origin: center;
        transition: transform .1s linear;
      }
    }

    .dots {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      transform: translateZ(1px);
      text-align: center;
      font-size: 0;
      .dot {
        display: inline-block;
        margin: 0 4px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(255, 255, 255, .5);
        &.active {
          width: 18px;
          border-radius: 5px;
          background: #fff;
          opacity: 1;
        }
      }
    }
  }

</style>
