<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'" :hideShareBtn="true">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      <div class="ticket">
        <img src="https://assets.urwork.cn/image/app/yyzz.jpg">
      </div>
    </page-main>
  </page-wrap>
</template>

<script>
  export default {
    components: {

    },
    data: () => {
      return {
        title: '优客工场（北京）创业投资有限公司',
      }
    },
    methods:{

    },
    created() {
      this.show = true;
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped="">


</style>



