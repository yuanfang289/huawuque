<template>
  <topbar-wrap>
    <a href="javascript:;" slot="navigate" class="action" @click.prevent="backHandler"><i class="psicon-arrow-left"></i></a>

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
  import {getLocation, runEnv} from 'utils';
  import {website} from 'config/feature';

  export default {
    components: {
      TopbarWrap
    },
    methods: {
      backHandler() {
        globalData.routerTimer = setTimeout(() => {
          let systemInfo = this.$systemInfo();
          let protocol = getLocation().protocol;
          let env = runEnv();

          if (systemInfo.isMobile) {
            location.replace(protocol + website['m'][env.currentEnv])
          } else {
            location.replace(protocol + website['www'][env.currentEnv])
          }
        }, 1000);

        this.$router.back();
      }
    }
  }
</script>
