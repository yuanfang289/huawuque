<template>
  <section
    class="loading"
    v-if="show"
    :class="{'popup-loading': popupLoading}"
  >
    <div class="loading-inner">

      <div class="img-box">
        <div class="img"></div>
      </div>
      <p>{{content}}</p>

    </div>
  </section>
</template>

<script>
  export default {
    name: 'PageLoading',
    data: () => {
      return {
        popupLoading: false,
        show: true,
        content: '正在加载...'
      }
    },
    methods: {
      hide() {
        this.show = false;
        this.$removeClassName('html', 'popup-loading-show');
      }
    },
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;

    &.popup-loading {
      position: fixed;
      z-index: 2000;

      .loading-inner {
        background-color: rgba(242, 244, 246, .6);
      }
    }

    .loading-inner {
      @include position-center();
      top: 35%;
      padding-top: 19px;
      width: 124px;
      height: 100px;
      border-radius: 8px;
      text-align: center;
    }

    p {
      margin-top: 10px;
      margin-left: 5px;
    }

    .img-box {
      position: relative;
      width: 36px;
      height: 36px;
      z-index: 3;
      margin: 0 auto;
      overflow: hidden;
      border-radius: 50%;
      box-sizing: border-box;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

      .img {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 50%;
        background: url(../../assets/images/feature/loading.png) no-repeat;
        background-size: 100%;
        animation: loading 2s linear infinite;
      }
    }
  }

  .popup-loading-show {
    overflow: hidden !important;
  }

  @keyframes loading {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
