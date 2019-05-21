<template>
  <topbar-wrap>
    <a href="javascript:;" slot="navigate" class="action" @click="toggle"><i class="uricon-menu-b"></i></a>

    <template slot="title"><slot name="title"></slot></template>

    <!-- 所有不具名的标签或组件都会加入到actions中 -->
    <template slot="actions">
      <slot name="actions"></slot>
    </template>

    <mask-layer @hide-mask="toggle" :z-index="910" :show="show"/>
    <main-menu @hide-menu="toggle" v-if="show" />
  </topbar-wrap>
</template>

<script>
  import MaskLayer from 'lib/mask/MaskLayer';
  import TopbarWrap from 'component/topbar/TopbarWrap';
  import MainMenu from 'component/nav/MainMenu';

  export default {
    data: () => {
      return {
        show: false
      }
    },
    components: {
      TopbarWrap,
      MaskLayer,
      MainMenu
    },
    methods: {
      toggle() {
        if (this.show) {
          this.$removeClassName('body', 'menu-show');
        } else {
          this.$addClassName('body', 'menu-show');
        }

        this.show = !this.show;
      }
    }
  }
</script>

<style lang="scss">
  body.menu-show {
    overflow: hidden !important;
  }
</style>
