<template>
  <div class="server-error"
    :style="{top: `${top}px`}"
  >
    <div class="title">
      <h2>很抱歉！服务器错误...</h2>
    </div>
    <a href="javascript:;" class="btn-refresh" @click="refresh">点击刷新</a>
  </div>
</template>

<script>
  import {getRect} from 'utils/dom';

  export default {
    data: () => {
      return {
        top: 0
      }
    },
    methods: {
      refresh() {
        this.$emit('refresh-page');
      }
    },
    mounted() {
      this.$nextTick(() => {
        let header = document.querySelector('.page-header');
        if (header) this.top = getRect(header).height;
      })
    }
  }
</script>

<style lang="scss" scoped>
  .server-error {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background: #fff url("../assets/images/interface/500/500.png") no-repeat 50% 60%;
    background-size: 90%;
  }

  .title {
    position: absolute;
    bottom: 75%;
    left: 0;
    z-index: 2;
    width: 100%;
    background: url("../assets/images/interface/500/cloud-500.png") no-repeat 50% 30%;
    background-size: 70%;
    &::before {
      display: block;
      padding-top: 38.6667%;
      content: "";
    }

    h2 {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      color: #666;
      font-size: 18px;
      text-align: center;
    }
  }

  .btn-refresh {
    position: absolute;
    left: 50%;
    bottom: 15%;
    z-index: 10;
    transform: translateX(-50%);
    width: 100px;
    height: 34px;
    border: 1px solid #333;
    border-radius: 34px;
    color: #333;
    font-size: 15px;
    line-height: 32px;
    text-align: center;
  }
</style>
