<template>
  <page-wrap
    :gray-bg="true"
    :error="error"
    @refresh-page="refresh"
  >
    <div v-title>{{title}}</div>

    <page-header>
      <topbar :type="'back'">
        <template slot="title">{{title}}</template>

        <template slot="actions">
          <a href="javascript:;" class="action"><i class="uricon-share-o"></i></a>
          <a href="javascript:;" class="action"><i class="uricon-setting-o"></i></a>
        </template>
      </topbar>

    </page-header>

    <page-main
      :has-go-back="true"
      :has-go-top="true"
      :show="show"
    >

    </page-main>

  </page-wrap>
</template>

<script>
  /**
   * @property {boolean}   show          页面显示
   * @property {boolean}   error         接口请求是否报错
   * @property {string}    title         页面标题
   */
    export default {
      components: {

      },
      data: () => {
        return {
          show: false,
          error: false,
          title: '标题'
        }
      },
      methods: {
        refresh() {
          // 500页面内，刷新按钮的事件，用来重新调用渲染页面的接口，达到刷新效果
          console.log('refresh')
        },
      },
      created() {

      },
      mounted() {
        this.show = true;
      }
    }
</script>

<style lang="scss" scoped>

</style>
