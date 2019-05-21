<template>
  <section v-if="show" class="download-bar">
    <a href="javascript:;" class="btn-hide" @click="hideHandler"><i class="uricon-close"></i></a>
    <dl class="desc">
      <dt>
        <img src="../../assets/images/feature/logo-download.png" class="logo">
      </dt>
      <dd>
        <h3>优客工场</h3>
        <p>让平行世界的人相互遇见</p>
      </dd>
    </dl>
    <a href="/appDownload" class="btn-navigate">立即下载</a>
  </section>
</template>

<script>
  import storage from 'utils/storage';
  let {setStorage} = storage;

  export default {
    props: {
      show: {
        type: Boolean
      }
    },
    methods: {
      hideHandler() {
        this.$emit('hide-downloadbar');
        setStorage('hideDownloadBar', true);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .download-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 890;
    width: 100%;
    height: 50px;
    padding: 5px 90px 5px 45px;
    background-color: rgba(0,0,0,.5);
    font-size: 15px;
    font-weight: normal;
    transform-style: preserve-3d;

    &, a {
      color: #fff;
    }
    .btn-hide {
      @include position-center-y;
      left: 2px;
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
    .btn-navigate {
      @include position-center-y;
      right: 15px;
      height: 30px;
      @include padding-h(10px);
      background-color: #333;
      font-size: 13px;
      line-height: 30px;
    }
    .desc {
      display: flex;
      align-items: center;
      dt {
        overflow: hidden;
        width: 40px;
        height: 40px;
        flex-basis: 40px;
        flex-grow: 0;
        flex-shrink: 0;
        border-radius: 8px;
      }
      dd {
        @include text-overflow;
        min-width: 0;
        padding-left: 10px;
        line-height: 1.3;
      }
      p {
        font-size: 12px;
      }
    }
  }
</style>
