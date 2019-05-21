<template>
  <page-wrap
    :gray-bg="true"
    :error="error"
    @refresh-page="refresh"
  >
    <div v-title>{{title}}</div>

    <page-header
      :is-headroom="false"
      :is-fixed="true"
    >
      <topbar
        slot="title"
        :type="'back'"
      >
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

      啊 <br>
      啊2 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊4 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊2 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊3 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊3 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊411 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊41 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊4 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊33 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊42 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>
      啊 <br>

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
          title: '企业详情'
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
