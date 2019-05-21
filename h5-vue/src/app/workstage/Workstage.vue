<template>
  <page-main
    :show="show"
  >
    社区页
  </page-main>
</template>

<script>
  export default {
    data: () => {
      return {
        show: false,
      }
    },
    methods: {
    },
    created() {
      setTimeout(() => {
        this.show = true;
      }, 200)
    },
    mounted() {

    }
  }
</script>

<style lang="scss">

</style>
