<template>
  <div class="goto" v-if="(showGoTop && !hideGoTop) || showGoBack">
    <ul>
      <li v-if="showGoBack" @click="goBackHandler" class="goback">
        <div class="icon-wrap"><i class="uricon-light"></i></div>
      </li>
      <li v-show="showGoTop && !hideGoTop" @click="goTopHandler" class="gotop">
        <div class="icon-wrap"><i class="uricon-jt"></i></div>
      </li>
    </ul>
  </div>

</template>

<script>
  import globalData from "src/globalData";
  import {isApp} from "src/nativeFix";
  import {getDocumentRect} from 'utils/dom';

  /**
   * @property {boolean}  showGoTop    是否显示回到顶部按钮
   * @property {boolean}  showGoBack   是否显示后退按钮
   * @property {boolean}  nativeBack   是否使用APP原生后退事件
   */
  export default {
    props: {
      showGoTop: {
        type: Boolean
      },
      showGoBack: {
        type: Boolean
      },
      nativeBack: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {
        hideGoTop: false,
        isTop: true
      }
    },
    methods: {
      goBackHandler() {
        // TODO 原生APP补丁
        if (this.nativeBack && isApp()) {
          this.$DANativeApi.navigateBack();
          return
        }

        globalData.routerTimer = setTimeout(() => {
          if (this.$route.name === 'index') return;
          this.$router.replace({name: 'index'});
        }, 1000);

        this.$router.back();
      },
      goTopHandler(duration = 30) {
        this.goTopTimer = setInterval(() => {

          // 获取滚动条距离顶部高度
          let osTop = document.documentElement.scrollTop || document.body.scrollTop;
          let ispeed = Math.floor(-osTop / 7);

          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;

          // 到达顶部，清除定时器
          if (osTop === 0) {
            clearInterval(this.goTopTimer);
          }

          this.isTop = true;

        }, duration);
      },
      getRect() {
        const {
          clientHeight: winHeight,
          scrollTop
        } = getDocumentRect();

        return {
          winHeight,
          scrollTop
        }
      },
      onScroll() {
        let {
          winHeight,
          scrollTop
        } = this.getRect();

        if (scrollTop > winHeight) {
          if (!this.hideGoTop) return;
          this.hideGoTop = false;
        } else {
          if (this.hideGoTop) return;
          this.hideGoTop = true;
        }

        if (!this.isTop) {
          clearInterval(this.goTopTimer);
        }
        this.isTop = false;
      },
    },
    created() {
      // 如果当前是首页则隐藏后退按钮
      if (this.$route.name === 'index') {
        this.$emit('hide-goto', {
          showGoBack: false
        });
      }

      this.onScroll();
      window.addEventListener('scroll', this.onScroll, false);
    },
    destroyed() {
      window.removeEventListener('scroll', this.onScroll, false);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .goto {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 890;
    color: #666;

    li {
      overflow: hidden;
      width: 36px;
      height: 36px;
      margin-top: 10px;
    }
    .icon-wrap {
      position: relative;
      top: 0;
      width: 72px;
      height: 72px;
      border: 1px solid #666;
      border-radius: 50%;
      background-color: #fff;
      font-size: 40px;
      cursor: pointer;
      transform: scale(.5);
      transform-origin: 0 0;
      [class*=uricon-] {
        @include position-center;
      }
    }

    .has-download-bar &,
    .has-action-bar & {
      bottom: 60px;
    }
  }
</style>
