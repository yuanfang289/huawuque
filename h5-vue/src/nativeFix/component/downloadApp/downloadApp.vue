<template>
  <div class="download-wrapper">
    <img class="download-logo" src="../../../assets/images/feature/download-logo.png" alt="">
    <img class="download-bg" src="../../../assets/images/feature/download-bg.jpg" alt="">
    <div class="download-action">
      <p v-if="useInApp">此功能需要在 [优鲜集] App中使用</p>
      <a href="javascript:;" class="btn btn-primary" @click="downloadApp">下载客户端</a>
    </div>
  </div>
</template>

<script>
  import {updateAppParams} from 'config/feature';
  import getSystemInfo from 'vendor/systemInfo/systemInfo';
  import setUrl from 'utils/setUrl';

  /**
   * app下载页
   *
   * @property {Boolean}            useInApp              此功能需要在APP中使用
   */
  export default {
    props: {
      useInApp: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {}
    },
    methods: {
      downloadApp() {
        let {
          ios,
          android
        } = updateAppParams.downloadLink;

        let systemInfo = getSystemInfo();

        if(systemInfo.isAndroid){
          setUrl(android);
        } else if (systemInfo.isIos){
          setUrl(ios);
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/scss/variables";
  @import "../../../assets/scss/mixins";

  .download-wrapper{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
    .download-logo{
      position: absolute;
      top: 32px;
      left: 32px;
      z-index: 10;
      width: 45px;
    }
    .download-bg{
      @include position-center-y;
      z-index: 9;
    }
    .download-action{
      position: absolute;
      bottom: 60px;
      z-index: 10;
      width: 100%;
      padding: 0 50px;
      p{
        text-align: center;
        margin-bottom: 13px;
        font-weight: bold;
      }
      .btn{
        height: 43px;
        line-height: 43px;
        color: $color-primary;
        border-radius: 43px;
        font-size: 14px;
      }
    }
  }
</style>
