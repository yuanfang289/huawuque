<template>
  <div class="swiper-container" :class="{'transform-scale-wrapper': transformScale}" :id="container" ref="slideContainer" :style="{overflow:column === 0 ? 'hidden' : 'visible'}">
    <div class="swiper-wrapper" ref="slideGroup">
      <div class="swiper-slide" ref="slide" v-for="(item, index) in bannerList" :key="index">
        <div
          :class="{'swiper-content': !isUserDefined}"
          :style="{
            paddingTop: isUserDefined ? 0 : paddingTop + '%',
            marginRight: column > 0 ? setInterval + 'px' : 0,
            marginLeft: column > 0 ? setInterval + 'px' : 0,
            borderRadius: slideRadius + 'px'}"
        >
          <slot name="user" :item="item">
            <template v-if="(/loginTransfer/).test(item.linkUrl)">
              <a href="javascript:void(0);" @click="loginTransfer()">
                <Img v-if="imgRender" :src="item.image" :isLazy="isLazy"/>
              </a>
            </template>
            <template v-else="">
              <a :href="item.linkUrl">
                <Img v-if="imgRender" :src="item.image" :isLazy="isLazy"/>
              </a>
            </template>
          </slot>
        </div>
      </div>
    </div>
    <div v-if="showDot" class="swiper-pagination" :id="pagination"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import {getRect, setStyle} from 'utils/dom';

  import {isLogin, setUrl, getLocation} from 'src/utils/index';
  import {isApp, toLogin} from 'src/nativeFix/index';

  /**
   * @property {Boolean}   props.isLazy                 是否使用懒加载，由于懒加载会造成最后一张图片显示不出来，所以轮播图默认都不需要懒加载。
   * @property {Boolean}   props.isUserDefined          是否为自定义内容
   * @property {array}   props.bannerList               banner数据列表,linkUrl图片跳转路径，image图片路径
   * @property {number}   props.paddingTop              banner图的高宽比，非自定义时必填
   * @property {number}   props.column                  一屏展示的列数。当设置了列数，默认为使用两边显示的swiper组件
   * @property {number}   props.wrapperPadding          左右边距，可用于露出前后一项的一小部分，必须和外包围左右padding值一致
   * @property {number}   props.setInterval             设置每个滑动块之间的间隔
   * @property {number}   props.initPageIndex           初始化指定页面的页数
   * @property {function}   props.scrollEndCallback     滑动结束后的回调函数
   * @property {boolean} props.loop                     是否支持循环
   * @property {boolean} props.autoPlay                 播放间隔时间，传false为禁止自动播放
   * @property {boolean}  props.showDot                 是否显示指示点
   * @property {boolean}  props.transformScale          是否需要缩放效果
   * @property {number}  props.slideRadius              圆角
   * @property {number}  props.speed                    滑动速度
   */
  export default {
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
      wrapperPadding: {
        type: Number,
        default: 15,
      },
      paddingTop: {
        type: Number,
        default: 53.333
      },
      column: {
        type: Number,
        default: 0
      },
      setInterval: {
        type: Number,
        default: 4
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
        default: true
      },
      autoPlay: {
        type: [Number, Boolean],
        default: 2500
      },
      showDot: {
        type: Boolean,
        default: true
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
        default: 300
      }
    },
    data: () => {
      return {
        mySwiper: null,
        imgRender: false,            //  图片开始渲染
        children: null,
        pagination: null,
        container: null,
        slideWidth: 0,
      }
    },
    methods: {
      loginTransfer() {
        //点击new_icon
          var loginUrl = "http://openapi.neigou.com/ChannelInterop/V1/URWork/Web/index";  //要跳转的url
          if(/ucommune.com/.test(window.location.host)){
            loginUrl = "http://openapi.neigou.com/ChannelInterop/V1/URWork/Web/index?domain=c"
          }else{
            loginUrl = "http://openapi.neigou.com/ChannelInterop/V1/URWork/Web/index?domain=r"
          }
          if (isApp()) {
            isLogin({
              success: () => {
                this.$DANativeApi.navigateTo({
                  url:loginUrl
                })
              },
              fail: () => {
                toLogin();
              }
            })
          } else {
                isLogin({
                  success: () => {
                    window.location.href = loginUrl;
                  },
                  fail: () => {
                    window.location.href = 'https://passport2.urwork.cn/passport/login?retUrl='+loginUrl;
                  }
                })
          }

  },
      init() {
        this.setSlideWidth();
        this.$nextTick(() => {
          this.initSlide();
        });
      },
      setSlideWidth() {
        this.children = this.$refs.slideGroup.children;
        let bodyWidth = getRect(document.body).width;
        this.slideWidth = this.column > 0 ? (bodyWidth - (this.wrapperPadding * 2)) / this.column : this.$refs.slideContainer.clientWidth;

        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          child.style.width = this.slideWidth + 'px';
        }

        //  当宽度设置完毕后内部图片开始渲染，防止计算不到尺寸
        this.$emit('width-over');
        this.imgRender = true;

        //  设置父容器overflow:hidden
        if(this.column > 0){
          setStyle(this.$refs.slideContainer.parentNode, {
            overflow:'hidden'
          });
        }
      },
      initSlide() {
        this.mySwiper = new Swiper(`#${this.container}`, {
          pagination: this.showDot ? `#${this.pagination}` : '',
          paginationClickable: this.click,
          loop: this.loop,
          speed: this.speed,
          autoplay: this.autoPlay,
          slidesPerView: 'auto',    //  此参数可以根据slide宽度改变展示个数。
          autoplayDisableOnInteraction: false,
          longSwipesRatio: 0.1,
          onSlideChangeEnd: (swiper) => {
            this.scrollEndCallback && this.scrollEndCallback(swiper);
          }
        });
      },
      randomSwiperId() {
        //  页面中存在多个swiper时会发生错乱，用Id加以区分。
        this.container = `swiper-container-${Math.random().toString(32).substr(2,15)}`;

        if(this.showDot) {
          this.pagination = `swiper-pagination-${Math.random().toString(32).substr(2,15)}`;
        }
      },
      updateSlide() {
        //如果slide存在js删除或者添加动作，使用此方法更新swiper；
        this.$nextTick(() => {
          this.setSlideWidth();
          this.mySwiper.update(true);
        })
      }
    },
    created() {

    },
    mounted() {
      this.randomSwiperId();
      this.init();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .swiper-container {
    position: relative;
  }
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

  .swiper-container {
    .swiper-pagination {
      /deep/ .swiper-pagination-bullet {
        width: 5px;
        height: 5px;
        display: inline-block;
        background: #fff;
        opacity: 0.5;
        margin: 0 4px;
        border-radius: 50%;
      }
      /deep/ .swiper-pagination-bullet-active {
        width: 18px;
        border-radius: 5px;
        opacity: 1;
        background: #fff;
      }
    }
  }

  .transform-scale-wrapper {
    .swiper-slide {
      transition: transform .3s;
    }
    .swiper-slide-prev, .swiper-slide-next {
      transform: scaleY(.95);
    }
  }
</style>
