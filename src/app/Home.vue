<template>
  <page-wrap class="page-index">
    <page-header>
      <topbar :type="'menu'">
        <template slot="title">{{title}}</template>
      </topbar>

      <!--<topbar-->
        <!--:type="'back'"-->
        <!--:theme="'white'"-->
        <!--:mode="'fade'"-->
        <!--:hideNativeTitleBar="true"-->
      <!--&gt;-->
        <!--<template slot="title">{{title}}</template>-->
      <!--</topbar>-->

      <tab
        v-if="!isApp"
        :type="'router'"
        :theme="'nav'"
        :data="navTab"
        :replace="true"
      />
    </page-header>

    <transition name="home-fade">
      <router-view :key="$route.fullPath"></router-view>
    </transition>
  </page-wrap>
</template>

<script>
  import Tab from 'component/tab/Tab';
  import {isApp} from 'nativeFix';
  import {mapState} from 'vuex'

  export default {
    components: {
      Tab
    },
    computed: {
    ...mapState({
        isEn: state => state.languageEnUS
      }),
      navTab() {
        return [
          {
            text: this.isEn ? 'Home' : '首页',
            routeName: 'index'
          },
          {
            text: this.isEn ? 'Community' : '社区',
            routeName: 'workstage',
            oldPageLink: '/workstage/toWorkstageList'
          },
          {
            text: this.isEn ? 'Events' : '活动',
            routeName: 'activity',
            oldPageLink: '/activity/getactivitylistpage'
          },
          {
            text: this.isEn ? 'News' : '资讯',
            routeName: 'news'
          }
        ]
      }
    },
    data() {
      return {
        title: '',
        isApp: isApp()
      }
    },
    created() {
      this.title = this.$route.meta.title;
      document.title = this.title;
      this.show = true;
    },
    mounted() {

    }
  }
</script>

<style lang="scss">

</style>
