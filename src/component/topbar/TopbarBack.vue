<template>
  <topbar-wrap>
    <a href="javascript:;" slot="navigate" class="action" @click.prevent="backHandler"><i class="uricon-arrow-left"></i></a>

    <template slot="title"><slot name="title"></slot></template>

    <!-- 所有不具名的标签或组件都会加入到actions中 -->
    <template slot="actions">
      <slot name="actions"></slot>
    </template>
  </topbar-wrap>
</template>

<script>
  import TopbarWrap from 'component/topbar/TopbarWrap';
  import globalData from "src/globalData";
  import {isApp} from "src/nativeFix";

  /**
   * @property props.nativeBack 原生APP补丁，使用APP原生后退事件
   */
  export default {
    props: {
      nativeBack: {
        type: Boolean,
        default: false
      }
    },
    components: {
      TopbarWrap
    },
    methods: {
      backHandler() {

        // TODO 原生APP补丁
        if (this.nativeBack && isApp()) {
          this.$DANativeApi.navigateBack();
          return
        }

        globalData.routerTimer = setTimeout(() => {
          if (this.$route.name === 'index') return;

          // TODO 由于首页为做前后端分离，只能采用直接修改href的方式跳转
          location.href = '/';
          // this.$router.replace({name: 'index'});
        }, 1000);

        this.$router.back();
      }
    }
  }
</script>
