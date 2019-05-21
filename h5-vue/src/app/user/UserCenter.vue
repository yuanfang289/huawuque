<template>
  <page-wrap class="page-user-center">
    <title v-title>{{title}}</title>

    <page-header>
      <topbar :type="'back'">
        <template slot="title">{{title}}</template>
      </topbar>
    </page-header>

    <page-main :show="show">
      个人中心123
    </page-main>

  </page-wrap>
</template>

<script>
  import apiTask from 'api/user/apiTask';
  export default {
    data: () => {
      return {
        show: false,
        title: '个人中心'
      }
    },
    created() {
      this.show = true;
    },
    mounted() {
      apiTask().then(res => {
        console.log(res,33333333333);
      })
    }
  }
</script>

<style lang="scss">

</style>
